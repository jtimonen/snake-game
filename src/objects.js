import {blockSize, gameBoardSize, gameVariables} from './variables.js';

// snake
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
  
  // apple
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


  // logic
  export function eatApple() {
    gameVariables.apple = null;
    gameVariables.score += 1;
    document.getElementById('score').innerText = "Score: " + gameVariables.score;
  }
  
  // logic
  export function doesSnakeHitItself(head) {
    for (let i = 1; i < gameVariables.snake.length; i++) {
      if (gameVariables.snake[i].top === head.top && gameVariables.snake[i].left === head.left) {
        return true;
      }
    }
    return false;
  }
  
  // logic
  export function isAppleInsideSnake(position) {
    for (let i = 0; i < gameVariables.snake.length; i++) {
      let snakeSegment = gameVariables.snake[i];
      if (snakeSegment.top === position.top && snakeSegment.left === position.left) {
        return true;
      }
    }
    return false;
  }
