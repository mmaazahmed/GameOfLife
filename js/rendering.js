const colorPallet={
  c1: "rgb(248, 112, 96)",
  c2:'#102542',
  c3:"#b3a394",
  c4: "white",
  c5:"#F7CCC7",
  c6:"#306EC5",
  c7:"#CDD7D6",
  c8:"#e55381",
  c9:"#190B28",
  c10:"#685762",
  c11:"#EFA9AE",
  c12:"#F4BACC",
  c13:"#f7cbd9",
  c14:"#f9dce5"
}
const CELL_COLOR=colorPallet.c8; //c12 also looks good
const CELL_BOUNDRY_COLOR = colorPallet.c4;
const GRID_COLOR = colorPallet.c14;
const DOT_COLOR = "blue";

function set_color(game){
  game.canvas.style.background=colorPallet.c11;

}
const Grid={
  drawBoundary: function(ctx, game) { //might not be necassary. use css?
    ctx.strokeStyle = colorPallet.c1;
    ctx.lineWidth=game.cellSize/5;
    ctx.strokeRect(0, 0, game.width, game.height);

  },

  drawVerticals:function(ctx, game) {
    const offset = game.cellSize;
    for (let i = 1; i < game.width / offset; i++) {
      const x = offset * Math.floor(i);
      const y1 = 0;
      const y2 = game.height;
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
    }
  },

  drawHorizontals:function (ctx, game) {
    const offset = game.cellSize;
    for (let i = 1; i < game.height / offset; i++) {
      const y = offset * Math.floor(i);
      ctx.moveTo(0, y);
      ctx.lineTo(game.width, y);
    }
  },

  drawSquareGrid: function (ctx, game) {
    ctx.beginPath();
    this.drawBoundary(ctx, game);
    this.drawVerticals(ctx, game);
    this.drawHorizontals(ctx, game);
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = game.cellSize / 20;
    ctx.stroke();
    ctx.closePath();
  },

  drawDotGrid:function(ctx, game) { //consider deleting feature
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
  applyColorPallet: function(ctx,cellSize){
    ctx.fillStyle = CELL_COLOR;
    ctx.strokeStyle = CELL_BOUNDRY_COLOR;
    ctx.lineWidth = cellSize / 20;
  },
  drawCircle:function (game, ctx, x, y) {
    const cellSize = game.cellSize;
    this.applyColorPallet(ctx,cellSize);
    ctx.beginPath();
    ctx.arc(cellSize * x + cellSize / 2,cellSize * y + cellSize/ 2,cellSize / 2,0,Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  drawSquare:function(game, ctx, x, y) {
    const cellSize = game.cellSize;
    this.applyColorPallet(ctx,cellSize);
    ctx.beginPath();
    ctx.rect(cellSize * x, cellSize * y, cellSize, cellSize);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  drawAsCircle: function(ctx, game) {
    for (const activeCell of game.activeCells) {
      let [x, y] = activeCell.split(",").map(Number);
      this.drawCircle(game, ctx, x, y);
    }
  },
  drawAsSquare:function(ctx, game) {
    for (const activeCell of game.activeCells) {
      let [x, y] = activeCell.split(",").map(Number);
      this.drawSquare(game, ctx, x, y);
    }
  }
}

export function renderGame(ctx, game) {
  set_color(game);
  clearCanvas(ctx, game);
  Grid.drawSquareGrid(ctx, game);
  ActiveCell.drawAsSquare(ctx, game);
}
export function clearCanvas(ctx, game) {
  ctx.clearRect(0, 0, game.width, game.height);
}
