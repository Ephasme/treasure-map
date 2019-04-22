import { IVector, add, make } from "./vector";
import { IDirection, North, South, East, West } from "./directions";

export const move: (direction: IDirection) => Mover =
    (direction) => (vector) => add(vector, direction);

export type Mover = (vector: IVector) => IVector;

export const moveNorth = move(North);
export const moveSouth = move(South);
export const moveEast = move(East);
export const moveWest = move(West);
