const CELL_COLOR='#fec3a6';
const CELL_BOUNDRY_COLOR='blue';
// const GRID_COLOR='#EFE9AE';
const GRID_COLOR='yellow';

function drawBoundary(ctx,game){
    ctx.rect(0, 0, game.width, game.height);
    ctx.strokeStyle='#FF928B';
}

function drawVerticalLines(ctx,game){
    const offset=game.cellSize;
    for(let i=1;i<game.width/offset;i++){
        const x=offset*Math.floor(i);
        const y1=0;
        const y2=game.height;

        ctx.moveTo(x,y1);
        ctx.lineTo(x,y2);
        // ctx.strokeStyle='black';
    }

}
function drawHorizontalLines(ctx,game){
    const offset=game.cellSize;
    for(let i=1;i<game.height / offset;i++){
        const y=offset*Math.floor(i);
        ctx.moveTo(0,y);
        ctx.lineTo(game.width,y);
        // ctx.strokeStyle='black';
    }

}
function drawGrid(ctx,game){
    ctx.beginPath();
    drawBoundary(ctx,game);
    drawVerticalLines(ctx,game);
    drawHorizontalLines(ctx,game);
    ctx.strokeStyle=GRID_COLOR;
    ctx.stroke();
    ctx.closePath();

}


function drawCellAsCircle(game,ctx,x,y){ //circle
    let v_offset=game.cellSize;
    let h_offset=game.cellSize;
    ctx.fillStyle=CELL_COLOR;
    ctx.beginPath();
    ctx.strokeStyle=CELL_BOUNDRY_COLOR;
    ctx.arc((h_offset*x)+h_offset/2, (v_offset*y)+h_offset/2,h_offset/2,0,Math.PI *2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawCellAsSqaure(game,ctx,x,y){
    const cellSize=game.cellSize;
   
    ctx.fillStyle=CELL_COLOR;
    ctx.strokeStyle=CELL_BOUNDRY_COLOR;

    ctx.beginPath();
    ctx.rect((cellSize*x), (cellSize*y), cellSize,cellSize);  
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();
    

}
function drawActiveCells(ctx,game){
    for(const activeCell of game.activeCells){
        let [x,y]=activeCell.split(',').map(Number);
        drawCellAsSqaure(game,ctx,x,y);
        // drawCellAsCircle(game,ctx,x,y);
    }


}

export function renderGame(ctx,game){
    clearCanvas(ctx,game);
    drawGrid(ctx,game);
    drawActiveCells(ctx,game);

}
export function clearCanvas(ctx,game){
    ctx.clearRect(0,0,game.width,game.height);
}
