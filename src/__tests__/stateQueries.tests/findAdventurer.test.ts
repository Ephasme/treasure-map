import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { AnyObject } from "../../models";
import { findAdventurer } from "../../stateQueries";
import { ObjectsState } from "../../store/state";

it("should get adventurer", () => {
    const state: ObjectsState = Map<number, AnyObject>([
        [1, buildAdventurer()],
    ]);
    const result = findAdventurer(state, 1);
    expect(result).toBe(state.get(1));
});

it("should throw when adventurer does not exist", () => {
    const state: ObjectsState = Map<number, AnyObject>();
    expect(() => findAdventurer(state, 1)).toThrow();
});
