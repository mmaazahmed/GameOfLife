import { renderGame } from "./rendering.js";
import { updateGame } from "./game.js";
// consider combining with main.js
export function gameLoop(ctx, game) {
  const currentTime = performance.now();
  const deltaTime = currentTime - game.lastUpdateTime;

  renderGame(ctx, game);

  if (game.isPaused) { return; }

  if (deltaTime >= game.updateInterval) {
    console.log("im here");
    updateGame(game);
    game.lastUpdateTime = currentTime;
  }
}
