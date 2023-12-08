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
  left: function (game, event) {
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
    getZoomFactor: function(game,deltaY){
      let zoomFactor=Math.min(5,Math.abs(deltaY))/20;
      zoomFactor= deltaY<0 ? 1-zoomFactor : zoomFactor+1;
      return zoomFactor
    },
    in: function(game, event) {
        if (event.keyCode !== 107) { return; }
        game.cellSize =Math.min(200,game.cellSize*this.getZoomFactor(game,5));
      },

    out:function(game, event) {
        if (event.keyCode !== 109) { return; }
        game.cellSize = Math.max(1, game.cellSize*this.getZoomFactor(game,-5));
      },

    gestureZoom:function(ctx,game,event){
        const [oldmouseX,oldmouseY] =getMousePosOnBoard(ctx,game,event).split(",").map(Number);

        let deltaY=Math.floor(event.deltaY);
        const zoomFactor=this.getZoomFactor(game,deltaY);
        game.cellSize=Math.min(50,Math.max(1,game.cellSize*zoomFactor));

        const [newMouseX,newMouseY] = getMousePosOnBoard(ctx,game,event).split(",").map(Number);
        let dx = newMouseX-oldmouseX;
        let dy = newMouseY-oldmouseY;
        Scroll.scrollCells(game,dx,0);
        Scroll.scrollCells(game,0,dy);
  
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
    changeBackground: function(ctx, event) {
      // const canvas=ctx.canvas;
        
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

  const { relativeX, relativeY } = { relativeX: clientX - canvasX, relativeY: clientY - canvasY };
  const { gridX, gridY } = { gridX: Math.floor(relativeX / cellSize), gridY: Math.floor(relativeY / cellSize) };

  return `${gridX},${gridY}`;
}


function handleKeyPress(game, event) {
  console.log("im here");
    Scroll.up(game, event);
    Scroll.down(game, event);
    Scroll.left(game, event);
    Scroll.right(game, event);
    isPaused(game, event);
    Zoom.in(game, event);
    Zoom.out(game, event);
    Speed.up(game,event);
    Speed.down(game,event);
}



function HandleMouseClick(ctx, game, event) {
    const clickedCell = getMousePosOnBoard(ctx, game, event);
    if (!game.activeCells.has(clickedCell)) {
        Cell.add(game,clickedCell);
    }else{
        Cell.remove(game,clickedCell);
    }
}

export function initializeInputListeners(canvas, game) {
    const ctx = canvas.getContext("2d");
    document.addEventListener("keydown", (event) => handleKeyPress(game, event));

    canvas.addEventListener("click", (event) =>HandleMouseClick( ctx,game, event));

    canvas.addEventListener("wheel",(event)=>Zoom.gestureZoom(ctx,game,event));
}
