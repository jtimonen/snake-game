import { gameBoard, initialSnake, gameVariables} from './variables.js';
import {updateSnake, updateApple} from './objects.js'

export function startGame() {
  clearTimeout(gameVariables.gameLoopId);
  resetGame();
  document.getElementById('score').innerText = 'Score: 0';
  document.getElementById('main-menu').style.visibility = 'hidden'; // invisible start button
  gameVariables.gameLoopId = setTimeout(gameLoop, 200);
}

function resetGame() {
  gameVariables.direction = 'Right';
  gameVariables.lastMovedDirection = null;
  gameVariables.snake = JSON.parse(JSON.stringify(initialSnake));
  gameVariables.apple = null;
  gameVariables.score = 0;
}

export function gameOver() {
  clearTimeout(gameVariables.gameLoopId);
  alert("Game Over");
  document.getElementById('main-menu').style.visibility = 'visible'; // Updated line
  document.getElementById('score').innerText = "Score: " + gameVariables.score;
  resetGame();
}

export function gameLoop() {
  if(updateSnake()){  // if updateSnake() returns true
    return gameOver();  // return immediately without scheduling a new loop
  }
  updateApple();
  drawGame();
  gameVariables.gameLoopId = setTimeout(gameLoop, 200);
  updateLastDirection(gameVariables.direction);
}

export function updateLastDirection(dir) {
  gameVariables.lastMovedDirection = dir;
}

export function drawGame() {
  gameBoard.innerHTML = '';

  // draw the snake
  gameVariables.snake.forEach(function(block, index) {
    var blockElem = document.createElement('div');
    blockElem.style.top = `${block.top}px`;
    blockElem.style.left = `${block.left}px`;
    blockElem.className = 'block';

    if(index === 0) { // if it's the head
      blockElem.classList.add('head');
      blockElem.classList.add(gameVariables.direction.toLowerCase());
    }

    gameBoard.appendChild(blockElem);
  });

  // draw the apple
  var appleElem = document.createElement('div');
  appleElem.style.top = `${gameVariables.apple.top}px`;
  appleElem.style.left = `${gameVariables.apple.left}px`;
  appleElem.className = 'block';
  appleElem.style.backgroundColor = 'red';
  gameBoard.appendChild(appleElem);
}
