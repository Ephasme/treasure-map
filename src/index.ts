import { Map } from "immutable";
import { IDirection, North } from "./utils/directions";
import { rotateLeft, Rotate } from "./utils/rotations";
import { add, equals, IVector } from "./utils/vector";

type Id = number;

interface IGameObject {
    readonly location: IVector;
    readonly traversable: boolean;
}

interface IAdventurer extends IGameObject {
    readonly type: "Adventurer";
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
    readonly adventurersOrder: ReadonlyArray<Id>;
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

const findAdventurer = (state: IGameState, id: Id): IAdventurer => {
    const adventurer = state.objects.get(id);
    if (!adventurer || adventurer.type !== "Adventurer") {
        throw new Error("Not found.");
    }
    return adventurer;
};

type MOVE_COMMAND_TYPE = "MOVE";
type ROTATE_COMMAND_TYPE = "ROTATE";

interface IMoveCommand {
    readonly type: MOVE_COMMAND_TYPE;
    readonly adventurerId: Id;
}

interface IRotateCommand {
    readonly type: ROTATE_COMMAND_TYPE;
    readonly adventurerId: Id;
    readonly rotator: Rotate;
}

type CommandHandler<T> = (state: IGameState, command: T) => IGameState;

type RotateCommandHandler = CommandHandler<IRotateCommand>;
type MoveCommandHandler = CommandHandler<IMoveCommand>;

const moveCommandHandler: MoveCommandHandler = (state, command) => {
    const adventurer = findAdventurer(state, command.adventurerId);

    const {
        location,
        orientation,
    } = adventurer;

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
        objects: state.objects.set(command.adventurerId, newAdventurer),
    };
};

const rotateCommandHandler: RotateCommandHandler = (state, command) => {
    const {
        rotator,
    } = command;
    const adventurer = findAdventurer(state, command.adventurerId);
    const newAdventurer: IAdventurer = { ...adventurer, orientation: rotator(adventurer.orientation) };
    return {
        ...state,
        objects: state.objects.set(command.adventurerId, newAdventurer),
    };
};

const adv1: IAdventurer = {
    location: { x: 1, y: 2 }, traversable: false,
    type: "Adventurer", orientation: North, name: "bla" };

const initialState: (mapSize: IVector) => IGameState = (mapSize) => ({
    mapSize,
    adventurersOrder: [],
    objects: Map<Id, AnyObject>([
        [0, adv1],
    ]),
});

const commandTest: IMoveCommand = {
    adventurerId: 0,
    type: "MOVE",
};

function serializeState(state: IGameState): string {
    return JSON.stringify({ ...state, objects: state.objects.toObject() }, null, 4);
}

let myState = initialState({x: 4, y: 4 });

console.log(serializeState(myState));

myState = moveCommandHandler(myState, commandTest);

console.log(serializeState(myState));

myState = rotateCommandHandler(myState, {
    type: "ROTATE",
    adventurerId: 0,
    rotator: rotateLeft,
});

console.log(serializeState(myState));
