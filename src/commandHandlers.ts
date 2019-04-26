import { IMoveCommand, IRotateCommand } from "./commands";
import { IAdventurer } from "./models";
import { GameState } from "./state";
import { findAdventurer, getOccupant, isLocationValid } from "./stateQueries";
import { add } from "./utils/vector";

export type CommandHandler<T> = (state: GameState, command: T) => GameState;

export type RotateCommandHandler = CommandHandler<IRotateCommand>;
export type MoveCommandHandler = CommandHandler<IMoveCommand>;

export const moveCommandHandler: MoveCommandHandler = (state, command) => {
    const adventurer = findAdventurer(state.objects, command.adventurerId);

    const {
        location,
        orientation,
    } = adventurer;

    const newAdventurer: IAdventurer = {
        ...adventurer,
        location: add(location, orientation),
    };

    if (!isLocationValid(state.mapSize, newAdventurer.location)) {
        throw new Error(`Invalid location: (${newAdventurer.location.x}, ${newAdventurer.location.y}).`);
    }

    if (getOccupant(state.objects, newAdventurer.location)) {
        return state; // Ignore the move command.
    }

    return {
        ...state,
        objects: state.objects.set(command.adventurerId, newAdventurer),
    };
};

export const rotateCommandHandler: RotateCommandHandler = (state, command) => {
    const {
        rotator,
    } = command;
    const adventurer = findAdventurer(state.objects, command.adventurerId);
    const newAdventurer: IAdventurer = { ...adventurer, orientation: rotator(adventurer.orientation) };
    return {
        ...state,
        objects: state.objects.set(command.adventurerId, newAdventurer),
    };
};
