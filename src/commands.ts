import { IAdventurer, Id, WithId } from "./models";
import { findAdventurer, getOccupant, isLocationValid } from "./stateQueries";
import { setAdventurerLocation, setAdventurerMoves, setAdventurerOrientation } from "./store/mutations";
import { IStore } from "./store/store";
import { Rotate, rotateLeft as left, rotateRight as right } from "./utils/rotations";
import { add } from "./utils/vector";

export type Request<TResult> = (store: IStore) => TResult;

export type MoveForwardCommandFactory = (adventurer: WithId<IAdventurer>) => Request<void>;
export type RotateCommandFactory = (adventurer: WithId<IAdventurer>, rotator: Rotate) => Request<void>;
export type MoveCommandFactory = (
    moveForward: MoveForwardCommandFactory,
    rotate: RotateCommandFactory,
    adventurerId: Id) => Request<void>;

/**
 * Executes the next move of the given adventurer.
 * @param adventurerId the id of the adventurer.
 */
export const moveCommand: MoveCommandFactory = (moveForward, rotate, adventurerId) => (store) => {
    const { objects } = store.getState();
    const adventurer = findAdventurer(objects, adventurerId);

    let { moves } = adventurer;
    const currentMove = moves.first(null);

    if (currentMove) {
        moves = moves.shift();
        switch (currentMove) {
            case "A": moveForward(adventurer); break;
            case "D": rotate(adventurer, right); break;
            case "G": rotate(adventurer, left); break;
        }
        store.dispatch(setAdventurerMoves(adventurerId, moves));
    }
};

/**
 * Responsible to handle move commands.
 * @param state previous state.
 * @param command the move command.
 */
export const moveForwardCommand: MoveForwardCommandFactory = (adventurer) => (store) => {
    const { mapSize, objects } = store.getState();
    const { id, orientation, name } = adventurer;
    let { location } = adventurer;

    location = add(location, orientation);

    if (!isLocationValid(mapSize, location)) {
        throw new Error(`Adventurer ${name} has an invalid location: (${location.x}, ${location.y}).`);
    }

    if (getOccupant(objects, location)) {
        return; // Ignore the move command.
    }

    store.dispatch(setAdventurerLocation(id, location));
};

/**
 * Responsible to handle the rotate command.
 * @param state the previous state.
 * @param command the rotate command.
 */
export const rotateCommand: RotateCommandFactory = (adventurer, rotator) => (store) => {
    const { id, orientation } = adventurer;
    store.dispatch(setAdventurerOrientation(id, rotator(orientation)));
};
