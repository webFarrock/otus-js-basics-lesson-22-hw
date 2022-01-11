export enum cellState {
  DEAD = 0,
  ALIVE,
  DOOMED,
}

export type tField = number[][];
export type tRow = cellState[];
export interface iOnCellClick {
  (x: number, y: number): void;
}

export interface iRunInterval {
  (speed: number): number;
}

export interface iGetCellState {
  (field: tField, x: number, y: number): number;
}

export interface iAliveNeighboursNum {
  (column: number, row: number, field: tField): number;
}

export interface iNextState {
  (field: tField): tField;
}
