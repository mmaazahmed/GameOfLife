import { renderGame } from "./renderer.js";
import { updateGame } from "./game.js";
// consider combining with main.js


export function gameLoop(ctx, game) {
  const currentTime = performance.now();
  const deltaTime = currentTime - game.lastUpdateTime;

  renderGame(ctx, game);

  if (game.isPaused) { return; }

  if (deltaTime >= game.updateInterval) {
    updateGame(game);
    game.lastUpdateTime = currentTime;
  }
}
