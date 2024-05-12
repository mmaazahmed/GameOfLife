export interface Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    cellSize: number;
    updateInterval: number;
    activeCells: Set<string>;
    isPaused: boolean;
    lastUpdateTime: number;
    displayDx: number;
    displayDy: number;
  }