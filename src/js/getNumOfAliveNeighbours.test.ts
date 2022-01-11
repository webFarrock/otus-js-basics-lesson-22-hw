import { getNumOfAliveNeighbours } from "./getNumOfAliveNeighbours";
import { cellState } from "./types";

describe("getNumOfAliveNeighbours", () => {
  it("is a function", () => {
    expect(typeof getNumOfAliveNeighbours).toBe("function");
  });

  [
    { x: 0, y: 0, field: [[]], expectedResult: 0 },
    { x: 0, y: 0, field: [[cellState.DEAD], [cellState.DEAD]], expectedResult: 0 },
    { x: 0, y: 0, field: [[cellState.ALIVE], [cellState.ALIVE]], expectedResult: 1 },
    {
      x: 0,
      y: 0,
      field: [
        [cellState.DEAD, cellState.ALIVE, cellState.DEAD],
        [cellState.DOOMED, cellState.DEAD, cellState.DEAD],
      ],
      expectedResult: 2,
    },
    {
      x: 0,
      y: 0,
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD],
      ],
      expectedResult: 2,
    },
    {
      x: 1,
      y: 0,
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD],
      ],
      expectedResult: 2,
    },
    {
      x: 0,
      y: 1,
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD],
      ],
      expectedResult: 2,
    },
    {
      x: 1,
      y: 1,
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD],
      ],
      expectedResult: 3,
    },
    {
      x: 0,
      y: 0,
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE],
      ],
      expectedResult: 3,
    },
  ].forEach((el) => {
    it(`should return ${el.expectedResult} for cell (${el.x},${el.y}) in field ${JSON.stringify(el.field)}`, () => {
      expect(getNumOfAliveNeighbours(el.x, el.y, el.field)).toBe(el.expectedResult);
    });
  });
});
