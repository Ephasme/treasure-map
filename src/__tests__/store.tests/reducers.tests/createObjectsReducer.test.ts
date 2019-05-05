import { buildGameState } from "../../../__fixtures__/buildGameState";
import { AnyMutation, treasureFound,
    setAdventurerLocation, setAdventurerOrientation } from "../../../store/mutations";
import { createObjectsReducer } from "../../../store/reducers";
import { North } from "../../../utils/directions";

it("should create a reducer", () => {
    const updateAdv = jest.fn();
    const updateTre = jest.fn();
    const reducer = createObjectsReducer(updateAdv, updateTre);
    expect(reducer).not.toBeNull();
});

function buildContext() {
    const updateAdv = jest.fn();
    const updateTre = jest.fn();
    const reducer = createObjectsReducer(updateAdv, updateTre);
    const state = buildGameState();
    return { reducer, state, location, updateAdv, updateTre };
}

it("should call update adventurer when action is changing location", () => {
    const { reducer, state, updateAdv } = buildContext();
    const action = setAdventurerLocation(8, {x: 2, y: 4});
    reducer(state.objects, action);
    expect(updateAdv).toHaveBeenCalledWith(state.objects, 8, { location: { x: 2, y: 4 }});
});

it("should call update adventurer when action is changing direction", () => {
    const { reducer, state, updateAdv } = buildContext();
    const action = setAdventurerOrientation(8, North);
    reducer(state.objects, action);
    expect(updateAdv).toHaveBeenCalledWith(state.objects, 8, { orientation: North});
});

it("should return the state if mutation is not known", () => {
    const { reducer, state } = buildContext();
    const action = { type: "SOME_MUTATION", payload: { } };
    const newState = reducer(state.objects, action as AnyMutation);
    expect(newState).toEqual(state.objects);
});

it("should not call update adventurer if mutation is not known", () => {
    const { reducer, state, updateAdv } = buildContext();
    const action = { type: "SOME_MUTATION", payload: { } };
    reducer(state.objects, action as AnyMutation);
    expect(updateAdv).not.toBeCalled();
});

it("should not call update treasure if mutation is not known", () => {
    const { reducer, state, updateTre } = buildContext();
    const action = { type: "SOME_MUTATION", payload: { } };
    reducer(state.objects, action as AnyMutation);
    expect(updateTre).not.toBeCalled();
});
