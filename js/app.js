/**
 * [board description]
 * @type {Object}
 */
const board = {
  spaces: [],
  blackCaptured: [],
  redCaptured: [],
  blackEaten: [],
  redEaten: [],
  moves: [],
  source: null,
  target: null,
  turn: 'black',
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
    else if (i < 11) {
      piece.currentSpace = 13;
      board.spaces[16].push(piece);
    }
    else {
      piece.currentSpace = 19;
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
      piece.currentSpace = 12;
      board.spaces[23].push(piece);
    }
    else if (i < 8) {
      piece.currentSpace = 23;
      board.spaces[12].push(piece);
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
  const redEatenSpace = document.querySelector('.red-eaten');
  const blackEatenSpace = document.querySelector('.black-eaten');
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
      // piece.addEventListener('click', () => console.log(i));
      if (i > 11) {
        let reverse = 12 - i;
        spaces[23 + reverse].appendChild(piece);
      }
      else {
        spaces[i].appendChild(piece);
      }
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
  for (let i = 0; i < board.redEaten.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('red-piece');
    piece.classList.add('piece');
    piece.addEventListener('click', () => console.log('nothing'));
    redEatenSpace.append(piece);
  }
  for (let i = 0; i < board.blackEaten.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('black-piece');
    piece.classList.add('piece');
    piece.addEventListener('click', () => console.log('nothing'));
    blackEatenSpace.append(piece);
  }
}
const sourceTarget = space => {
  if (board.source === null) {
    console.log(`source is ${space}`);
    board.source = space;
  }
  else if (board.source === space) {
    console.log(`reset source`);
    board.source = null;
  }
  else {
    console.log(`target is ${space}`);
    board.target = space;
    if (isMove(board.source,board.target)) {
      changeSpace(board.source,board.target);
    }
    board.source = null;
    board.target = null;
  }
}

const hasMoves = () => {
  let possible = [];
  for (let i = 0; i < board.spaces.length; i++) {
    for (move in board.moves) {
      if (board.spaces[i].length > 0 && board.spaces[i][0].color === board.turn) {
        if (board.turn === 'black') {
          possible.push(isMove(i,i+board.moves[move]));
        }
        else {
          possible.push(isMove(i,i-i+board.moves[move]));
        }
      }
    }
  }
  return possible.includes(true);
}

const isMove = (first, second) => {
  for (move in board.moves) {
    let diff = second - first;
    if (diff < 0) diff *= -1;
    if (diff === board.moves[move]) {
      return isValidMove(first,second);
    }
  }
  return false;
}

const isValidMove = (first, second) => {
  if (board.turn === 'black' && second < first) {
    return false;
  }
  else if ((board.turn === 'red' && second > first)) {
    return false;
  }
  else if (second > 23 || second < 0) {
    return false;
  }
  else if (board.spaces[first].length === 0) {
    return false;
  }
  else if (board.spaces[second].length <= 1) {
    return true;
  }
  else if (board.spaces[second][0].color === board.spaces[first][0].color) {
    return true;
  }
  else {
    return false;
  }
}

const capture = (firstSpace, secondSpace) => {
  if (firstSpace[firstSpace.length-1].color != secondSpace[secondSpace.length - 1].color) {
    if (secondSpace[secondSpace.length - 1].color === 'black') {
      board.blackCaptured.push(secondSpace.pop());
    }
    else {
      board.redCaptured.push(secondSpace.pop());
    }
  }
}

const eat = space => {
  space = board.spaces[space];
  if (space[0].color === 'black') {
    board.blackEaten.push(space.pop());
  }
  else {
    board.redEaten.push(space.pop());
  }
  viewState();
}

const changeSpace = (first, second) => {
  let firstSpace = board.spaces[first];
  let secondSpace = board.spaces[second];
  if (secondSpace.length === 1) {
    capture(firstSpace,secondSpace);
  }
  secondSpace.push(firstSpace.pop());
  viewState();
}

const rollDice = () => {
  let dice = document.querySelectorAll('.dice');
  dice.forEach(die => die.innerHTML = '');
  console.log(dice);
  board.moves = [];
  let die1 = Math.floor(Math.random() * 6) + 1;
  let die2 = Math.floor(Math.random() * 6) + 1;
  if (die1 === die2) {
    board.moves.push(die1,die2);
    dice[0].innerHTML = die1;
    dice[3].innerHTML = die2;
  }
  board.moves.push(die1,die2);
  dice[1].innerHTML = die1;
  dice[2].innerHTML = die2;
}

/**
 * [gameBoard description]
 * @return {[type]} [description]
 */
const gameBoard = () => {
  for (let i = 0; i < 24; i++) {
    board.spaces.push([]);
    if (i > 11) {
      let reverse = 12 - i;
      document.querySelectorAll('.space')[23 + reverse].addEventListener('click',() => sourceTarget(i));
    }
    else {
      document.querySelectorAll('.space')[i].addEventListener('click', () => sourceTarget(i));
    }
  }
  createGameBlacks();
  createGameReds();
}
gameBoard();
viewState();
