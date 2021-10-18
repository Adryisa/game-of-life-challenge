/* eslint-disable no-plusplus */

function motherArray(rows, cols) {
  const board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      board[i][j] = Math.round(Math.random());
    }
  }
  return board;
}
let boardToPlay = motherArray(60, 60);

function countNeighbours(i, j) {
  let sum = 0;
  if (boardToPlay[i][j - 1]) {
    sum++;
  }
  if (boardToPlay[i][j + 1]) {
    sum++;
  }
  if (boardToPlay[i - 1]) {
    if (boardToPlay[i - 1][j - 1]) {
      sum++;
    }
    if (boardToPlay[i - 1][j]) {
      sum++;
    }
    if (boardToPlay[i - 1][j + 1]) {
      sum++;
    }
  }
  if (boardToPlay[i + 1]) {
    if (boardToPlay[i + 1][j - 1]) {
      sum++;
    }
    if (boardToPlay[i + 1][j]) {
      sum++;
    }
    if (boardToPlay[i + 1][j + 1]) {
      sum++;
    }
  }
  return sum;
}

function lifeGame(arr) {
  const motherChild = arr.map((arr) => [...arr]);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const state = arr[i][j];
      // count the annoying neighboors
      const neighbours = countNeighbours(i, j);
      if (state === 0 && neighbours === 3) {
        motherChild[i][j] = 1;
      } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
        motherChild[i][j] = 0;
      } else {
        motherChild[i][j] = state;
      }
    }
  }
  return motherChild;
}

//  -----------------------------------

function paintTable(boardToPlay) {
  const board = document.querySelector('.board');
  board.innerHTML = '';
  for (let i = 0; i < boardToPlay.length; i++) {
    const row = document.createElement('div');
    row.classList.add('board-rows');
    for (let j = 0; j < boardToPlay[i].length; j++) {
      const column = document.createElement('div');
      column.classList.add('board-columns');
      column.id = 'column' + i + j;
      if (boardToPlay[i][j] === 1) {
        column.classList.add('living');
      }
      row.appendChild(column);
    }
    board.appendChild(row);
  }
}

paintTable(boardToPlay);
setInterval(() => {
  boardToPlay = lifeGame(boardToPlay);
  paintTable(boardToPlay);
}, 500);
