import { sierpinskiTriangle } from "./game.js";
import { clearBoard } from "./game.js";
import { Game } from "./interfaces.js";
/**
 * todo:
 * encapsulate mouseEventLogic
 * encapsulate keyPressLogic
 * consider chanigng Cell={} name to Board
 * changeBackground,changeColor
 * 
 */
const Scroll = {
  _scrollIncrement: 5,
  up(game:Game, event:KeyboardEvent) {
    if (event.key !== 'ArrowUp') { return; }
    this.scrollCells(game, 0, this._scrollIncrement);

  },
  down(game:Game, event:KeyboardEvent) {
    if (event.key !== 'ArrowDown') { return; }
    this.scrollCells(game, 0, -this._scrollIncrement);
  },
  left(game:Game, event:KeyboardEvent) {
    if (event.key !== 'ArrowLeft') { return; }
    this.scrollCells(game,this._scrollIncrement, 0);
  },
  right(game:Game, event:KeyboardEvent) {
    if (event.key !== 'ArrowRight') { return; }
    this.scrollCells(game, -this._scrollIncrement, 0);
  },
  scrollCells (game:Game, dx:number, dy:number) {
    game.displayDx+=dx;
    game.displayDy+=dy;
  }
};

const Zoom={
    _oldMousePos:'0,0',
    getZoomFactor(game:Game,deltaY:number){
      let zoomFactor=Math.min(5,Math.abs(deltaY))/20;
      zoomFactor= deltaY<0 ? 1-zoomFactor : zoomFactor+1;
      return zoomFactor
    },
    in(game:Game, event:KeyboardEvent) {
        if (event.keyCode !== 107) { return; }
        game.cellSize =Math.min(200,game.cellSize*this.getZoomFactor(game,5));
      },

    out(game:Game, event:KeyboardEvent) {
        if (event.keyCode !== 109) { return; }
        game.cellSize = Math.max(1, game.cellSize*this.getZoomFactor(game,-5));
      },
    gestureZoom(ctx:CanvasRenderingContext2D,game:Game,event:WheelEvent){
        this._oldMousePos =getMousePosOnBoard(ctx,game,event);
        let deltaY=Math.floor(event.deltaY);
        const zoomFactor=this.getZoomFactor(game,deltaY);
        game.cellSize=Math.min(50,Math.max(1,game.cellSize*zoomFactor));
        this.centerOnZoom(ctx,game,event);
      },
    centerOnZoom(ctx:CanvasRenderingContext2D,game:Game,event:MouseEvent){
      const [oldmouseX,oldmouseY] =this._oldMousePos.split(",").map(Number);
      const [newMouseX,newMouseY] = getMousePosOnBoard(ctx,game,event).split(",").map(Number);
      Scroll.scrollCells(game,newMouseX-oldmouseX,0);
      Scroll.scrollCells(game,0,newMouseY-oldmouseY);
      
    }
}
const Speed={
    up(game:Game, event:KeyboardEvent) {
        if (event.keyCode !== 104) {return;}
        game.updateInterval= Math.max(0, game.updateInterval-10);
      },
    down(game:Game, event:KeyboardEvent) {
        if (event.keyCode !== 105) {return;}
        game.updateInterval = Math.min(500, game.updateInterval+10);
      }
}
const Cell={
    add(game:Game,clickedCell:string){
        game.activeCells.add(clickedCell);
    },
    remove(game:Game,clickedCell:string){
        game.activeCells.delete(clickedCell);
    },
    // changeBackground( ctx, event) {
    //   // const canvas=ctx.canvas;
        
    //   },
    // changeColor(canvas, event) {
    //     //todo
    //   }
    
}
const Drag={
  isMouseDown : false,
  prevMousePos : '',
  onMouseDown(ctx:CanvasRenderingContext2D,game:Game,event:MouseEvent){
    // this.isMouseDown=true;
    this.prevMousePos=getMousePosOnBoard(ctx,game,event);
  },
  onMouseUp(ctx:CanvasRenderingContext2D,game:Game,event:MouseEvent){
    const currentMousePos=getMousePosOnBoard(ctx,game,event);
    console.log(currentMousePos,this.prevMousePos);

    const {dx,dy}= this.getDisplacement(currentMousePos,this.prevMousePos);
    game.displayDx=dx;
    game.displayDy=dy;

  },
  scroll(ctx:CanvasRenderingContext2D,game:Game,event:MouseEvent){
    if (this.isMouseDown){this.prevMousePos=getMousePosOnBoard(ctx,game,event); } 
    else{
    console.log("im here");
    const currentMousePos=getMousePosOnBoard(ctx,game,event);
    const {dx,dy}= this.getDisplacement(currentMousePos,this.prevMousePos);
    game.displayDx+=dx;
    game.displayDy+=dy;
    }
  
  },
  getDisplacement(currentMousePos:string,prevMousePos:string){

    const [currentX,currentY]=currentMousePos.split(",").map(Number);
    // console.log(currentX,currentY);

    const [prevX,prevY]=prevMousePos.split(",").map(Number);
    const dx=currentX-prevX;
    const dy = currentY-prevY
    return {dx,dy};

  }
}
function isPaused(game:Game, event:KeyboardEvent) {
  if (event.keyCode !== 32) { return; }
  game.isPaused = !game.isPaused;
}


function getMousePosOnBoard(ctx:CanvasRenderingContext2D, game:Game, event:MouseEvent) {
  const cellSize = game.cellSize;
  const canvasRect = ctx.canvas.getBoundingClientRect();

  const { clientX, clientY } = event;
  
  const { left: canvasX, top: canvasY } = canvasRect;

  const { relativeX, relativeY } = { relativeX: clientX - canvasX, relativeY: clientY - canvasY };
  const { gridX, gridY } = { gridX: Math.floor(relativeX / cellSize), gridY: Math.floor(relativeY / cellSize) };

  return `${gridX-game.displayDx},${gridY-game.displayDy}`;
}

function drawSierTriangle(game:Game,event:KeyboardEvent){
  if (event.key!=='r'){return;}
  const nCells=400;
  clearBoard(game);
  sierpinskiTriangle(game,nCells);

}
function handleKeyPress(game:Game, event:KeyboardEvent) {
    Scroll.up(game, event);
    Scroll.down(game, event);
    Scroll.left(game, event);
    Scroll.right(game, event);
    isPaused(game, event);
    Zoom.in(game, event);
    Zoom.out(game, event);
    Speed.up(game,event);
    Speed.down(game,event);
    drawSierTriangle(game,event);
}



function HandleMouseClick(ctx:CanvasRenderingContext2D, game:Game, event:MouseEvent) {
    const clickedCell = getMousePosOnBoard(ctx, game, event);
    if (!game.activeCells.has(clickedCell)) {
        Cell.add(game,clickedCell);
    }else{
        Cell.remove(game,clickedCell);
    }
}

export function initializeInputListeners(canvas:HTMLCanvasElement, game:Game) {
    const ctx = canvas.getContext("2d")!;
    document.addEventListener("keydown", (event) => handleKeyPress(game, event));

    canvas.addEventListener("click", (event) =>HandleMouseClick( ctx,game, event));
    
    canvas.addEventListener("wheel",(event)=>Zoom.gestureZoom(ctx,game,event));
    // canvas.addEventListener("mousedown",(event)=>Drag.onMouseDown(ctx,game,event));
    // canvas.addEventListener("mouseup",(event)=>Drag.onMouseUp(ctx,game,event));
}
