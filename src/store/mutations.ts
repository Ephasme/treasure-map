import { IAdventurer, Id } from "../models";
import { IDirection } from "../utils/directions";
import { IVector } from "../utils/vector";
import { ObjectsState } from "./state";

export type Dispatch = (mutation: AnyMutation) => void;
export type UpdateAdventurer = (objects: ObjectsState, id: Id, newAdventurer: Partial<IAdventurer>) => IAdventurer;
export type SetAdventurerLocation = (id: Id, location: IVector) => ISetAdventurerLocation;
export type SetAdventurerOrientation = (id: Id, orientation: IDirection) => ISetAdventurerOrientation;

export const SET_ADVENTURER_LOCATION = "SET_ADVENTURER_LOCATION";
export const SET_ADVENTURER_ORIENTATION = "SET_ADVENTURER_ORIENTATION";

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

export type AnyMutation =
    | ISetAdventurerLocation
    | ISetAdventurerOrientation
    ;

export const updateAdventurer: UpdateAdventurer = (objects, id, newAdventurer) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === "Adventurer") {
        return Object.assign({}, adventurer, newAdventurer);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};

export const setAdventurerLocation: SetAdventurerLocation = (id, location) => ({
    type: SET_ADVENTURER_LOCATION,
    payload: { id, location },
});

export const setAdventurerOrientation: SetAdventurerOrientation = (id, orientation) => ({
    type: SET_ADVENTURER_ORIENTATION,
    payload: { id, orientation },
});
