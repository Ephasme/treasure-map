import { Stack } from "immutable";
import { AdventurerMove, Id } from "../models";
import { IDirection } from "../utils/directions";
import { IVector } from "../utils/vector";

export type Dispatch = (mutation: AnyMutation) => void;
export type SetAdventurerLocation = (id: Id, location: IVector) => ISetAdventurerLocation;
export type SetAdventurerOrientation = (id: Id, orientation: IDirection) => ISetAdventurerOrientation;
export type SetAdventurerMoves = (id: Id, moves: Stack<AdventurerMove>) => ISetAdventurerMoves;
export type AdventurerFoundTreasure = (adventurerId: Id) => IAdventurerFoundTreasure;
export type TreasureFound = (id: Id) => ITreasureFound;

export const SET_ADVENTURER_LOCATION = "SET_ADVENTURER_LOCATION";
export const SET_ADVENTURER_ORIENTATION = "SET_ADVENTURER_ORIENTATION";
export const SET_ADVENTURER_MOVES = "SET_ADVENTURER_MOVES";
export const ADVENTURER_FOUND_TREASURE = "ADVENTURER_FOUND_TREASURE";
export const TREASURE_FOUND = "TREASURE_FOUND";

export interface ISetAdventurerOrientation {
    type: typeof SET_ADVENTURER_ORIENTATION;
    payload: {
        id: Id;
        orientation: IDirection;
    };
}

export interface IAdventurerFoundTreasure {
    type: typeof ADVENTURER_FOUND_TREASURE;
    payload: {
        adventurerId: Id,
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

export interface ITreasureFound {
    type: typeof TREASURE_FOUND;
    payload: {
        id: Id;
    };
}

export type AnyMutation =
    | ISetAdventurerMoves
    | ISetAdventurerLocation
    | ISetAdventurerOrientation
    | ITreasureFound
    | IAdventurerFoundTreasure
    ;

export const adventurerFoundTreasure: AdventurerFoundTreasure = (adventurerId: Id) => ({
    type: ADVENTURER_FOUND_TREASURE,
    payload: { adventurerId },
});

export const treasureFound: TreasureFound = (id: Id) => ({
    type: TREASURE_FOUND,
    payload: { id },
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
