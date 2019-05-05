import { buildGameState } from "../../__fixtures__/buildGameState";
import { ITreasureFound, TREASURE_FOUND } from "../../store/mutations";
import { Store } from "../../store/Store";

it("should return the state", () => {
    const state = buildGameState();
    const reducer = jest.fn();
    const store = new Store(state, reducer);

    expect(store.getState()).toBe(state);
});

it("should dispatch mutations to the reducer", () => {
    const state = buildGameState();
    const reducer = jest.fn();
    const store = new Store(state, reducer);
    const mutation: ITreasureFound = { type: TREASURE_FOUND, payload: { id: 0 } };
    store.dispatch(mutation);
    expect(reducer).toBeCalledWith(state, mutation);
});
