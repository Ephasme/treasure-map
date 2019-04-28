import { buildGameState } from "../../__fixtures__/buildGameState";
import { forEachAdventurers } from "../../stateQueries";

it("it should iterate over each adventurers", () => {
    const state = buildGameState();
    const iterator = forEachAdventurers(state);
    expect(iterator.next().value).toBe(state.objects.get(2));
    expect(iterator.next().value).toBe(state.objects.get(1));
    expect(iterator.next().value).toBe(state.objects.get(4));
});
