import { initializeBoard } from './game.js';
import { initializeInputListeners } from './input.js';
import { gameLoop } from './gameLoop.js';

const cell_size=50;
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const isPaused={value:false}
const game = initializeGame(canvas.width, canvas.height, cell_size);

// document.addEventListener('keydown', (event) => handleInput(event, game));
initializeInputListeners(game,isPaused);
function animate() {
  requestAnimationFrame(animate);
  gameLoop(game, ctx);
}

animate();