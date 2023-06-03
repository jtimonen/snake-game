var gameBoard = document.getElementById('game-board');
const blockSize = 20;
const gameBoardSize = 300;
var direction = 'Right';
var lastMovedDirection = null;
var snake = [{ top: 0, left: 0 }];
var apple = null;

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

  direction = newDirection;
}

window.addEventListener('keydown', function(e) {
  var newDirection = e.key.replace('Arrow', '');
  changeDirection(newDirection);
});

function updateLastDirection(dir) {
  lastMovedDirection = dir;
}

function updateSnake() {
  var head = Object.assign({}, snake[0]); // copy head
  if(direction === 'Right') head.left = (head.left + blockSize) % gameBoardSize;
  if(direction === 'Down') head.top = (head.top + blockSize) % gameBoardSize;
  if(direction === 'Left') head.left = (head.left - blockSize + gameBoardSize) % gameBoardSize;
  if(direction === 'Up') head.top = (head.top - blockSize + gameBoardSize) % gameBoardSize;

  snake.unshift(head);

  if(apple && apple.top === head.top && apple.left === head.left) { // eaten the apple
    apple = null; // remove the apple
  } else {
    snake.pop(); // remove the tail
  }
}

function updateApple() {
  if(apple === null) {
    apple = {
      top: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
      left: Math.floor(Math.random() * gameBoardSize / blockSize) * blockSize,
    }
  }
}

function gameLoop() {
  updateSnake();
  updateApple();
  drawGame();
  setTimeout(gameLoop, 200);
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

gameLoop();

