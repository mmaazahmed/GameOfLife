import { initializeGame, populateBoard } from "./game.js";
import { initializeInputListeners } from "./input.js";
import { gameLoop } from "./gameLoop.js";

const cell_size = 10;
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "#ffac81";
canvas.style.background='#cdd7d6';

const updateInterval = 60;
const game = initializeGame(
  canvas,
  canvas.width,
  canvas.height,
  cell_size,
  updateInterval
);
initializeInputListeners(canvas, game);

const nCells=50000;

populateBoard(game,nCells)
function animate() {
  requestAnimationFrame(animate);
  gameLoop(ctx, game);
}

animate();
