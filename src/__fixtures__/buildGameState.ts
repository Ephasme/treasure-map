import { Map } from "immutable";
import { AnyObject } from "../models";
import { GameState } from "../store/state";
import { South, West } from "../utils/directions";
import { buildAdventurer } from "./buildAdventurer";
import { buildMountain } from "./buildMountain";
import { buildTreasure } from "./buildTreasure";

export const buildGameState = (gameState?: Partial<GameState>): GameState => ({
    mapSize: {x: 4, y: 4},
    adventurersOrder: [2, 1, 4],
    objects: Map<number, AnyObject>([
        [0, buildMountain({ location: {x: 3, y: 3 } })],
        [1, buildAdventurer({ name: "A", location: {x: 2, y: 3}, orientation: South })],
        [2, buildAdventurer({ name: "B", location: {x: 1, y: 0}, orientation: West })],
        [3, buildTreasure({ location: {x: 0, y: 0}, quantity: 3 })],
        [4, buildAdventurer({ name: "C", location: {x: 3, y: 0}})],
    ]),
    ...gameState,
});
