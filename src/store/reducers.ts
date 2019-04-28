import { AnyMutation, SET_ADVENTURER_LOCATION, SET_ADVENTURER_ORIENTATION, updateAdventurer } from "./mutations";
import { GameState, ObjectsState } from "./state";

export type ObjectsReducer = (objects: ObjectsState, mutation: AnyMutation) => ObjectsState;
export type MainReducer = (state: GameState, mutation: AnyMutation) => GameState;

export const objectsReducer: ObjectsReducer = (objects, mutation) => {
    switch (mutation.type) {
        case SET_ADVENTURER_LOCATION: {
            const { id, location } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { location }));
        }
        case SET_ADVENTURER_ORIENTATION: {
            const { id, orientation } = mutation.payload;
            return objects.set(id, updateAdventurer(objects, id, { orientation }));
        }
    }
    return objects;
};

export const mainReducer: MainReducer = (state, mutation) => ({
    ...state,
    objects: objectsReducer(state.objects, mutation),
});