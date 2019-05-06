import { createMoveCommand, createMoveForwardCommand, createRotateCommand } from "./commands";
import { getAdventurers, getTreasure, hasMoves, isLocationValid, isOccupied } from "./stateQueries";
import { createMainReducer, createObjectsReducer, updateAdventurer  } from "./store/reducers";
import { GameState } from "./store/state";
import { Store } from "./store/Store";

export const buildContainer = (firstState: GameState) => {
    // Poor man DI.
    const store = new Store(firstState, createMainReducer(createObjectsReducer(updateAdventurer)));
    const dispatch = store.dispatch.bind(store);
    const move = createMoveCommand(dispatch,
        createMoveForwardCommand(
            isLocationValid(() => store.getState().mapSize),
            isOccupied(() => Array.from(store.getState().objects.values())),
            getTreasure(() => store.getState().objects),
            dispatch),
        createRotateCommand(dispatch));
    const hasMovesQuery = hasMoves(() => Array.from(store.getState().objects.values()));
    const getAdventurersQuery =
        getAdventurers(() => store.getState().adventurersOrder, () => store.getState().objects);
    return {
        hasMovesQuery,
        getAdventurersQuery,
        move,
        store,
    };
};
