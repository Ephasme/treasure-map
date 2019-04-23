import { Directions, IDirection } from "./directions";

export interface IRight { name: "Right"; value: 1; }
export const Right: IRight = { name: "Right", value: 1 };

export interface ILeft { name: "Left"; value: -1; }
export const Left: ILeft = { name: "Left", value: -1 };

export type IRotation = IRight | ILeft;

export type Rotate = (direction: IDirection) => IDirection;

export const rotate: (rotation: IRotation) => Rotate = (rotation) => (direction) => {
    return Directions[((direction.id + rotation.value) + 4) % 4];
};

export const rotateLeft = rotate(Left);
export const rotateRight = rotate(Right);
