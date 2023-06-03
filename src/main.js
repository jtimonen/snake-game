import { gameBoard, blockSize, gameBoardSize, validDirections } from './variables.js';
import { gameVariables } from './variables.js';
import { changeDirection } from './input.js';
import { updateLastDirection, eatApple, updateSnake, isSnakeHittingItself, gameOver, updateApple, isAppleInsideSnake, gameLoop, drawGame} from './game.js';

import { startGame } from './game.js';
document.getElementById('start-button').addEventListener('click', startGame);

window.addEventListener('keydown', function(e) {
  var newDirection = e.key.replace('Arrow', '');
  changeDirection(newDirection);
});
