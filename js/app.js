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
    redCaptureSpace.append(piece);
  }
  for (let i = 0; i < board.blackCaptured.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('black-piece');
    piece.classList.add('piece');
    blackCaptureSpace.append(piece);
  }
  for (let i = 0; i < board.redEaten.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('red-piece');
    piece.classList.add('piece');
    redEatenSpace.append(piece);
  }
  for (let i = 0; i < board.blackEaten.length; i++) {
    let piece = document.createElement('div');
    piece.classList.add('black-piece');
    piece.classList.add('piece');
    blackEatenSpace.append(piece);
  }
}


const sourceTarget = space => {
  if (hasMoves() === false || board.moves === 0) {
    switchTurn();
  }
  else if (board.blackCaptured.length > 0 && board.turn === 'black') {
    if (board.moves.includes(space+1)) {
      if (board.spaces[space].length === 0) {
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(space+1),1);
      }
      else if (board.spaces[space].length === 1
        && board.spaces[space][0].color != board.turn){
        board.redCaptured.push(board.spaces[space].pop());
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(space+1),1);
      }
      else if (board.spaces[space][0].color === board.turn) {
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(space+1),1);
      }
    }
    board.source = null;
    board.target = null;
    console.log(board.moves);
    viewState();
  }
  else if (board.redCaptured.length > 0 && board.turn === 'red') {
    console.log(space);
    if (hasMoves() === false) {
      switchTurn();
    }
    else if (board.moves.includes(24-space)) {
      if (board.spaces[space].length === 0) {
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(24-space),1);
      }
      else if (board.spaces[space].length === 1
        && board.spaces[space][0].color != board.turn){
        board.blackCaptured.push(board.spaces[space].pop());
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(24-space),1);
      }
      else if (board.spaces[space][0].color === board.turn) {
        returnCapture(space);
        board.moves.splice(board.moves.indexOf(24-space),1);
      }
    }
    board.source = null;
    board.target = null;
    console.log(board.moves);
    viewState();
  }
  else if (blackReady() && board.turn === 'black') {
    if (board.spaces[space].length > 0 &&
      board.spaces[space][0].color === 'black' &&
      board.moves.includes(24-space)) {
      eat(space);
      board.moves.splice(board.moves.indexOf(24-space),1);
    }
  }
  else if (redReady() && board.turn === 'red') {
    if (board.spaces[space].length > 0 &&
      board.spaces[space][0].color === 'red' &&
      board.moves.includes(space+1)) {
      eat(space);
      board.moves.splice(board.moves.indexOf(space+1),1);
    }
  }
  else if (board.source === null) {
    console.log(`source is ${space}`);
    board.source = space;
    board.source < 12 ?
    document.querySelectorAll('.space')[space].classList.toggle('source'):
    document.querySelectorAll('.space')[23+(12-space)].classList.toggle('source');
  }
  else if (board.source === space) {
    console.log(`reset source`);
    board.source < 12 ?
    document.querySelectorAll('.space')[space].classList.toggle('source'):
    document.querySelectorAll('.space')[23+(12-space)].classList.toggle('source');
    board.source = null;
  }
  else {
    console.log(`target is ${space}`);
    board.target = space;
    let diff = isMove(board.source,board.target);
    if (diff != 0) {
      changeSpace(board.source,board.target);
      board.moves.splice(board.moves.indexOf(diff),1);
    }
    console.log(board.moves);
    board.source < 12 ?
    document.querySelectorAll('.space')[board.source].classList.toggle('source'):
    document.querySelectorAll('.space')[23+(12-board.source)].classList.toggle('source');
    board.source = null;
    board.target = null;
    switchTurn();
    console.log(board.turn);
  }
  if (hasMoves() === false || board.moves === 0) {
    switchTurn();
  }
  checkWin();
}

const switchTurn = () => {
  if (board.moves.length === 0 || hasMoves() === false) {
    if (board.turn === 'black') {
      board.turn = 'red';
      document.querySelectorAll('.dice').forEach(die => die.style.color = 'red');
    }
    else {
      board.turn = 'black';
      document.querySelectorAll('.dice').forEach(die => die.style.color = 'black');
    }

    rollDice();
  }
}

const hasMoves = () => {
  if (board.blackCaptured.length > 0 && board.turn === 'black') {
    for (move in board.moves) {
      if (board.spaces[board.moves[move]-1].length <= 1) {
        return true;
      }
      else if (board.spaces[board.moves[move]-1].color === board.turn) {
        return true;
      }
    }
    return false;
  }
  else if (board.redCaptured.length > 0 && board.turn === 'red') {
    for (move in board.moves) {
      if (board.spaces[24 - board.moves[move]].length <= 1) {
        return true;
      }
      else if (board.spaces[24 - board.moves[move]].color === board.turn) {
        return true;
      }
    }
    return false;
  }
  else {
    let possible = [];
    for (let i = 0; i < board.spaces.length; i++) {
      for (move in board.moves) {
        if (board.spaces[i].length > 0 && board.spaces[i][0].color === board.turn) {
          if (board.turn === 'black') {
            possible.push(isMove(i,i+board.moves[move]));
          }
          else {
            possible.push(isMove(i,i-+board.moves[move]));
          }
        }
      }
    }
    return possible.some(possibility => possibility != 0);
  }
}

const isMove = (first, second) => {
  for (move in board.moves) {
    let diff = second - first;
    if (diff < 0) diff *= -1;
    if (diff === board.moves[move]) {
      if (isValidMove(first,second)) {
        return diff;
      };
    }
  }
  return 0;
}

const isValidMove = (first, second) => {
    if (board.turn === 'black' && second < first) {
      return false;
    }
    else if (board.turn === 'red' && second > first) {
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
const returnCapture = space => {
  if (board.turn === 'black') {
    board.spaces[space].push(board.blackCaptured.pop());
  }
  else {
    board.spaces[space].push(board.redCaptured.pop());
  }
  viewState();
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

const blackReady = () => {
  let ready = 0;
  if (board.blackCaptured.length > 0) {
    return false;
  }
  for (let i = 18; i < 24; i++) {
    for (let j = 0; j < board.spaces[i].length; j++) {
      if (board.spaces[i][j].color === 'black') {
        ready += 1;
      }
    }
  }
  return(ready + board.blackEaten.length === 15 ? true : false);
}

const redReady = () => {
  let ready = 0;
  if (board.redCaptured.length > 0) {
    return false;
  }
  for (let i = 18; i < 24; i++) {
    for (let j = 0; j < board.spaces[i].length; j++) {
      if (board.spaces[i][j].color === 'red') {
        ready += 1;
      }
    }
  }
  return(ready + board.blackEaten.length === 15 ? true : false);
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

const checkWin = () => {
  if (board.blackEaten.length === 15) {
    console.log('black wins!')
  }
  else if (board.redEaten.length === 15) {
    console.log('red wins!')
  }
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
rollDice();
