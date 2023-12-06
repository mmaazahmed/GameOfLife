
const Scroll = {
    SCROLL_INCREMENT: 2,

  scrollUp: function (game, event) {
    if (event.keyCode !== 38) { return; }
    Scroll.scrollCells(game, 0, Scroll.SCROLL_INCREMENT);
  },
  scrollDown: function (game, event) {
    if (event.keyCode !== 40) { return; }
    Scroll.scrollCells(game, 0, -Scroll.SCROLL_INCREMENT);
  },
  scrollLeft: function (game, event) {
    if (event.keyCode !== 37) { return; }
    Scroll.scrollCells(game, Scroll.SCROLL_INCREMENT, 0);
  },
  scrollRight: function (game, event) {
    if (event.keyCode !== 39) { return; }
    Scroll.scrollCells(game, -Scroll.SCROLL_INCREMENT, 0);
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
    In: function(game, event) {
        if (event.keyCode !== 107) { return; }
        game.cellSize += 1;
      },
    Out:function(game, event) {
        if (event.keyCode !== 109) { return; }
        const prevCellSize=game.cellSize;
        game.cellSize = Math.max(3, game.cellSize-1);
      },
    centerOnZoom: function (game,event){
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


function isPaused(game, event) {
  if (event.keyCode !== 32) { return; }
  game.isPaused = !game.isPaused;
}


function getMousePosOnBoard(canvas, game, event) {
  const cellSize = game.cellSize;
  const canvasRect = canvas.getBoundingClientRect();

  const { clientX, clientY } = event;
  const { left: canvasX, top: canvasY } = canvasRect;

  const relativeX = clientX - canvasX;
  const relativeY = clientY - canvasY;

  const gridX = Math.floor(relativeX / cellSize);
  const gridY = Math.floor(relativeY / cellSize);
  return `${gridX},${gridY}`;
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



function handleKeyPress(game, event) {
    Scroll.scrollUp(game, event);
    Scroll.scrollDown(game, event);
    Scroll.scrollLeft(game, event);
    Scroll.scrollRight(game, event);
    isPaused(game, event);
    Zoom.In(game, event);
    Zoom.Out(game, event);
    Speed.up(game,event);
    Speed.down(game,event);
}

function HandleMouseClick(canvas, game, event) {
    const clickedCell = getMousePosOnBoard(canvas, game, event);
    if (!game.activeCells.has(clickedCell)) {
        Cell.add(game,clickedCell);
    }else{
        Cell.remove(game,clickedCell);
    }
}






export function initializeInputListeners(canvas, game) {
    document.addEventListener("keydown", (event) => handleKeyPress(game, event));
    document.addEventListener("click", (event) =>HandleMouseClick(canvas, game, event));
}
