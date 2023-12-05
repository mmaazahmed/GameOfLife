const SCROLL_INCREMENT=1;

const scroll={
    scrollUp: function(game,event){
        if (event.keyCode !== 38) { return; }
        scrollCells(game,0,SCROLL_INCREMENT);
    },
    scrollDown: function(game,event){
        if (event.keyCode !== 40) { return; }
        scrollCells(game,0,-SCROLL_INCREMENT);
    },
    scrollLeft: function(game,event){
        if (event.keyCode !== 37) { return; }
        scrollCells(game,SCROLL_INCREMENT,0);
    },
    scrollRight: function(game,event){
        if (event.keyCode !== 39) { return; }
        scrollCells(game,-SCROLL_INCREMENT,0);
    },
}

function scrollCells(game,dx,dy){
    const updatedCells=new Set();

    for(const coordinate of game.activeCells){
        const [x,y]=coordinate.split(',').map(Number);
        const newX=x+dx;
        const newY=y+dy;
        updatedCells.add(`${newX},${newY}`);
    }
    game.activeCells=updatedCells;
}

function isPaused(game,event){
    if (event.keyCode !== 32) { return; }

    game.isPaused=!game.isPaused;
    // console.log("im here");
}
function zoomIn(game,event){
    if (event.keyCode !== 107) { return; }
    game.cellSize+=1;
}
function zoomOut(game,event){
    if (event.keyCode !== 109) { return; }
    game.cellSize-=1;
    game.cellSize=Math.max(3,game.cellSize)
}
function getMousePosOnBoard(canvas,game,event){
    const cellSize=game.cellSize;
    const canvasRect=canvas.getBoundingClientRect();

    const {clientX,clientY}=event;
    const {left: canvasX,top: canvasY}=canvasRect;

    const relativeX = clientX - canvasX;
    const relativeY = clientY - canvasY;

    const gridX = Math.floor(relativeX / cellSize);
    const gridY = Math.floor(relativeY / cellSize);
    return `${gridX},${gridY}`
}

function speedUp(speed,event){
    if (event.keyCode!==104){return;}
    speed.value-=5;
    speed.value=Math.max(0,speed.value);

}
function speedDown(speed,event){
    if (event.keyCode!==105){return;}
    speed.value+=5;

}

function handleKeyPress(game,event,speed){
    scroll.scrollUp(game,event);
    scroll.scrollDown(game,event);
    scroll.scrollLeft(game,event);
    scroll.scrollRight(game,event);
    isPaused(game,event);
    zoomIn(game,event);
    zoomOut(game,event);
    speedUp(speed,event);
    speedDown(speed,event);
}
function HandleMouseClick(canvas,game,event){
    const clickedCell= getMousePosOnBoard(canvas,game,event);
    if (!game.activeCells.has(clickedCell)){
        game.activeCells.add(clickedCell);
    }else{
        game.activeCells.delete(clickedCell);
    }
    
}
export function initializeInputListeners(canvas,game,speed){
document.addEventListener('keydown', (event)=>handleKeyPress(game,event,speed));
document.addEventListener('click', (event)=> HandleMouseClick(canvas,game,event));


}