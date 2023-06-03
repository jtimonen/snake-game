var gameBoard = document.getElementById('game-board');


function startGame() {
  document.getElementById('main-menu').style.display = 'none';
  gameLoopId = null;
  gameLoop();
}

const blockSize = 20;
const gameBoardSize = 300;
var direction = 'Right';
var lastMovedDirection = null;
var snake = [{ top: 0, left: 0 }];
var apple = null;
var score = 0;
const validDirections = new Set(['Right', 'Left', 'Up', 'Down']);

function changeDirection(newDirection) {
  const opposite = {
    'Up': 'Down',
    'Down': 'Up',
    'Left': 'Right',
    'Right': 'Left'
  };

  if (newDirection === opposite[lastMovedDirection]) {
    console.log("Can't go there!")
    return;
  }
  if (validDirections.has(newDirection)) {
    direction = newDirection;
  } else {
    console.log("Unknown key pressed!")
  }
  return;
}

window.addEventListener('keydown', function(e) {
  var newDirection = e.key.replace('Arrow', '');
  changeDirection(newDirection);
});

function updateLastDirection(dir) {
  lastMovedDirection = dir;
}

function eatApple() {
  apple = null;
  score = score + 1;
  document.getElementById('score').innerText = "Score: " + score;
}

function updateSnake() {
  var head = Object.assign({}, snake[0]); // copy head
  if(direction === 'Right') head.left = (head.left + blockSize) % gameBoardSize;
  if(direction === 'Down') head.top = (head.top + blockSize) % gameBoardSize;
  if(direction === 'Left') head.left = (head.left - blockSize + gameBoardSize) % gameBoardSize;
  if(direction === 'Up') head.top = (head.top - blockSize + gameBoardSize) % gameBoardSize;

  if(isSnakeHittingItself(head)) {
    return gameOver();
  }

  snake.unshift(head);

  if(apple && apple.top === head.top && apple.left === head.left) { // eaten the apple
    eatApple();
  } else {
    snake.pop(); // remove the tail
  }
}

function isSnakeHittingItself(head) {
  return snake.some(block => block.top === head.top && block.left === head.left);
}

function gameOver() {
  alert("Game Over");
  document.getElementById('main-menu').style.display = 'block';
  document.getElementById('score').innerText = "Score: " + score;

  // stop the gameLoop
  if (gameLoopId) {
    clearTimeout(gameLoopId);
  }
}

function updateApple() {
  if(apple === null) {
    var newApplePosition;

    // generate new apple positions until one is found that doesn't overlap with the snake
    do {
      newApplePosition = {
        top: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
        left: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
      }
    } while (isAppleInsideSnake(newApplePosition));

    apple = newApplePosition;
  }
}

function isAppleInsideSnake(position) {
  return snake.some(block => block.top === position.top && block.left === position.left);
}

var gameLoopId = null;

function gameLoop() {
  updateSnake();
  updateApple();
  drawGame();
  gameLoopId = setTimeout(gameLoop, 200);
  updateLastDirection(direction)
}

function drawGame() {
  // clear out the old snake
  gameBoard.innerHTML = '';

  // draw the snake
  snake.forEach(function(block) {
    var blockElem = document.createElement('div');
    blockElem.style.top = `${block.top}px`;
    blockElem.style.left = `${block.left}px`;
    blockElem.className = 'block';
    blockElem.style.background = 'gray';
    blockElem.style.border = '1px solid black';
    gameBoard.appendChild(blockElem);
  });

  // draw the apple
  var appleElem = document.createElement('div');
  appleElem.style.top = `${apple.top}px`;
  appleElem.style.left = `${apple.left}px`;
  appleElem.className = 'block';
  appleElem.style.background = 'red';
  gameBoard.appendChild(appleElem);
}
