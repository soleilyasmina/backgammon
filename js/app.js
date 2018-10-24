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
      piece.currentSpace = 0;
      board.spaces[0].push(piece);
    }
    else if (i < 8) {
      piece.currentSpace = 11;
      board.spaces[11].push(piece);
    }
    else if (i < 13) {
      piece.currentSpace = 13;
      board.spaces[17].push(piece);
    }
    else {
      piece.currentSpace = 19;
      board.spaces[19].push(piece);
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
    piece.number = i - 1;
    piece.id = 'red' + i;
    if (i < 3) {
      piece.currentSpace = 12;
      board.spaces[12].push(piece);
    }
    else if (i < 8) {
      piece.currentSpace = 23;
      board.spaces[23].push(piece);
    }
    else if (i < 13) {
      piece.currentSpace = 5;
      board.spaces[5].push(piece);
    }
    else {
      piece.currentSpace = 7;
      board.spaces[7].push(piece);
    }
  }
}

const viewState = () => {
  let $pieces = $('.piece');
  if ($pieces != undefined) {
    $('.piece').remove();
  }
  const spaces = document.querySelectorAll('.space');
  const redCaptureSpace = document.querySelector('.red-capture');
  const blackCaptureSpace = document.querySelector('.black-capture');
  for (let i = 0; i < board.spaces.length; i++) {
    for (let j = 0; j < board.spaces[i].length; j++) {
      let piece = document.createElement('div');
      if (board.spaces[i][j].color === 'black') {
        piece.classList.add('black-piece');
      }
      else {
        piece.classList.add('red-piece');
      }
      piece.classList.add('piece');
      piece.addEventListener('click', () => console.log('nothing'));
      spaces[i].appendChild(piece);
    }
  }
  for (let i = 0; i < board.redCaptured.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('red-piece');
    piece.classList.add('piece');
    piece.addEventListener('click', () => console.log('nothing'));
    redCaptureSpace.append(piece);
  }
  for (let i = 0; i < board.blackCaptured.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('black-piece');
    piece.classList.add('piece');
    piece.addEventListener('click', () => console.log('nothing'));
    blackCaptureSpace.append(piece);
  }
}

const changeSpace = (first, second) => {
  let firstSpace = board.spaces[first];
  let secondSpace = board.spaces[second];
  console.log(firstSpace[firstSpace.length - 1].color);
  if (secondSpace.length === 1 &&
      firstSpace[firstSpace.length-1].color
      != secondSpace[secondSpace.length - 1].color) {
      secondSpace[secondSpace.length - 1].color === 'black' ?
      board.blackCaptured.push(secondSpace.pop()) :
      board.redCaptured.push(secondSpace.pop());
  }
  secondSpace.push(firstSpace.pop());
  viewState();
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
}
gameBoard();
viewState();
