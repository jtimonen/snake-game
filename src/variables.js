export var gameBoard = document.getElementById('game-board');
export const blockSize = 20;
export const gameBoardSize = 300;
export let gameVariables = {
    direction: 'Right',
    lastMovedDirection: null,
    snake: [{ top: 0, left: 0 }],
    apple: null,
    score: 0,
    gameLoopId: null
  };
export const validDirections = new Set(['Right', 'Left', 'Up', 'Down']);
