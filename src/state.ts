import { Map } from "immutable";
import { AnyObject, Id } from "./models";
import { IVector } from "./utils/vector";

export type ObjectsState = Map<Id, AnyObject>;
export type MapSizeState = IVector;
export type AdventurersOrderState = ReadonlyArray<Id>;

export type GameState = Readonly<{
    readonly mapSize: MapSizeState;
    readonly adventurersOrder: AdventurersOrderState;
    readonly objects: ObjectsState;
}>;
