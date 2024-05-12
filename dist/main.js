"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_js_1 = require("./game.js");
const input_js_1 = require("./input.js");
const gameLoop_js_1 = require("./gameLoop.js");
const cell_size = 3;
const canvas = document.getElementById("mycanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
const updateInterval = 0;
const game = (0, game_js_1.initializeGame)(canvas, canvas.width, canvas.height, cell_size, updateInterval);
(0, input_js_1.initializeInputListeners)(canvas, game);
let nCells = Math.floor(game.height / game.cellSize) - 5;
// nCells=200;
(0, game_js_1.sierpinskiTriangle)(game, nCells);
let lastFrameTime = 0;
// populateBoard(game,nCells)
function getFps() {
    const currentTime = performance.now();
    const elapsedMilliseconds = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    const fps = Math.floor(1000 / elapsedMilliseconds);
    return fps;
}
function animate() {
    requestAnimationFrame(animate);
    (0, gameLoop_js_1.gameLoop)(ctx, game);
    // console.log(getFps());
}
animate();
