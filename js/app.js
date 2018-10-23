const board = {
  spaces: [],
  blackCaptured: [],
  redCaptured: [],
  blackEaten: [],
  redEaten: []
}

const createGameBlacks = () => {
  for (let i = 1; i <= 15; i++) {
    let piece = {};
    piece.color = 'black';
    piece.number = i;
    if (i < 3) {
      board.spaces[0].push(piece);
    }
    else if (i < 8) {
      board.spaces[11].push(piece);
    }
    else if (i < 111) {
      board.spaces[16].push(piece);
    }
    else {
      board.spaces[18].push(piece);
    }
  }
}
const createGameReds = () => {
  for (let i = 1; i <= 15; i++) {
    let piece = {};
    piece.color = 'red';
    piece.number = i;
    if (i < 3) {
      board.spaces[23].push(piece);
    }
    else if (i < 8) {
      board.spaces[12].push(piece);
    }
    else if (i < 11) {
      board.spaces[7].push(piece);
    }
    else {
      board.spaces[5].push(piece);
    }
  }
}

const createViewBlacks = () => {
  for (let i = 1; i <= 15; i++) {
    let black = document.createElement('div');
    black.className = 'black-piece';
    if (i < 3) {
      black.style.top = 200 + (40*(i-1)) + 'px';
      black.style.left = '20px';
      document.querySelector('#top-left').appendChild(black);
    }
    else if (i < 8) {
      black.style.top = 200 + (40*(i-3)) + 'px';
      black.style.left = '420px';
      document.querySelector('#top-right').appendChild(black);
    }
    else if (i < 11) {
      black.style.top = 595 - (40*(i-8)) + 'px';
      black.style.left = '100px';
      document.querySelector('#top-right').appendChild(black);
    }
    else {
      black.style.top = 595 - (40*(i-11)) + 'px';
      black.style.left = '420px';
      document.querySelector('#top-left').appendChild(black);
    }
  }
}

const createViewReds = () => {
  let red = document.createElement('div');
  red.className = 'red-piece';
  red.style.top = '590px';
  red.style.left = '20px';
  document.querySelector('#bot-left').appendChild(red);
}

const gameBoard = () => {
  for (let i = 0; i < 24; i++) {
    board.spaces.push([]);
  }
  createGameBlacks();
  createGameReds();
  createViewBlacks();
  createViewReds();
}
gameBoard();
