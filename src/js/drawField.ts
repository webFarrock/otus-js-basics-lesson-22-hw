import { cellState, iOnCellClick, tField, tRow } from "./types";

/**
 * отрисовка поля
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисовано поле
 * @param field {number[][]} - состояние поля
 * @param onCellClick {(x: number, y: number) => void}
 * @returns void
 */
function drawCell(x: number, y: number, state: cellState): string {
  return `<td data-x=${x} data-y=${y} class="cell cell--${getCellCls(state)}"></td>`;
}

function getCellCls(state: cellState): string {
  switch (state) {
    case cellState.ALIVE:
      return "alive";
    case cellState.DEAD:
      return "dead";
    case cellState.DOOMED:
      return "doomed";
  }
}

export function drawField(htmlElement: HTMLElement, field: tField, onCellClick: iOnCellClick) {
  const rowIterator = (row: tRow, rowIndex: number) => {
    return `<tr>${row
      .map((cell: cellState, columnIndex) => {
        return drawCell(columnIndex, rowIndex, cell);
      })
      .join("")}</tr>`;
  };

  const table = `<table border=1>${field.map(rowIterator).join("")}</table>`;

  // eslint-disable-next-line no-param-reassign
  htmlElement.innerHTML = table;
  const elTable = htmlElement.querySelector("table") as HTMLElement;

  elTable.addEventListener("click", (ev) => {
    const clickedElement = ev.target as HTMLElement;

    if (clickedElement.tagName !== "TD") {
      return;
    }

    const x = Number(clickedElement.getAttribute("data-x"));
    const y = Number(clickedElement.getAttribute("data-y"));
    if (x >= 0 && y >= 0) {
      onCellClick(x, y);
    }
  });
}
