import {Game} from './interfaces'
function removeCells(game:Game, cellsToRemove:Set<string>):void {
  for (const cell of cellsToRemove) {
    game.activeCells.delete(cell);
  }
}

function addCells(game:Game, cellsToAdd:Set<string>):void {
  for (const cell of cellsToAdd) {
    game.activeCells.add(cell);
  }
}

function getNeighboursCount(game:Game) {
  // const neighboursCount = new Map<string, number>();
  const neighboursCount : { [key: string]: number } = {};
  for (const activeCell of game.activeCells) {
    const [x, y] = activeCell.split(",").map(Number);
    const neighbours = getNeighbours(x, y);
    for (const neighbour of neighbours) {
      // neighboursCount.set(neighbour, (neighboursCount.get(neighbour) || 0) + 1);
        neighboursCount[neighbour] = (neighboursCount[neighbour] || 0) + 1;
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

function getNeighbours(x:number, y:number):Set<string> {
  
  const neighbours = new Set<string>(); 
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i !== x || j !== y) {
        neighbours.add(`${i},${j}`);
      }
    }
  }
  return neighbours;
}

export function updateGame(game:Game) {
  const cellsToRemove = new Set<string>();
  const cellsToAdd = new Set<string>();
  const neighboursCount = getNeighboursCount(game);

  for (const [cell, count] of Object.entries(neighboursCount)) {
    const hasActiveCell=game.activeCells.has(cell);
    if ((count === 2 || count === 3) && hasActiveCell ) {
      continue;
    }

    if ((count < 2 || count > 3) && hasActiveCell) {
      cellsToRemove.add(cell);
    }

    if (count === 3 && !hasActiveCell) {
      cellsToAdd.add(cell);
    }
  }
  removeCells(game, cellsToRemove);
  addCells(game, cellsToAdd);
}

function getRandomCell( game:Game,maxX:number,maxY:number) {
    const minX=Math.floor(maxX * Math.random()) ;
    const minY=Math.floor(maxY * Math.random());
    const cellSize = 150;
    const randomX=Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY=Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    const gridX = Math.floor(randomX / cellSize);
    const gridY = Math.floor(randomY / cellSize);
  return `${gridX},${gridY}`;
}
export function initializeGame(
  canvas:HTMLCanvasElement,
  width:number, 
  height:number,
  cellSize:number, 
  updateInterval:number
):Game {
  return {
    canvas,
    width,
    height,
    cellSize,
    updateInterval,
    activeCells: new Set<string>(),
    isPaused: false,
    lastUpdateTime: 0,
    displayDx : 0,
    displayDy : 0 
  };
}

export function populateBoard(game:Game,nCells:number) {
    const maxX=game.width;
    const maxY=game.height;
    for(let i=0;i<nCells;i++){
        const randomCell=getRandomCell(game,maxX*10,maxY*10);
        game.activeCells.add(randomCell);
    }
}
export function sierpinskiTriangle(game:Game,nCells:number){
    for(let i=0;i<nCells;i++){
        const totalHorizontalCells= Math.floor(game.width/game.cellSize);
        const midX=Math.floor(totalHorizontalCells/2);
      let y=Math.floor(game.height/20);

        const randomCell=`${midX},${i}`;

        game.activeCells.add(randomCell);

    }
}
export function addActiveCells(game:Game, cells:Set<string>) {
  for (const cell of cells) {
    game.activeCells.add(cell);
  }
}
export function clearBoard(game:Game) {
  game.activeCells=new Set();
}
