import { buildGameState } from "../../../__fixtures__/buildGameState";
import { AnyMutation, setAdventurerLocation,
    setAdventurerOrientation, 
    adventurerFoundTreasure} from "../../../store/mutations";
import { createObjectsReducer } from "../../../store/reducers";
import { North } from "../../../utils/directions";
import { IAdventurer } from "../../../models";

it("should create a reducer", () => {
    const updateAdv = jest.fn();
    const reducer = createObjectsReducer(updateAdv);
    expect(reducer).not.toBeNull();
});

function buildContext() {
    const updateAdv = jest.fn();
    const reducer = createObjectsReducer(updateAdv);
    const state = buildGameState();
    return { reducer, state, location, updateAdv };
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

it("should increase the number of treasures if adventurer found treasure", () => {
    const { reducer, state } = buildContext();
    const action = adventurerFoundTreasure(4);
    const newState = reducer(state.objects, action);
    expect((newState.get(4) as IAdventurer).treasures).toBe(5);
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
