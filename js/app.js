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
