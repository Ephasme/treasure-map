import { moveNorth, Mover } from "./utils/moves";
import { IVector, add, equals } from "./utils/vector";
import { Map, Set, List } from "immutable";
import { IRotation, Rotator } from "./utils/rotations";
import { IDirection, North } from "./utils/directions";
import { taggedTemplateExpression } from "@babel/types";

type Id = number;

interface IGameObject {
    readonly id: Id;
    readonly location: IVector;
    readonly traversable: boolean;
}

interface IAdventurer extends IGameObject {
    readonly type: "Adventurer";
    readonly priority: number;
    readonly orientation: IDirection;
    readonly name: string;
}

interface ITreasure extends IGameObject {
    readonly type: "Treasure";
}

interface IMountain extends IGameObject {
    readonly type: "Moutain";
}

type AnyObject =
    | ITreasure
    | IMountain
    | IAdventurer;

type Dimensions = IVector;

interface IGameState {
    readonly mapSize: Dimensions;
    readonly objects: Map<Id, AnyObject>;
}

/**
 * If this function returns an object's id the location is occupied by this object.
 * Otherwise it returns undefined and it means that the location is free.
 * @param state the current state of the world
 * @param location the location to test
 */
const getOccupant = (state: IGameState, location: IVector): Id | undefined => {
    return state.objects
        .filter((x) => !x.traversable)
        .map((x) => x.location)
        .findKey((vector) => equals(vector, location));
};
/**
 * Checks if the location is valid.
 * @param state the current state of the world
 * @param location the location to test
 */
const isLocationValid = (state: IGameState, location: IVector): boolean => {
    return location.x >= 0 && location.x < state.mapSize.x &&
           location.y >= 0 && location.y < state.mapSize.y;
};

type MOVE_COMMAND_TYPE = "MOVE";
type ROTATE_COMMAND_TYPE = "ROTATE";

interface IMoveCommand {
    readonly type: MOVE_COMMAND_TYPE;
    readonly adventurer: IAdventurer;
}

interface IRotateCommand {
    readonly type: ROTATE_COMMAND_TYPE;
    readonly adventurer: IAdventurer;
    readonly rotator: Rotator;
}

type CommandHandler<T> = (state: IGameState, command: T) => IGameState;

type RotateCommandHandler = CommandHandler<IRotateCommand>;
type MoveCommandHandler = CommandHandler<IMoveCommand>;

const moveCommandHandler: MoveCommandHandler = (state, command) => {
    const {
        adventurer,
        adventurer: { location, orientation },
    } = command;

    const newAdventurer: IAdventurer = {
        ...adventurer,
        location: add(location, orientation),
    };

    if (!isLocationValid(state, newAdventurer.location)) {
        throw new Error(`Invalid location: (${newAdventurer.location.x}, ${newAdventurer.location.y}).`);
    }

    if (getOccupant(state, newAdventurer.location)) {
        return state; // Ignore the move command.
    }

    return {
        ...state,
        objects: state.objects.set(adventurer.id, newAdventurer),
    };
};

const rotateCommandHandler: RotateCommandHandler = (state, command) => {
    const {
        adventurer,
        adventurer: { id, orientation },
        rotator,
    } = command;
    const newAdventurer: IAdventurer = { ...adventurer, orientation: rotator(orientation) };
    return {
        ...state,
        objects: state.objects.set(id, newAdventurer),
    };
};

const adv1: IAdventurer = {
    id: 1, location: { x: 1, y: 2 }, traversable: false,
    type: "Adventurer", orientation: North, name: "bla", priority: 1 };

const initialState: IGameState = {
    mapSize: {x: 4, y: 4},
    objects: Map<Id, AnyObject>([
        [adv1.id, adv1],
    ]),
};

const commandTest: IMoveCommand = {
    adventurer: adv1,
    type: "MOVE",
};

const newState = moveCommandHandler(initialState, commandTest);

console.log(JSON.stringify({ ...newState, objects: newState.objects.toObject() }, null, 4));
