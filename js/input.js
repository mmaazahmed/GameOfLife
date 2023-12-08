/**
 * todo:
 * encapsulate mouseEventLogic
 * encapsulate keyPressLogic
 * consider chanigng Cell={} name to Board
 * finish centerOnZoom,changeBackground,changeColor
 * 
 */
const Scroll = {
    SCROLL_INCREMENT: 5,

  up: function (game, event) {
    if (event.key !== 'ArrowUp') { return; }
    this.scrollCells(game, 0, this.SCROLL_INCREMENT);
  },
  down: function (game, event) {
    if (event.key !== 'ArrowDown') { return; }
    this.scrollCells(game, 0, -this.SCROLL_INCREMENT);
  },
  left: function (ctx,game, event) {
    if (event.key !== 'ArrowLeft') { return; }
    this.scrollCells(game, this.SCROLL_INCREMENT, 0);


  },
  right: function (game, event) {
    if (event.key !== 'ArrowRight') { return; }
    this.scrollCells(game, -this.SCROLL_INCREMENT, 0);
  },
  scrollCells: function (game, dx, dy) {
    const updatedCells = new Set();
  
    for (const coordinate of game.activeCells) {
      const [x, y] = coordinate.split(",").map(Number);
      const newX = x + dx;
      const newY = y + dy;
      updatedCells.add(`${newX},${newY}`);
    }
    game.activeCells = updatedCells;
  }
};

const Zoom={
    ZOOM_INCREMMENT: 2,
    In: function(game, event) {
        if (event.keyCode !== 107) { return; }
        game.cellSize =Math.min(200,game.cellSize+ this.ZOOM_INCREMMENT);
      },
    Out:function(game, event) {
        if (event.keyCode !== 109) { return; }
        game.cellSize = Math.max(1, game.cellSize-this.ZOOM_INCREMMENT);
        // this.centerOnZoom(canvas,game,event,prevCellSize);
      },
    centerOnZoom: function (canvas,game,event,prevCellSize){
      const {mouseX,mouseY}=getMousePosOnBoard(canvas,game,event);
      const dx = (game.cellSize - prevCellSize) * (mouseX / game.canvas.width);
      const dy = (game.cellSize - prevCellSize) * (mouseY / game.canvas.height);
      console.log(dx,dy);
      Scroll.scrollCells(game,dx,dy);
        //to do
    }
    
}
const Speed={
    up: function(game, event) {
        if (event.keyCode !== 104) {return;}
        game.updateInterval= Math.max(0, game.updateInterval-10);
      },
    down: function(game, event) {
        if (event.keyCode !== 105) {return;}
        game.updateInterval = Math.min(500, game.updateInterval+10);
      }
}
const Cell={
    add: function(game,clickedCell){
        game.activeCells.add(clickedCell);
    },
    remove:function(game,clickedCell){
        game.activeCells.delete(clickedCell);
    },
    changeBackground: function(canvas, event) {
        // to do
      },
    changeColor:function (canvas, event) {
        //todo
      }
    
}

function isPaused(game, event) {
  if (event.keyCode !== 32) { return; }
  game.isPaused = !game.isPaused;
}


function getMousePosOnBoard(ctx, game, event) {
  const cellSize = game.cellSize;
  const canvasRect = ctx.canvas.getBoundingClientRect();

  const { clientX, clientY } = event;
  const { left: canvasX, top: canvasY } = canvasRect;

  const relativeX = clientX - canvasX;
  const relativeY = clientY - canvasY;

  const gridX = Math.floor(relativeX / cellSize);
  const gridY = Math.floor(relativeY / cellSize);
  return `${gridX},${gridY}`;
}



function handleKeyPress(ctx,game, event) {
    Scroll.up(game, event);
    Scroll.down(game, event);
    Scroll.left(ctx,game, event);
    Scroll.right(game, event);
    isPaused(game, event);
    Zoom.In(game, event);
    Zoom.Out(game, event);
    Speed.up(game,event);
    Speed.down(game,event);
}

function HandleMouseClick(ctx, game, event) {
    const clickedCell = getMousePosOnBoard(canvas,ctx, game, event);
    if (!game.activeCells.has(clickedCell)) {
        Cell.add(game,clickedCell);
    }else{
        Cell.remove(game,clickedCell);
    }
}

export function initializeInputListeners(ctx, game) {
    document.addEventListener("keydown", (event) => handleKeyPress(ctx,game, event));
    document.addEventListener("click", (event) =>HandleMouseClick(ctx, game, event));
}
