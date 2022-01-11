import { getNewCellState } from "./getNewCellState";
import { cellState } from "./types";

describe("getNewCellState", () => {
  it("should return valid new state", () => {
    expect(getNewCellState(cellState.DEAD, 0)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 1)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 2)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 3)).toBe(cellState.ALIVE);
    expect(getNewCellState(cellState.DEAD, 4)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 5)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 6)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 7)).toBe(cellState.DEAD);
    expect(getNewCellState(cellState.DEAD, 8)).toBe(cellState.DEAD);

    expect(getNewCellState(cellState.ALIVE, 0)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 1)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 2)).toBe(cellState.ALIVE);
    expect(getNewCellState(cellState.ALIVE, 3)).toBe(cellState.ALIVE);
    expect(getNewCellState(cellState.ALIVE, 4)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 5)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 6)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 7)).toBe(cellState.DOOMED);
    expect(getNewCellState(cellState.ALIVE, 8)).toBe(cellState.DOOMED);
  });
});
