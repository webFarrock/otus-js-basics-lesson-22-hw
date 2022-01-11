/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { cellState, iOnCellClick, iRunInterval, tField, tRow } from "./types";

const DEFAULT_GAME_SPEED = 2000;
const GAME_MIN_SPEED = 1000;
const GAME_MIN_SIZE_COLS = 2;
const GAME_MIN_SIZE_ROWS = 2;

/**
 * Создание игры Жизнь
 * @param cols {number} - число колонок
 * @param rows {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(cols: number, rows: number, htmlElement: HTMLElement) {
  let gameIsRunning = false;
  let timer: number;
  let sizeX = cols;
  let sizeY = rows;

  // Создать блок для поля
  // Создать кнопку управления игрой
  htmlElement.classList.add("game");
  htmlElement.innerHTML = `
    
    <div class="game__controls">
        <div class="game__controls-item">
          <label>
            <input type="number" min="${GAME_MIN_SPEED}" step="1000" class="game__speed" value="${DEFAULT_GAME_SPEED}"/>
            game speed
          </label>
        </div>
        <div class="game__controls-item">
          <label>
            <input type="number" min="${GAME_MIN_SIZE_ROWS}" class="game__rows" value="${sizeX}"/>
            rows
          </label>
        </div>
        <div class="game__controls-item">
          <label>
            <input type="number" min="${GAME_MIN_SIZE_COLS}" class="game__cols" value="${sizeY}"/>
            cols
          </label>
        </div>
        <div class="game__controls-item">
            <button class="game__random-fill-btn">Random fill</button>
        </div>
        <div class="game__controls-item">
            <button class="game__run-btn">Start</button>
        </div>
    </div>
    <div class="game__field"></div>
    <hr>
`;
  const fieldWrapper = htmlElement.querySelector(".game__field") as HTMLElement;
  const btnStart = htmlElement.querySelector(".game__run-btn") as HTMLButtonElement;
  const btnRandomFill = htmlElement.querySelector(".game__random-fill-btn") as HTMLButtonElement;
  const gameSpeedInput = htmlElement.querySelector(".game__speed") as HTMLInputElement;
  const gameRowsInput = htmlElement.querySelector(".game__rows") as HTMLInputElement;
  const gameColsInput = htmlElement.querySelector(".game__cols") as HTMLInputElement;

  let field: tField = [];
  for (let i = 0; i < sizeY; i++) {
    const row: tRow = [];
    for (let j = 0; j < sizeX; j++) {
      row.push(0);
    }
    field.push(row);
  }

  const runInterval: iRunInterval = (speed: number): number => {
    return Number(
      setInterval(() => {
        // В таймере обновления поля
        // - посчитать новое состояние поля
        // - отрисовать новое состояние поля
        // - проверить, что есть живые клетки
        // - если живых клеток нет
        //    - остановить таймер
        //    - вывести сообщение
        field = getNextState(field);
        drawField(fieldWrapper, field, cellClickHandler);
        if (!isAnyoneAlive(field)) {
          alert("Death on the block");
          stopGame();
        }
      }, speed)
    );
  };

  const cellClickHandler: iOnCellClick = (x: number, y: number): void => {
    field[y][x] = field[y][x] === cellState.DEAD ? cellState.ALIVE : cellState.DEAD;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame(): void {
    gameIsRunning = false;
    btnStart.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }

  function startGame(): void {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;
    btnStart.innerHTML = "Stop";
    // - запустить таймер для обновления поля
    const speed = parseInt(gameSpeedInput.value);
    timer = runInterval(speed);
  }

  btnStart.addEventListener("click", () => {
    if (gameIsRunning) {
      stopGame();
    } else {
      startGame();
    }
  });

  btnRandomFill.addEventListener("click", () => {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        field[i][j] = Math.random() >= 0.5 ? 1 : 0;
      }
    }
    drawField(fieldWrapper, field, cellClickHandler);
  });

  gameSpeedInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value);
    const min = parseInt(target.min);
    if (value < min) {
      target.value = `${min}`;
    }

    if (gameIsRunning) {
      stopGame();
      startGame();
    }
  });

  gameRowsInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    let rows = parseInt(target.value);
    const min = parseInt(target.min);
    if (rows < min) {
      rows = min;
      target.value = `${min}`;
    }

    if (rows > field.length) {
      for (let i = rows - sizeY; i > 0; i--) {
        const row: tRow = [];
        for (let j = 0; j < sizeX; j++) {
          row.push(0);
        }
        field.push(row);
      }
    } else {
      field.splice(rows - sizeY);
    }

    sizeY = rows;
    drawField(fieldWrapper, field, cellClickHandler);
  });

  gameColsInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    let cols = parseInt(target.value);
    const min = parseInt(target.min);
    if (cols < min) {
      cols = min;
      target.value = `${min}`;
    }

    for (let i = 0; i < sizeY; i++) {
      if (field[i].length < cols) {
        field[i].push(0);
      } else {
        field[i].splice(cols - sizeX);
      }
    }
    sizeX = cols;
    drawField(fieldWrapper, field, cellClickHandler);
  });
}
