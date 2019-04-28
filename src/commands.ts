import { IAdventurer, Id } from "./models";
import { GameState } from "./state";
import { findAdventurer, getOccupant, isLocationValid } from "./stateQueries";
import { Rotate } from "./utils/rotations";
import { add } from "./utils/vector";

/**
 * Responsible to handle move commands.
 * @param state previous state.
 * @param command the move command.
 */
export const moveCommand = (state: GameState, adventurerId: Id) => {
    const { objects, mapSize } = state;

    const adventurer = findAdventurer(objects, adventurerId);

    const { orientation, name } = adventurer;
    let { location } = adventurer;

    location = add(location, orientation);

    if (!isLocationValid(mapSize, location)) {
        throw new Error(`Adventurer ${name} has an invalid location: (${location.x}, ${location.y}).`);
    }

    if (getOccupant(objects, location)) {
        return state; // Ignore the move command.
    }

    return {
        ...state,
        objects: objects.set(adventurerId, {
            ...adventurer,
            location,
        }),
    };
};

/**
 * Responsible to handle the rotate command.
 * @param state the previous state.
 * @param command the rotate command.
 */
export const rotateCommand = (state: GameState, adventurerId: Id, rotator: Rotate) => {
    const { objects } = state;
    const adventurer = findAdventurer(objects, adventurerId);
    const { orientation } = adventurer;
    const newAdventurer: IAdventurer = { ...adventurer, orientation: rotator(orientation) };
    return {
        ...state,
        objects: objects.set(adventurerId, newAdventurer),
    };
};
