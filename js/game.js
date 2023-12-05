function removeCells(game, cellsToRemove) {
  for (const cell of cellsToRemove) {
    game.activeCells.delete(cell);
  }
}

function addCells(game, cellsToAdd) {
  for (const cell of cellsToAdd) {
    game.activeCells.add(cell);
  }
}
function getNeighboursCount(game) {
  const neighboursCount = {};
  for (const activeCell of game.activeCells) {
    const [x, y] = activeCell.split(",").map(Number);
    const neighbours = getNeighbours(x, y);
    for (const neighbour of neighbours) {
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

function getNeighbours(x, y) {
  const neighbours = []; //consider imeplementing it as a set
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i !== x || j !== y) {
        neighbours.push(`${i},${j}`);
      }
    }
  }
  return neighbours;
}
export function initializeGame(canvas,width, height, cellSize, timeToNextGen) {
  return {
    canvas,
    width: width,
    height: height,
    cellSize: cellSize,
    activeCells: new Set(),
    isPaused: true,
    lastUpdateTime: performance.now(),
    updateInterval: timeToNextGen,
  };
}

export function updateGame(game) {
  const cellsToRemove = new Set();
  const cellsToAdd = new Set();
  const neighboursCount = getNeighboursCount(game);

  for (const [cell, count] of Object.entries(neighboursCount)) {
    if ((count === 2 || count === 3) && game.activeCells.has(cell)) {
      continue;
    }

    if ((count < 2 || count > 3) && game.activeCells.has(cell)) {
      cellsToRemove.add(cell);
    }

    if (count === 3 && !game.activeCells.has(cell)) {
      cellsToAdd.add(cell);
    }
  }

  removeCells(game, cellsToRemove);
  addCells(game, cellsToAdd);
}
export function addActiveCells(game, cells) {
  for (const cell of cells) {
    game.activeCells.add(cell);
  }
}
function getRandomCell( game,maxX,maxY) {
    const minX=Math.floor(maxX * Math.random()) ;
    const minY=Math.floor(maxY * Math.random());
    const cellSize = 150;
    const randomX=Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY=Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    const gridX = Math.floor(randomX / cellSize);
    const gridY = Math.floor(randomY / cellSize);
  return `${gridX},${gridY}`;
}

export function populateBoard(game,nCells) {
    console.log("im here in popia")
    const maxX=game.width;
    const maxY=game.height;

    for(let i=0;i<nCells;i++){
        const randomCell=getRandomCell(game,maxX*10,maxY*10);
        game.activeCells.add(randomCell);
    }

  console.log(game.activeCells);
}

export function clearBoard(game) {
  //clear board. future feature
}
