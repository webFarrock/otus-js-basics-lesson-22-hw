import { getNumOfAliveNeighbours } from "./getNumOfAliveNeighbours";
import { getCellState } from "./getCellState";
import { getNewCellState } from "./getNewCellState";
import { iNextState, tField, tRow } from "./types";

/**
 * получить новое состояние
 * @param field {number[][]} - состояние поля
 * @return number[][] - новое состояние поля
 */
export const getNextState: iNextState = function (field: tField): tField {
  return field.map((row: tRow, rowIndex: number) =>
    row.map((cell: number, cellIndex: number) => {
      const an = getNumOfAliveNeighbours(cellIndex, rowIndex, field);
      const currentState = getCellState(field, cellIndex, rowIndex);
      return getNewCellState(currentState, an);
    })
  );
};
