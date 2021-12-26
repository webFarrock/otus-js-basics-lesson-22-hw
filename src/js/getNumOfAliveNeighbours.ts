import { getCellState } from "./getCellState";
import { cellState, iAliveNeighboursNum, tField } from "./types";

/**
 * узнать сколько живых соседей вокруг клетки
 * @param column {number} - номер колонки
 * @param row {number} - номер строки
 * @param field {number[][]} - состояние поля
 * @return number - число живых соседей
 */
export const getNumOfAliveNeighbours: iAliveNeighboursNum = function (
  column: number,
  row: number,
  field: tField
): number {
  let neighbours = 0;

  for (let j = column - 1; j <= column + 1; j += 1) {
    neighbours += getCellState(field, j, row - 1) === cellState.DEAD ? 0 : 1;
  }

  for (let j = column - 1; j <= column + 1; j += 1) {
    neighbours += getCellState(field, j, row + 1) === cellState.DEAD ? 0 : 1;
  }

  neighbours += getCellState(field, column - 1, row) === cellState.DEAD ? 0 : 1;
  neighbours += getCellState(field, column + 1, row) === cellState.DEAD ? 0 : 1;

  return neighbours;
};
