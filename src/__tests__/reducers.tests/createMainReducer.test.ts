import { buildGameState } from "../../__fixtures__/buildGameState";
import { setAdventurerLocation } from "../../store/mutations";
import { createMainReducer } from "../../store/reducers";
import { vector } from "../../utils/vector";

it("should create a reducer", () => {
    const mock = jest.fn();
    const reducer = createMainReducer(mock);
    expect(reducer).not.toBeNull();
});

it("should call objects reducer", () => {
    const mock = jest.fn();
    const reducer = createMainReducer(mock);
    const action = setAdventurerLocation(5, vector(4, 6));
    const state = buildGameState();
    reducer(state, action);
    expect(mock).toHaveBeenCalledWith(state.objects, action);
});
