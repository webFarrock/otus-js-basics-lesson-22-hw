/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";
import { iOnCellClick, iRunInterval, tField, tRow } from "./types";

const DEFAULT_GAME_SPEED = 2000;
/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(sizeX: number, sizeY: number, htmlElement: HTMLElement) {
  let gameIsRunning = false;
  let timer: number;

  // Создать блок для поля
  // Создать кнопку управления игрой
  htmlElement.classList.add("game");
  htmlElement.innerHTML = `
    <div class="game__field"></div>
    <div class="game__controls">
        <div class="game__controls-item">
          <label>
              <input type="number" class="game__speed" value="${DEFAULT_GAME_SPEED}"/>
              game speed
          </label>
        </div>
        <div class="game__controls-item">
            <button class="game__run-btn">Start</button>
        </div>
    </div>
`;
  const fieldWrapper = htmlElement.querySelector(".game__field") as HTMLElement;
  const button = htmlElement.querySelector(".game__run-btn") as HTMLButtonElement;
  const gameSpeedInput = htmlElement.querySelector(".game__speed") as HTMLButtonElement;

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
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame(): void {
    gameIsRunning = false;
    button.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }
  function startGame(): void {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;
    button.innerHTML = "Stop";
    // - запустить таймер для обновления поля
    const speed = Number(gameSpeedInput.value);
    timer = runInterval(speed);
  }

  button.addEventListener("click", () => {
    if (gameIsRunning) {
      stopGame();
    } else {
      startGame();
    }
  });

  gameSpeedInput.addEventListener("change", (e) => {
    if (gameIsRunning) {
      stopGame();
      startGame();
    }
  });
}
