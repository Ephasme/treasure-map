import { AnyMutation, CHANGE_TREASURE_QUANTITY,
    SET_ADVENTURER_LOCATION, SET_ADVENTURER_ORIENTATION } from "../mutations";
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
        case CHANGE_TREASURE_QUANTITY: {
            const { id, quantity } = mutation.payload;
            return objects.set(id, updateTreasure(objects, id, { quantity }));
        }
    }
    return objects;
};
