import { Map } from "immutable";
import { buildGameState } from "../../__fixtures__/buildGameState";
import { buildTreasure } from "../../__fixtures__/buildTreasure";
import { AnyObject, withId } from "../../models";
import { getTreasure } from "../../stateQueries";
import { vector } from "../../utils/vector";

it("should return a treasure if any", () => {
    const state = buildGameState();
    const result = getTreasure(() => state.objects)(vector(0, 0));
    expect(result).toEqual(withId(3, state.objects.get(3)));
});

it("should return undefined when no treasure", () => {
    const state = buildGameState();
    const result = getTreasure(() => state.objects)(vector(1, 0));
    expect(result).toBeUndefined();
});

it("should return treasure at location 0 (eq to false)", () => {
    const result = getTreasure(() => Map<number, AnyObject>([
        [0, buildTreasure()],
    ]))(vector(5, 2));
    expect(result).not.toBeUndefined();
});
