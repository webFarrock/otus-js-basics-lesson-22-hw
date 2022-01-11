import { getCellState } from "./getCellState";
import { cellState } from "./types";

describe("getCellState", () => {
  const field = [
    [cellState.DOOMED, cellState.DEAD, cellState.DEAD, cellState.DEAD],
    [cellState.ALIVE, cellState.DEAD, cellState.DEAD, cellState.ALIVE],
    [cellState.DEAD, cellState.DEAD, cellState.DEAD, cellState.DEAD],
    [cellState.ALIVE, cellState.DEAD, cellState.ALIVE, cellState.DEAD],
  ];
  const expectedCellStates = [
    [cellState.DOOMED, cellState.DEAD, cellState.DEAD, cellState.DEAD],
    [cellState.ALIVE, cellState.DEAD, cellState.DEAD, cellState.ALIVE],
    [cellState.DEAD, cellState.DEAD, cellState.DEAD, cellState.DEAD],
    [cellState.ALIVE, cellState.DEAD, cellState.ALIVE, cellState.DEAD],
  ];

  it("returns `0` for [[0]]] 0:0", () => {
    expect(getCellState([[cellState.DEAD]], 0, 0)).toBe(cellState.DEAD);
  });

  it("returns list of cellStates", () => {
    for (let i = 0; i < field.length; i += 1) {
      for (let j = 0; j < field[i].length; j += 1) {
        expect(getCellState(field, j, i)).toBe(expectedCellStates[i][j]);
      }
    }
  });

  it("returns `0` for fields out of range", () => {
    for (let i = -1; i < 1; i += 1) {
      for (let j = -1; j < 1; j += 1) {
        expect(getCellState([], i, j)).toBe(cellState.DEAD);
        expect(getCellState([[]], i, j)).toBe(cellState.DEAD);
        expect(getCellState([[cellState.DEAD]], i, j)).toBe(cellState.DEAD);
      }
    }
  });

  it("returns valid values for triangle", () => {
    const triangleField = [
      [cellState.ALIVE, cellState.ALIVE],
      [cellState.ALIVE, cellState.DEAD],
    ];
    expect(getCellState(triangleField, 0, 0)).toBe(cellState.ALIVE);
    expect(getCellState(triangleField, 1, 0)).toBe(cellState.ALIVE);
    expect(getCellState(triangleField, 0, 1)).toBe(cellState.ALIVE);
    expect(getCellState(triangleField, 1, 1)).toBe(cellState.DEAD);
  });
});
