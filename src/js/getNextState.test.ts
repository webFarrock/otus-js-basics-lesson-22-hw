import { getNextState } from "./getNextState";
import { tField, tRow } from "./types";
import { cellState } from "./types";

/**
 * @param {number[][]} field
 * @returns string
 */
function fieldToStr(field: tField) {
  return `\n${field.map((el: tRow) => el.join("")).join("\n")}\n`;
}

describe("getNextState", () => {
  [
    { field: [[cellState.DEAD]], nextState: [[cellState.DEAD]] },
    { field: [[cellState.DEAD], [cellState.DEAD]], nextState: [[cellState.DEAD], [cellState.DEAD]] },
    { field: [[cellState.ALIVE]], nextState: [[cellState.DOOMED]] },
    { field: [[cellState.DEAD], [cellState.ALIVE]], nextState: [[cellState.DEAD], [cellState.DOOMED]] },
    {
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD],
      ],
      nextState: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE],
      ],
    },
    {
      field: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE],
      ],
      nextState: [
        [cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE],
      ],
    },
    {
      field: [
        [cellState.ALIVE, cellState.ALIVE, cellState.ALIVE],
        [cellState.ALIVE, cellState.ALIVE, cellState.ALIVE],
      ],
      nextState: [
        [cellState.ALIVE, cellState.DOOMED, cellState.ALIVE],
        [cellState.ALIVE, cellState.DOOMED, cellState.ALIVE],
      ],
    },
    {
      field: [
        [cellState.ALIVE, cellState.DEAD, cellState.ALIVE],
        [cellState.ALIVE, cellState.DEAD, cellState.ALIVE],
      ],
      nextState: [
        [cellState.DOOMED, cellState.DEAD, cellState.DOOMED],
        [cellState.DOOMED, cellState.DEAD, cellState.DOOMED],
      ],
    },
  ].forEach((el) => {
    it(`returns ${fieldToStr(el.nextState)} for ${fieldToStr(el.field)}`, () => {
      expect(getNextState(el.field)).toEqual(el.nextState);
    });
  });
});
