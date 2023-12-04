function removeCells(game,cellsToRemove){

    for(const cell of cellsToRemove){
        game.activeCells.delete(cell);
    }
}

function addCells(game,cellsToAdd){
    for(const cell of cellsToAdd){
        game.activeCells.add(cell);
    }
}
function getNeighboursCount(game){
    const neighboursCount={};
    for(const activeCell of game.activeCells){
        const [x,y]=activeCell.split(',').map(Number);
        const neighbours=getNeighbours(x,y);

        for(const neighbour of neighbours){
            neighboursCount[neighbour]= ( neighboursCount[neighbour] || 0)+1;
        }
    }
     // If a cell has no live neighbors, initialize its count to 0
    for (const activeCell of game.activeCells) {
        if (!neighboursCount[activeCell]) {

            neighboursCount[activeCell] = 0;
        }
    }
    return neighboursCount;

}
function addCells(game,cellsToAdd){
    for(const cell of cellsToAdd){
        game.activeCells.add(cell);
    }
}

function getNeighbours(x,y){
    const neighbours=[];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i !== x || j !== y) {
                neighbours.push(`${i},${j}`);
            }
        }
    }
    return neighbours;
}

export function initialiseGame(width,height,cellSize){
    return {
        width:width,
        height:height,
        cellSize:cellSize,
        activeCells:new set()
    }

}

export function updateGame(game){
    const cellsToRemove=new Set();
        const cellsToAdd=new Set();
        const neighboursCount=getNeighboursCount();

        for(const [cell,count] of Object.entries(neighboursCount)){
            if ((count === 2 || count === 3) && game.activeCells.has(cell)) {
                continue;
            }

            if ( (count<2 || count>3) && game.activeCells.has(cell)){
                cellsToRemove.add(cell);
                
            }

            if(count===3 && !game.activeCells.has(cell)){
                cellsToAdd.add(cell);
                
            }
        }
       
        removeCells(cellsToRemove);
        addCells(cellsToAdd);

}

export function populateBoard(game){

}
