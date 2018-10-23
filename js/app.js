/**
 * [board description]
 * @type {Object}
 */
const board = {
  spaces: [],
  blackCaptured: [],
  redCaptured: [],
  blackEaten: [],
  redEaten: []
}

/**
 * @func createGameBlacks
 * @desc
 * @return {undefined}
 */
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
    else if (i < 11) {
      board.spaces[16].push(piece);
    }
    else {
      board.spaces[18].push(piece);
    }
  }
}

/**
 * [createGameReds description]
 * @return {[type]} [description]
 */
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

/**
 * [createViewBlacks description]
 * @return {[type]} [description]
 */
const createViewBlacks = () => {
  for (let i = 1; i <= 15; i++) {
    let black = document.createElement('div');
    black.className = 'black-piece';
    black.dataset.number = i;
    black.id = 'black' + i;
    black.addEventListener('click', () => console.log(black.dataset.number));
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

/**
 * [createViewReds description]
 * @return {[type]} [description]
 */
const createViewReds = () => {
  for (let i = 1; i <= 15; i++) {
    let red = document.createElement('div');
    red.className = 'red-piece';
    red.dataset.number = i;
    red.id = 'red' + i;
    red.addEventListener('click', () => console.log(red.dataset.number));
    if (i < 3) {
      red.style.top = 595 - (40*(i-1)) + 'px';
      red.style.left = '20px';
      document.querySelector('#top-left').appendChild(red);
    }
    else if (i < 8) {
      red.style.top = 595 - (40*(i-3)) + 'px';
      red.style.left = '420px';
      document.querySelector('#top-right').appendChild(red);
    }
    else if (i < 11) {
      red.style.top = 200 + (40*(i-8)) + 'px';
      red.style.left = '100px';
      document.querySelector('#top-right').appendChild(red);
    }
    else {
      red.style.top = 200 + (40*(i-11)) + 'px';
      red.style.left = '420px';
      document.querySelector('#top-left').appendChild(red);
    }
  }
}

/**
 * [gameBoard description]
 * @return {[type]} [description]
 */
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

const moveViewPiece = (piece, place) => {
  
}
