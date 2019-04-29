import { IAdventurer, WithId } from "./models";
import { getOccupant, isLocationValid } from "./stateQueries";
import { setAdventurerLocation, setAdventurerMoves, setAdventurerOrientation } from "./store/mutations";
import { IStore } from "./store/store";
import { Rotate, rotateLeft as left, rotateRight as right } from "./utils/rotations";
import { add } from "./utils/vector";

export type MoveForwardCommand = (adventurer: WithId<IAdventurer>) => void;
export type MoveForwardCommandFactory = (store: IStore) => MoveForwardCommand;

export type RotateCommand = (adventurer: WithId<IAdventurer>, rotator: Rotate) => void;
export type RotateCommandFactory = (store: IStore) => RotateCommand;
export type MoveCommandFactory = (
    store: IStore,
    moveForward: MoveForwardCommand,
    rotate: RotateCommand) =>
    (adventurer: WithId<IAdventurer>) => void;

/**
 * Executes the next move of the given adventurer.
 * @param adventurerId the id of the adventurer.
 */
export const moveCommand: MoveCommandFactory = (store, moveForward, rotate) => (adventurer) => {
    let { moves } = adventurer;
    const currentMove = moves.first(null);

    if (currentMove) {
        moves = moves.shift();
        switch (currentMove) {
            case "A": moveForward(adventurer); break;
            case "D": rotate(adventurer, right); break;
            case "G": rotate(adventurer, left); break;
        }
        store.dispatch(setAdventurerMoves(adventurer.id, moves));
    }
};

/**
 * Responsible to handle move commands.
 * @param state previous state.
 * @param command the move command.
 */
export const moveForwardCommand: MoveForwardCommandFactory = (store) => (adventurer) => {
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
export const rotateCommand: RotateCommandFactory = (store) => (adventurer, rotator) => {
    const { id, orientation } = adventurer;
    store.dispatch(setAdventurerOrientation(id, rotator(orientation)));
};
