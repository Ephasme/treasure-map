import { ITreasure, IAdventurer } from "../../models";
import { AnyMutation, SET_ADVENTURER_LOCATION,
    SET_ADVENTURER_MOVES, SET_ADVENTURER_ORIENTATION, TREASURE_FOUND, ADVENTURER_FOUND_TREASURE } from "../mutations";
import { ObjectsState } from "../state";
import { UpdateAdventurer } from "./updateAdventurer";

export type ObjectsReducerFactory =
    (updateAdventurer: UpdateAdventurer) => ObjectsReducer;
export type ObjectsReducer = (objects: ObjectsState, mutation: AnyMutation) => ObjectsState;

export const createObjectsReducer: ObjectsReducerFactory =
    (updateAdventurer) => (objects, mutation) => {
    switch (mutation.type) {
        case SET_ADVENTURER_LOCATION: {
            const { id, location } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { location }));
        }
        case SET_ADVENTURER_ORIENTATION: {
            const { id, orientation } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { orientation }));
        }
        case TREASURE_FOUND: {
            const { id } = mutation.payload;
            const treasure = objects.get(id);
            if (treasure && treasure.type === "Treasure") {
                const newTreasure: ITreasure = { ...treasure, quantity: treasure.quantity - 1 };
                return objects.set(id, newTreasure);
            }
            throw new Error(`Object ${id} is not a treasure.`);
        }
        case ADVENTURER_FOUND_TREASURE: {
            const id = mutation.payload.adventurerId;
            const adventurer = objects.get(id);
            if (adventurer && adventurer.type === "Adventurer") {
                const newAdventurer: IAdventurer = { ...adventurer, treasures: adventurer.treasures + 1 };
                return objects.set(id, newAdventurer);
            }
            throw new Error(`Object ${id} is not an adventurer.`);
        }
        case SET_ADVENTURER_MOVES: {
            const { id, moves } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { moves }));
        }
    }
    return objects;
};
