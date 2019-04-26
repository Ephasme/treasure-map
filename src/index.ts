import { Map } from "immutable";
import { moveCommandHandler, rotateCommandHandler } from "./commandHandlers";
import { IMoveCommand } from "./commands";
import { AnyObject, IAdventurer, Id } from "./models";
import { GameState } from "./state";
import { North } from "./utils/directions";
import { rotateLeft } from "./utils/rotations";
import { IVector } from "./utils/vector";

const adv1: IAdventurer = {
    location: { x: 1, y: 2 }, traversable: false,
    type: "Adventurer", orientation: North, name: "bla" };

const initialState: (mapSize: IVector) => GameState = (mapSize) => ({
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

function serializeState(state: GameState): string {
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
