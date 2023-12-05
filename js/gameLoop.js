import { renderGame} from "./rendering.js";
import { updateGame } from "./game.js";
export function gameLoop(ctx,game){
    updateGame(game);
    renderGame(ctx,game);
}