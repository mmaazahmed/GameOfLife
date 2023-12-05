import { renderGame} from "./rendering.js";
import { updateGame } from "./game.js";
export function gameLoop(ctx,game){
    if( !game.isPaused){ updateGame(game);}
    renderGame(ctx,game);
}