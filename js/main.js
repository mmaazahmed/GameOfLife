import { initializeGame, populateBoard,sierpińskiTriangle } from "./game.js";
import { initializeInputListeners } from "./input.js";
import { gameLoop } from "./gameLoop.js";

const cell_size = 25;
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

// const nCells=50000;
const nCells=1000;
sierpińskiTriangle(game,nCells)

let lastFrameTime = 0;
// populateBoard(game,nCells)
function showFps(){
  const currentTime=performance.now()
  const elapsedMilliseconds = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  const fps = 1000 / elapsedMilliseconds;
  console.log(Math.floor(fps));
}

function animate() {
  requestAnimationFrame(animate);
  gameLoop(ctx, game);
  console.log(game.activeCells.size);
  // showFps();
}

animate();
