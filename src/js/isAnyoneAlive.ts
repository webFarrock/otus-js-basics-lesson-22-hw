import { tField, tRow } from "./types";

/**
 * проверка что есть живые клетки
 * @param field {number[][]} - состояние поля
 * @return boolean
 */
export function isAnyoneAlive(field: tField): boolean {
  for (let i = 0; i < field.length; i += 1) {
    const row: tRow = field[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell = row[j];
      if (cell) {
        return true;
      }
    }
  }
  return false;
}
