import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { buildGameState } from "../../__fixtures__/buildGameState";
import { moveCommandHandler } from "../../commandHandlers";
import { IAdventurer } from "../../models";
import { GameState } from "../../state";
import { North } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should move the adventurer", () => {
    const gameState = buildGameState();
    const newState = moveCommandHandler(gameState, {
        type: "MOVE",
        adventurerId: 2,
    });
    const expected: GameState = {
        ...gameState,
        objects: Map([
            ...gameState.objects.toArray(),
            [2, {
                ...gameState.objects.get(2) as IAdventurer,
                location: vector(2, 1),
            }],
        ]),
    };
    expect(newState).toEqual(expected);
});

it("should not move the adventurer if location is occupied", () => {
    const gameState = buildGameState({
        objects: Map([
            [0, buildAdventurer({ location: vector(1, 2), orientation: North })],
            [1, buildAdventurer({ location: vector(1, 3), orientation: North })],
        ]),
    });
    const newState = moveCommandHandler(gameState, {
        type: "MOVE",
        adventurerId: 0,
    });
    expect(newState).toEqual(gameState);
});

it("should throw if location is invalid", () => {
    const gameState = buildGameState({
        objects: Map([
            [0, buildAdventurer({ location: vector(3, 3), orientation: North })],
        ]),
    });
    expect(() => moveCommandHandler(gameState, {
        type: "MOVE",
        adventurerId: 0,
    })).toThrow();
});
