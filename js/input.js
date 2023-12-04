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

function handleKeyPress(game,event){
    scroll.scrollUp(game,event);
    scroll.scrollDown(game,event);
    scroll.scrollLeft(game,event);
    scroll.scrollRight(game,event);
}

export function initializeInputListeners(ctx,game){
// ctx.addEventListener('mousedown',handleMousePress);
document.addEventListener('keydown', (event)=>handleKeyPress(game,event));


}