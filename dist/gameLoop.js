"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameLoop = void 0;
const renderer_js_1 = require("./renderer.js");
const game_js_1 = require("./game.js");
// consider combining with main.js
function gameLoop(ctx, game) {
    const currentTime = performance.now();
    const deltaTime = currentTime - game.lastUpdateTime;
    (0, renderer_js_1.renderGame)(ctx, game);
    if (game.isPaused) {
        return;
    }
    if (deltaTime >= game.updateInterval) {
        (0, game_js_1.updateGame)(game);
        game.lastUpdateTime = currentTime;
    }
}
exports.gameLoop = gameLoop;
