import { Game } from "./interfaces.js";
import {ColorPalette} from "./utils/colorPalette.js";
const CELL_COLOR=ColorPalette.c15; //c12 also looks good
const CELL_BOUNDRY_COLOR = ColorPalette.c4;
const GRID_COLOR = ColorPalette.c14;
const DOT_COLOR = "blue";



function set_color(game:Game){
  game.canvas.style.background=ColorPalette.c11;
}
const Grid={
  drawBoundary(ctx:CanvasRenderingContext2D, game:Game) { //might not be necassary. use css?
    ctx.strokeStyle = ColorPalette.c1;
    ctx.lineWidth=game.cellSize/5;
    ctx.strokeRect(0, 0, game.width, game.height);

  },

  drawVerticals(ctx:CanvasRenderingContext2D, game:Game) {
    const offset = game.cellSize;
    for (let i = 1; i < game.width / offset; i++) {
      const x = offset * Math.floor(i);
      const y1 = 0;
      const y2 = game.height;
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
    }
  },

  drawHorizontals(ctx:CanvasRenderingContext2D, game:Game) {
    const offset = game.cellSize;
    for (let i = 1; i < game.height / offset; i++) {
      const y = offset * Math.floor(i);
      ctx.moveTo(0, y);
      ctx.lineTo(game.width, y);
    }
  },

  drawSquareGrid (ctx:CanvasRenderingContext2D, game:Game) {
    ctx.beginPath();
    this.drawBoundary(ctx, game);
    this.drawVerticals(ctx, game);
    this.drawHorizontals(ctx, game);
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = game.cellSize / 20;
    ctx.stroke();
    ctx.closePath();
  },

  drawDotGrid(ctx:CanvasRenderingContext2D, game:Game) { //consider deleting feature
    const radius = 2;
    const cellSize = game.cellSize;
    for (let i = 0; i < game.width; i += cellSize) {
      for (let j = 0; j < game.height; j += cellSize) {
        ctx.fillStyle = DOT_COLOR;
        ctx.fillRect(i - radius / 2, j - radius / 2, radius, radius);
      }
    }
  }
}

const ActiveCell={
  applyColorPalette(ctx:CanvasRenderingContext2D,cellSize:number){
    ctx.fillStyle = CELL_COLOR;
    ctx.strokeStyle = CELL_BOUNDRY_COLOR;
    ctx.lineWidth = cellSize / 20;
  },
  drawCircle(game:Game, ctx:CanvasRenderingContext2D, x:number, y:number) {
    const cellSize = game.cellSize;
    this.applyColorPalette(ctx,cellSize);
    ctx.beginPath();
    ctx.arc(cellSize * x + cellSize / 2,cellSize * y + cellSize/ 2,cellSize / 2,0,Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  drawSquare(game:Game, ctx:CanvasRenderingContext2D, x:number, y:number) {
    const cellSize = game.cellSize;
    this.applyColorPalette(ctx,cellSize);
    ctx.beginPath();
    ctx.rect(cellSize*x, cellSize*y, cellSize, cellSize);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  drawAsCircle(ctx:CanvasRenderingContext2D, game:Game) {
    for (const activeCell of game.activeCells) {
      let [x, y] = activeCell.split(",").map(Number);
      if(!this.isInView(game,x,y)){continue;}
      const {displayDx:dx,displayDy:dy}=game;
      this.drawCircle(game, ctx, x+dx, y+dy);
    }
  },
  drawAsSquare(ctx:CanvasRenderingContext2D, game:Game) {
    for (const activeCell of game.activeCells) {
      let [x, y] = activeCell.split(",").map(Number);

      if(!this.isInView(game,x,y)){ continue;}
      const {displayDx:dx,displayDy:dy}=game;

      this.drawSquare(game, ctx, x+dx, y+dy);
    }
  },
  
  isInView(game:Game,x:number,y:number){

    const maxGridX=Math.floor(game.width/game.cellSize);
    const maxGridY=Math.floor(game.height/game.cellSize);
    const {displayDx:dx,displayDy:dy}=game;
    const isInView=( ( x+dx<=maxGridX) && ( y+dy<=maxGridY)  );
    return (isInView);
}
}

export function renderGame(ctx:CanvasRenderingContext2D, game:Game) {
  set_color(game);
  clearCanvas(ctx, game);
  Grid.drawSquareGrid(ctx, game);
  // ActiveCell.drawAsSquare(ctx, game);
  ActiveCell.drawAsCircle(ctx, game);


}
export function clearCanvas(ctx:CanvasRenderingContext2D, game:Game) {
  ctx.clearRect(0, 0, game.width, game.height);
}
