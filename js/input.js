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
    console.log("im here");
}
function zoomOut(game,event){
    if (event.keyCode !== 109) { return; }
    let oldCellSize=game.cellSize;
    game.cellSize-=1;
    game.cellSize=Math.max(3,game.cellSize);
    console.log(game.cellSize);

    // const tempCellSize=game.cellSize-5;
    // game.cellSize=min(1,tempCellSize);
}
function addCellonClick(canvas,game,event){
    const cellSize=game.cellSize;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    console.log(mouseX,mouseY);
    
    const canvasRect=canvas.getBoundingClientRect();
    const canvasX=canvasRect.left;
    const canvasY=canvasRect.top;

    const relativeX = mouseX - canvasX;
    const relativeY = mouseY - canvasY;

    const gridX = Math.floor(relativeX / cellSize);
    const gridY = Math.floor(relativeY / cellSize);
    
    game.activeCells.add(`${gridX},${gridY}`);

}
function speedUp(speed,event){
    if (event.keyCode!==104){return;}
    speed.value-=5;
    speed.value=Math.max(0,speed.value);
    console.log(speed);

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

export function initializeInputListeners(canvas,game,speed){
// ctx.addEventListener('mousedown',handleMousePress);
document.addEventListener('keydown', (event)=>handleKeyPress(game,event,speed));
document.addEventListener('click', (event)=>addCellonClick(canvas,game,event));


}