import { cellState } from "./types";

function isAlive(currentCellState: number): boolean {
  return currentCellState === cellState.ALIVE;
}
export function getNewCellState(currentCellState: number, numOfAliveNeighbours: number): cellState {
  if (numOfAliveNeighbours === 3 || (numOfAliveNeighbours === 2 && isAlive(currentCellState))) {
    return cellState.ALIVE;
  }

  if (isAlive(currentCellState) && (numOfAliveNeighbours < 2 || numOfAliveNeighbours > 3)) {
    return cellState.DOOMED;
  }

  return cellState.DEAD;
}
