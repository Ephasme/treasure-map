import { East, IDirection, North, South, West } from "./directions";
import { add, IVector } from "./vector";

export const move: (direction: IDirection) => Mover =
    (direction) => (vector) => add(vector, direction);

export type Mover = (vector: IVector) => IVector;

export const moveNorth = move(North);
export const moveSouth = move(South);
export const moveEast = move(East);
export const moveWest = move(West);
