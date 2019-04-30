import { AnyMutation } from "../mutations";
import { GameState } from "../state";
import { ObjectsReducer } from "./createObjectsReducer";

export type MainReducerFactory = (objectsReducer: ObjectsReducer) => MainReducer;
export type MainReducer = (state: GameState, mutation: AnyMutation) => GameState;

export const createMainReducer: MainReducerFactory = (objectsReducer) => (state, mutation) => ({
    ...state,
    objects: objectsReducer(state.objects, mutation),
});
