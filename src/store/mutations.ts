import { Stack } from "immutable";
import { AdventurerMove, IAdventurer, Id, ITreasure } from "../models";
import { IDirection } from "../utils/directions";
import { IVector } from "../utils/vector";
import { ObjectsState } from "./state";

export type Dispatch = (mutation: AnyMutation) => void;
export type UpdateObject<T> = (objects: ObjectsState, id: Id, type: string, newObject: Partial<T>) => T;
export type UpdateAdventurer = (objects: ObjectsState, id: Id, newAdventurer: Partial<IAdventurer>) => IAdventurer;
export type UpdateTreasure = (objects: ObjectsState, id: Id, newTreasure: Partial<ITreasure>) => ITreasure;
export type SetAdventurerLocation = (id: Id, location: IVector) => ISetAdventurerLocation;
export type SetAdventurerOrientation = (id: Id, orientation: IDirection) => ISetAdventurerOrientation;
export type SetAdventurerMoves = (id: Id, moves: Stack<AdventurerMove>) => ISetAdventurerMoves;

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

export const update: UpdateObject = (objects, id, type, treasure) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === type) {
        return Object.assign({}, adventurer, treasure);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};

export const updateTreasure: UpdateTreasure = (objects, id, treasure) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === "Treasure") {
        return Object.assign({}, adventurer, treasure);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};

export const updateAdventurer: UpdateAdventurer = (objects, id, newAdventurer) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === "Adventurer") {
        return Object.assign({}, adventurer, newAdventurer);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};

export const changeTreasureQuantity = (id: Id, quantity: number) => ({
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
