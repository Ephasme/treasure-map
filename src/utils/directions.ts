export const NORTH = "NORTH";
export interface INorth { id: 0; name: typeof NORTH; x: 0; y: 1; }
export const North: INorth = { id: 0, name: NORTH, x: 0, y: 1 };

export const EAST = "EAST";
export interface IEast { id: 1; name: typeof EAST; x: 1; y: 0; }
export const East: IEast = { id: 1, name: EAST, x: 1, y: 0 };

export const SOUTH = "SOUTH";
export interface ISouth { id: 2; name: typeof SOUTH; x: 0; y: -1; }
export const South: ISouth = { id: 2, name: SOUTH, x: 0, y: -1 };

export const WEST = "WEST";
export interface IWest { id: 3; name: typeof WEST; x: -1; y: 0; }
export const West: IWest = { id: 3, name: WEST, x: -1, y: 0 };

export type IDirection = INorth | IEast | ISouth | IWest;
export const Directions: IDirection[] = [ North, East, South, West ];
