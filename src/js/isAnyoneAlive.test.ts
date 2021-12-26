import { isAnyoneAlive } from "./isAnyoneAlive";
import { cellState } from "./types";

describe("isAnyoneAlive", () => {
  it("is a function", () => {
    expect(typeof isAnyoneAlive).toBe("function");
  });

  it("returns `false` for empty field", () => {
    expect(isAnyoneAlive([])).toBe(false);
    expect(isAnyoneAlive([[]])).toBe(false);
  });

  it("returns `true` for field 1x1 from 1", () => {
    expect(isAnyoneAlive([[1]])).toBe(true);
  });
  [
    { field: [], expectedResult: false },
    { field: [[]], expectedResult: false },
    { field: [[cellState.ALIVE]], expectedResult: true },
    { field: [[cellState.ALIVE], [cellState.DEAD]], expectedResult: true },
    { field: [[cellState.DEAD], [cellState.DEAD]], expectedResult: false },
    {
      field: [
        [cellState.DEAD, cellState.DEAD, cellState.DEAD],
        [cellState.DEAD, cellState.DEAD, cellState.ALIVE],
      ],
      expectedResult: true,
    },
  ].forEach((el) => {
    it(`should return ${el.expectedResult} for ${JSON.stringify(el.field)}`, () => {
      expect(isAnyoneAlive(el.field)).toBe(el.expectedResult);
    });
  });
});
