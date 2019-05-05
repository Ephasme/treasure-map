import { buildGameState } from "../../__fixtures__/buildGameState";
import { getAdventurers } from "../../stateQueries";

it("it should iterate over each adventurers", () => {
    const state = buildGameState();
    const iterator = getAdventurers(() => state.adventurersOrder, () => state.objects)();
    expect(iterator.next().value).toEqual({ id: 2, ...state.objects.get(2) });
    expect(iterator.next().value).toEqual({ id: 1, ...state.objects.get(1) });
    expect(iterator.next().value).toEqual({ id: 4, ...state.objects.get(4) });
});
