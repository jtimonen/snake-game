import { validDirections, gameVariables } from './variables.js';

export function changeDirection(newDirection) {
  const opposite = {
    'Up': 'Down',
    'Down': 'Up',
    'Left': 'Right',
    'Right': 'Left'
  };

  if (newDirection === opposite[gameVariables.lastMovedDirection]) {
    console.log("Can't go there!")
    return;
  }
  if (validDirections.has(newDirection)) {
    gameVariables.direction = newDirection;
  } else {
    console.log("Unknown key pressed!")
  }
  return;
}
