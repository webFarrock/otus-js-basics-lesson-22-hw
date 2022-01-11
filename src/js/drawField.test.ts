import { drawField } from "./drawField";
import { cellState, iOnCellClick } from "./types";

describe("drawField", () => {
  let onCellClick: iOnCellClick;
  let el: HTMLElement;

  beforeEach(() => {
    onCellClick = jest.fn();
    el = document.createElement("div");
  });

  it("renders dead field 1x1", () => {
    drawField(el, [[0]], onCellClick);
    expect(el.querySelectorAll(".cell").length).toBe(1);
    expect(el.querySelectorAll(".cell.cell--dead").length).toBe(1);
  });

  it("renders alive field 1x1", () => {
    drawField(el, [[1]], onCellClick);
    expect(el.querySelectorAll(".cell").length).toBe(1);
    expect(el.querySelectorAll(".cell.cell--alive").length).toBe(1);
  });

  it("renders field mxn", () => {
    const field = [
      [cellState.DOOMED, cellState.DEAD, cellState.DEAD, cellState.DEAD],
      [cellState.DEAD, cellState.DEAD, cellState.ALIVE, cellState.DEAD],
      [cellState.ALIVE, cellState.ALIVE, cellState.ALIVE, cellState.DEAD],
      [cellState.ALIVE, cellState.ALIVE, cellState.ALIVE, cellState.DEAD],
    ];
    drawField(el, field, onCellClick);
    expect(el.querySelectorAll(".cell").length).toBe(16);
    expect(el.querySelectorAll(".cell.cell--alive").length).toBe(7);
    expect(el.querySelectorAll(".cell.cell--dead").length).toBe(8);
    expect(el.querySelectorAll(".cell.cell--doomed").length).toBe(1);
  });

  describe("onCellClick", () => {
    it("calls onCellClick on cell click", () => {
      const field = [
        [cellState.DEAD, cellState.DEAD, cellState.DEAD],
        [cellState.DEAD, cellState.DEAD, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE, cellState.DEAD],
      ];
      drawField(el, field, onCellClick);
      const cell1 = el.querySelector('.cell[data-x="1"][data-y="2"]') as HTMLElement;
      cell1.click();
      expect(onCellClick).toHaveBeenCalledWith(1, 2);

      const cell2 = el.querySelector('.cell[data-x="2"][data-y="0"]') as HTMLElement;
      cell2.click();
      expect(onCellClick).toHaveBeenCalledWith(2, 0);
    });

    it("calls onCellClick only once on multiple drawing", () => {
      const field = [
        [cellState.DEAD, cellState.DEAD, cellState.DEAD],
        [cellState.DEAD, cellState.DEAD, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE, cellState.DEAD],
      ];
      drawField(el, field, onCellClick);
      drawField(el, field, onCellClick);
      const cell1 = el.querySelector('.cell[data-x="1"][data-y="2"]') as HTMLElement;
      cell1.click();
      expect(onCellClick).toHaveBeenCalledWith(1, 2);
      expect(onCellClick).toHaveBeenCalledTimes(1);
    });
  });
});
