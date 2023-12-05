import { initializeGame, addActiveCells } from './game.js';
import { initializeInputListeners} from './input.js';
import { gameLoop } from './gameLoop.js';

const cell_size=50;
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas.style.background='#ffac81';


const isPaused={value:false}
const game = initializeGame(canvas.width, canvas.height, cell_size);

// document.addEventListener('keydown', (event) => handleInput(event, game));
initializeInputListeners(ctx,game);
let cells=[];
cells=["0,1", "1,2", "2,0","2,1","2,2","7,7","7,8","6,10","7,5"];
addActiveCells(game,cells);
const speed=100;
function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);
}, speed);
  gameLoop(ctx,game);
}

animate();