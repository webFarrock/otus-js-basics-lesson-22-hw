/* eslint-disable no-param-reassign */
import { createGameOfLife } from "./createGameOfLife";
import { drawField } from "./drawField";
import { cellState, iOnCellClick, tField } from "./types";

jest.mock("./drawField");

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("createGameOfLife", () => {
  let element: HTMLElement;
  const originalAlert = window.alert;

  beforeEach(() => {
    element = document.createElement("div");
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });

  describe("UI", () => {
    it("creates Start button and field", () => {
      createGameOfLife(10, 10, element);

      const btnStart = element.querySelector(".game__run-btn") as HTMLButtonElement;
      const fieldEl = element.querySelector(".game__field") as HTMLElement;

      expect(btnStart).toBeTruthy();
      expect(btnStart.innerHTML).toBe("Start");
      expect(fieldEl).toBeTruthy();
    });

    it("changes button name on click", () => {
      createGameOfLife(10, 10, element);
      const btnStart = element.querySelector(".game__run-btn") as HTMLButtonElement;

      expect(btnStart.innerHTML).toBe("Start");

      btnStart.click();
      expect(btnStart.innerHTML).toBe("Stop");

      btnStart.click();
      expect(btnStart.innerHTML).toBe("Start");

      btnStart.click();
      expect(btnStart.innerHTML).toBe("Stop");
    });

    it("draws field", () => {
      // @ts-ignore
      drawField.mockImplementation((fieldEl: HTMLElement, field: tField) => {
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });

      createGameOfLife(2, 2, element);

      const fieldEl = element.querySelector(".game__field") as HTMLElement;

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );
    });

    it("redraw field on interaction with it", () => {
      let onCellClick: iOnCellClick = jest.fn();

      // @ts-ignore
      drawField.mockImplementation((fieldEl: HTMLElement, field: tField, cellClickHandler: iOnCellClick) => {
        onCellClick = cellClickHandler;
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });

      createGameOfLife(2, 2, element);
      const fieldEl = element.querySelector(".game__field") as HTMLElement;

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );

      onCellClick(0, 0);
      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.ALIVE, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );

      onCellClick(0, 0);
      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );

      onCellClick(0, 1);
      onCellClick(1, 1);
      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD],
          [cellState.ALIVE, cellState.ALIVE],
        ])})`
      );
    });

    it("on start it runs timer to update state", async () => {
      let onCellClick: iOnCellClick = jest.fn();

      // @ts-ignore
      drawField.mockImplementation((fieldEl, field, cellClickHandler) => {
        onCellClick = cellClickHandler;
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });

      createGameOfLife(2, 2, element);
      const fieldEl = element.querySelector(".game__field") as HTMLElement;
      const btnStart = element.querySelector(".game__run-btn") as HTMLButtonElement;
      const gameSpeedInput = element.querySelector(".game__speed") as HTMLInputElement;
      const timer = Number(gameSpeedInput.value);

      onCellClick(0, 0);
      btnStart.click();

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.ALIVE, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );

      await sleep(timer);

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DOOMED, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );
    });

    it("stops game with alert, when none alive", async () => {
      let onCellClick: iOnCellClick = jest.fn();

      // @ts-ignore
      drawField.mockImplementation((fieldEl, field, cellClickHandler) => {
        onCellClick = cellClickHandler;
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });

      createGameOfLife(2, 2, element);
      const btnStart = element.querySelector(".game__run-btn") as HTMLButtonElement;
      const gameSpeedInput = element.querySelector(".game__speed") as HTMLInputElement;
      const timer = Number(gameSpeedInput.value);

      onCellClick(0, 0);
      btnStart.click();
      await sleep(timer);
      await sleep(timer);

      expect(window.alert).toHaveBeenCalledWith("Death on the block");
      expect(btnStart.innerHTML).toBe("Start");
    });

    it("Change field size on the fly", () => {
      let onCellClick: iOnCellClick = jest.fn();

      // @ts-ignore
      drawField.mockImplementation((fieldEl, field, cellClickHandler) => {
        onCellClick = cellClickHandler;
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });

      createGameOfLife(2, 2, element);
      const fieldEl = element.querySelector(".game__field") as HTMLElement;

      const gameRowsInput = element.querySelector(".game__rows") as HTMLInputElement;
      const gameColsInput = element.querySelector(".game__cols") as HTMLInputElement;

      gameRowsInput.value = `3`;
      gameRowsInput.dispatchEvent(new Event("change"));

      gameColsInput.value = `3`;
      gameColsInput.dispatchEvent(new Event("change"));

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD, cellState.DEAD],
        ])})`
      );

      gameRowsInput.value = `1`;
      gameRowsInput.dispatchEvent(new Event("change"));

      gameColsInput.value = `2`;
      gameColsInput.dispatchEvent(new Event("change"));

      expect(fieldEl.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [cellState.DEAD, cellState.DEAD],
          [cellState.DEAD, cellState.DEAD],
        ])})`
      );
    });
  });
});
