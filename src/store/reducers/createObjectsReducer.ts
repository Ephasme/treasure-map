import { ITreasure } from "../../models";
import { AnyMutation, SET_ADVENTURER_LOCATION,
    SET_ADVENTURER_MOVES, SET_ADVENTURER_ORIENTATION, TREASURE_FOUND } from "../mutations";
import { ObjectsState } from "../state";
import { UpdateAdventurer } from "./updateAdventurer";
import { UpdateTreasure } from "./updateTreasure";

export type ObjectsReducerFactory =
    (updateAdventurer: UpdateAdventurer, updateTreasure: UpdateTreasure) => ObjectsReducer;
export type ObjectsReducer = (objects: ObjectsState, mutation: AnyMutation) => ObjectsState;

export const createObjectsReducer: ObjectsReducerFactory =
    (updateAdventurer, updateTreasure) => (objects, mutation) => {
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
        case SET_ADVENTURER_MOVES: {
            const { id, moves } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { moves }));
        }
    }
    return objects;
};
