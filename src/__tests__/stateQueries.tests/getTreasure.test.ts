import { buildGameState } from "../../__fixtures__/buildGameState";
import { withId } from "../../models";
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
