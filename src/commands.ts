import { IAdventurer, ITreasure, WithId } from "./models";
import { changeTreasureQuantity, Dispatch,
    setAdventurerLocation, setAdventurerMoves, setAdventurerOrientation } from "./store/mutations";
import { Rotate, rotateLeft as left, rotateRight as right } from "./utils/rotations";
import { add, IVector } from "./utils/vector";

export type MoveForwardCommand = (adventurer: WithId<IAdventurer>) => void;
export type MoveForwardCommandFactory = (
        isLocationValid: (location: IVector) => boolean,
        isOccupied: (location: IVector) => boolean,
        getTreasure: (location: IVector) => WithId<ITreasure> | undefined,
        dispatch: Dispatch) => MoveForwardCommand;

export type RotateCommand = (adventurer: WithId<IAdventurer>, rotator: Rotate) => void;
export type RotateCommandFactory = (dispatch: Dispatch) => RotateCommand;
export type MoveCommandFactory = (
    dispatch: Dispatch,
    moveForward: MoveForwardCommand,
    rotate: RotateCommand) =>
    (adventurer: WithId<IAdventurer>) => void;

/**
 * Executes the next move of the given adventurer.
 * @param adventurerId the id of the adventurer.
 */
export const createMoveCommand: MoveCommandFactory = (dispatch, moveForward, rotate) => (adventurer) => {
    let { moves } = adventurer;
    const currentMove = moves.first(null);

    if (currentMove) {
        moves = moves.shift();
        switch (currentMove) {
            case "A": moveForward(adventurer); break;
            case "D": rotate(adventurer, right); break;
            case "G": rotate(adventurer, left); break;
        }
        dispatch(setAdventurerMoves(adventurer.id, moves));
    }
};

/**
 * Responsible to handle move commands.
 * @param state previous state.
 * @param command the move command.
 */
export const createMoveForwardCommand: MoveForwardCommandFactory = (
        isLocationValid, isOccupied, getTreasure, dispatch) => (adventurer) => {
    const { id, orientation, name } = adventurer;
    let { location } = adventurer;

    location = add(location, orientation);

    if (!isLocationValid(location)) {
        throw new Error(`Adventurer ${name} has an invalid location: (${location.x}, ${location.y}).`);
    }

    if (isOccupied(location)) {
        return; // Ignore the move command.
    }

    const treasure = getTreasure(location);
    if (treasure) {
        dispatch(changeTreasureQuantity(treasure.id, treasure.quantity - 1));
    }

    dispatch(setAdventurerLocation(id, location));
};

/**
 * Responsible to handle the rotate command.
 * @param state the previous state.
 * @param command the rotate command.
 */
export const createRotateCommand: RotateCommandFactory = (dispatch) => (adventurer, rotator) => {
    const { id, orientation } = adventurer;
    dispatch(setAdventurerOrientation(id, rotator(orientation)));
};
