import { Id } from "./models";
import { findAdventurer, getOccupant, isLocationValid } from "./stateQueries";
import { setAdventurerLocation, setAdventurerOrientation } from "./store/mutations";
import { IStore } from "./store/store";
import { Rotate } from "./utils/rotations";
import { add } from "./utils/vector";

export type Request<TResult> = (store: IStore) => TResult;

export type MoveCommandFactory = (adventurerId: Id) => Request<void>;
export type RotateCommandFactory = (adventurerId: Id, rotator: Rotate) => Request<void>;

/**
 * Responsible to handle move commands.
 * @param state previous state.
 * @param command the move command.
 */
export const moveCommand: MoveCommandFactory = (adventurerId) => (store) => {
    const { objects, mapSize } = store.getState();

    const adventurer = findAdventurer(objects, adventurerId);

    const { orientation, name } = adventurer;
    let { location } = adventurer;

    location = add(location, orientation);

    if (!isLocationValid(mapSize, location)) {
        throw new Error(`Adventurer ${name} has an invalid location: (${location.x}, ${location.y}).`);
    }

    if (getOccupant(objects, location)) {
        return; // Ignore the move command.
    }

    store.dispatch(setAdventurerLocation(adventurerId, location));
};

/**
 * Responsible to handle the rotate command.
 * @param state the previous state.
 * @param command the rotate command.
 */
export const rotateCommand: RotateCommandFactory = (adventurerId, rotator) => (store) => {
    const { objects } = store.getState();
    const adventurer = findAdventurer(objects, adventurerId);
    const { orientation } = adventurer;
    store.dispatch(setAdventurerOrientation(adventurerId, rotator(orientation)));
};
