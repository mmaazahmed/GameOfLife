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

let cells = [];
const nCells=50000;
// cells = ["0,1", "1,2", "2,0", "2,1", "2,2", "7,7", "7,8", "6,10", "7,5"];
// addActiveCells(game, cells);
populateBoard(game,nCells)
function animate() {
  requestAnimationFrame(animate);
  gameLoop(ctx, game);
}

animate();
