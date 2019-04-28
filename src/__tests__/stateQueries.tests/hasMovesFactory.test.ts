import { Map, Stack } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { buildGameState } from "../../__fixtures__/buildGameState";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { AnyObject } from "../../models";
import { hasMovesFactory } from "../../stateQueries";

it("should return true when some adventurer have some moves", () => {
    const { store } = mockStore();
    expect(hasMovesFactory(store)()).toBeTruthy();
});

it("should return false when no adventurer have moves", () => {
    const { store } = mockStore({
        objects: Map<number, AnyObject>([
            [0, buildAdventurer({ moves: Stack() })],
        ]),
    });
    expect(hasMovesFactory(store)()).toBeFalsy();
});
