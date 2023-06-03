import { gameBoard, blockSize, gameBoardSize, gameVariables} from './variables.js';


export function startGame() {
  clearTimeout(gameVariables.gameLoopId);
  resetGame();
  document.getElementById('score').innerText = 'Score: 0';
  document.getElementById('main-menu').style.display = 'none';
  gameVariables.gameLoopId = setTimeout(gameLoop, 200);
}

export function gameOver() {
  clearTimeout(gameVariables.gameLoopId);
  alert("Game Over");
  document.getElementById('main-menu').style.display = 'block';
  document.getElementById('score').innerText = "Score: " + gameVariables.score;
  resetGame();
}

function resetGame() {
  gameVariables.direction = 'Right';
  gameVariables.lastMovedDirection = null;
  gameVariables.snake = [{ top: 0, left: 0 }];
  gameVariables.apple = null;
  gameVariables.score = 0;
}


export function updateSnake() {
  var head = Object.assign({}, gameVariables.snake[0]); 
  if(gameVariables.direction === 'Right') head.left = (head.left + blockSize) % gameBoardSize;
  if(gameVariables.direction === 'Down') head.top = (head.top + blockSize) % gameBoardSize;
  if(gameVariables.direction === 'Left') head.left = (head.left - blockSize + gameBoardSize) % gameBoardSize;
  if(gameVariables.direction === 'Up') head.top = (head.top - blockSize + gameBoardSize) % gameBoardSize;

  gameVariables.snake.unshift(head);

  if(gameVariables.apple && gameVariables.apple.top === head.top && gameVariables.apple.left === head.left) {
    eatApple();
  } else {
    gameVariables.snake.pop();
  }

  if(doesSnakeHitItself(head)) {
    return true;  // return true when game over
  }
  return false;  // return false otherwise
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



function moveSnakeHead(head) {
  if (gameVariables.direction === 'Right') head.left = (head.left + blockSize) % gameBoardSize;
  if (gameVariables.direction === 'Down') head.top = (head.top + blockSize) % gameBoardSize;
  if (gameVariables.direction === 'Left') head.left = (head.left - blockSize + gameBoardSize) % gameBoardSize;
  if (gameVariables.direction === 'Up') head.top = (head.top - blockSize + gameBoardSize) % gameBoardSize;
}

function isSnakeEatingApple(head) {
  return gameVariables.apple && gameVariables.apple.top === head.top && gameVariables.apple.left === head.left;
}

export function eatApple() {
  gameVariables.apple = null;
  gameVariables.score += 1;
  document.getElementById('score').innerText = "Score: " + gameVariables.score;
}

export function doesSnakeHitItself(head) {
  for (let i = 1; i < gameVariables.snake.length; i++) {
    if (gameVariables.snake[i].top === head.top && gameVariables.snake[i].left === head.left) {
      return true;
    }
  }
  return false;
}

export function updateApple() {
  if (gameVariables.apple === null) {
    let newApplePosition;
    do {
      newApplePosition = {
        top: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
        left: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
      };
    } while (isAppleInsideSnake(newApplePosition));
    gameVariables.apple = newApplePosition;
  }
}

export function isAppleInsideSnake(position) {
  for (let i = 0; i < gameVariables.snake.length; i++) {
    let snakeSegment = gameVariables.snake[i];
    if (snakeSegment.top === position.top && snakeSegment.left === position.left) {
      return true;
    }
  }
  return false;
}


export function drawGame() {
  gameBoard.innerHTML = '';
  drawSnake();
  drawApple();
}

function drawSnake() {
  gameVariables.snake.forEach(function(block) {
    var blockElem = document.createElement('div');
    blockElem.style.top = `${block.top}px`;
    blockElem.style.left = `${block.left}px`;
    blockElem.className = 'block';
    blockElem.style.background = 'gray';
    blockElem.style.border = '1px solid black';
    gameBoard.appendChild(blockElem);
  });
}

function drawApple() {
  var appleElem = document.createElement('div');
  appleElem.style.top = `${gameVariables.apple.top}px`;
  appleElem.style.left = `${gameVariables.apple.left}px`;
  appleElem.className = 'block';
  appleElem.style.background = 'red';
  gameBoard.appendChild(appleElem);
}
