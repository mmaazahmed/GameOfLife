import { initializeGame, populateBoard,sierpinskiTriangle } from "./game.js";
import { initializeInputListeners } from "./input.js";
import { gameLoop } from "./gameLoop.js";

const cell_size = 3;
const canvas = document.getElementById("mycanvas");
canvas.height = window.innerHeight; canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");


const updateInterval =0;

const game = initializeGame(
  canvas,
  canvas.width,
  canvas.height,
  cell_size,
  updateInterval
);
initializeInputListeners(canvas, game);

let nCells=Math.floor(game.height/game.cellSize) -5;
// nCells=200;
sierpinskiTriangle(game,nCells);
let lastFrameTime = 0;
// populateBoard(game,nCells)

function getFps(){
  const currentTime=performance.now()
  const elapsedMilliseconds = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  const fps = Math.floor(1000 / elapsedMilliseconds);

  return fps;
}

function animate() {
  requestAnimationFrame(animate);
  gameLoop(ctx, game);
  
  // console.log(getFps());
}

animate();
