import { Stack } from "immutable";
import { AdventurerMove, Id } from "../models";
import { IDirection } from "../utils/directions";
import { IVector } from "../utils/vector";

export type Dispatch = (mutation: AnyMutation) => void;
export type SetAdventurerLocation = (id: Id, location: IVector) => ISetAdventurerLocation;
export type SetAdventurerOrientation = (id: Id, orientation: IDirection) => ISetAdventurerOrientation;
export type SetAdventurerMoves = (id: Id, moves: Stack<AdventurerMove>) => ISetAdventurerMoves;
export type ChangeTreasureQuantity = (id: Id, quantity: number) => IChangeTreasureQuantity;

export const SET_ADVENTURER_LOCATION = "SET_ADVENTURER_LOCATION";
export const SET_ADVENTURER_ORIENTATION = "SET_ADVENTURER_ORIENTATION";
export const SET_ADVENTURER_MOVES = "SET_ADVENTURER_MOVES";
export const CHANGE_TREASURE_QUANTITY = "CHANGE_TREASURE_QUANTITY";

export interface ISetAdventurerOrientation {
    type: typeof SET_ADVENTURER_ORIENTATION;
    payload: {
        id: Id;
        orientation: IDirection;
    };
}

export interface ISetAdventurerLocation {
    type: typeof SET_ADVENTURER_LOCATION;
    payload: {
        id: Id;
        location: IVector;
    };
}

export interface ISetAdventurerMoves {
    type: typeof SET_ADVENTURER_MOVES;
    payload: {
        id: Id;
        moves: Stack<AdventurerMove>;
    };
}

export interface IChangeTreasureQuantity {
    type: typeof CHANGE_TREASURE_QUANTITY;
    payload: {
        id: Id;
        quantity: number;
    };
}

export type AnyMutation =
    | ISetAdventurerMoves
    | ISetAdventurerLocation
    | ISetAdventurerOrientation
    | IChangeTreasureQuantity
    ;

export const changeTreasureQuantity: ChangeTreasureQuantity = (id: Id, quantity: number) => ({
    type: CHANGE_TREASURE_QUANTITY,
    payload: { id, quantity },
});

export const setAdventurerMoves: SetAdventurerMoves = (id, moves) => ({
    type: SET_ADVENTURER_MOVES,
    payload: { id, moves },
});

export const setAdventurerLocation: SetAdventurerLocation = (id, location) => ({
    type: SET_ADVENTURER_LOCATION,
    payload: { id, location },
});

export const setAdventurerOrientation: SetAdventurerOrientation = (id, orientation) => ({
    type: SET_ADVENTURER_ORIENTATION,
    payload: { id, orientation },
});
