export interface IVector {
    readonly x: number;
    readonly y: number;
}
export const vector: (x: number, y: number) => IVector = (x, y) =>  ({x, y});
export const add: (v1: IVector, v2: IVector) => IVector = (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y });
export const equals: (v1: IVector, v2: IVector) => boolean = (v1, v2) => v1.x === v2.x && v1.y === v2.y;
