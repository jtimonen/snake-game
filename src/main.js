import { changeDirection } from './input.js';
import { startGame } from './game.js';

document.getElementById('start-button').addEventListener('click', startGame);
window.addEventListener('keydown', function(e) {
  var newDirection = e.key.replace('Arrow', '');
  changeDirection(newDirection);
});
