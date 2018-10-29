# Backgammon

## Abstract

A browser-implemented backgammon game.

## Definitions

#### Origin

![Original Board](assets/origin.jpg)
_fig. 1: board setup at game start_

#### Piece Movement

![Moving Logic](assets/move.jpg)
_fig. 2: red rolls [2,3], moves accordingly_

Red moves counter-clockwise, black moves clock-wise.
A piece can move to a space if one of the following is true:
  1. it is empty,
  2. it has the current player's pieces on it,
  3. it has one (and only one) of the other player's pieces. This last behavior results in a _capture_.

#### Capture

![Capture Logic](assets/capture.jpg)
_fig. 3: black rolls [2,4], captures red piece_

If a piece is captured, it moves to the center column of the board. It can only be brought back if the captured player rolls into a valid space on the other player's home territory.

#### Game Ending (a.k.a Eating)

![Eating Logic](assets/eat.jpg)
If a player's pieces are all within their home territory, the player can start 'eating' their pieces, by taking away pieces from corresponding spaces based on roll. The game ends when all pieces from either opponent's side are 'eaten'.

## Issues

One of my main issues with this game is preventing improper piece selection. I used a fair amount of conditions to ensure that a piece could only be selected when it was the proper player's turn.
```
else if (board.source === null && board.spaces[space].length > 0 && board.spaces[space][0].color === board.turn) {
```

## Game Logic

At beginning of game, black goes first.

The player rolls the dice, then: (If doubles, then player has 4 moves).
  1. If the rolling player has any pieces captured, they must first place their captured piece(s) on an open space.
  2. Else, if all of the rolling player's pieces are in the home territory, eat according to rolls.
  3. Else, click on a piece, and move it the allotted amount based on the dice.
  4. Switch players.
