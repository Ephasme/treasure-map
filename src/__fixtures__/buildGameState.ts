import { Map } from "immutable";
import { GameState } from "../state";
import { East, South } from "../utils/directions";
import { buildAdventurer } from "./buildAdventurer";

export const buildGameState = (gameState?: Partial<GameState>): GameState => ({
    mapSize: {x: 4, y: 4},
    adventurersOrder: [1, 2, 3],
    objects: Map([
        [1, buildAdventurer({ name: "A", location: {x: 2, y: 3}, orientation: South })],
        [2, buildAdventurer({ name: "B", location: {x: 1, y: 1}, orientation: East })],
        [3, buildAdventurer({ name: "C", location: {x: 3, y: 0}})],
    ]),
    ...gameState,
});
