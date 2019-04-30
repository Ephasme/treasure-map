import { buildGameState } from "../../../__fixtures__/buildGameState";
import { setAdventurerLocation } from "../../../store/mutations";
import { createObjectsReducer } from "../../../store/reducers";
import { vector } from "../../../utils/vector";

it("should create a reducer", () => {
    const updateAdv = jest.fn();
    const updateTre = jest.fn();
    const reducer = createObjectsReducer(updateAdv, updateTre);
    expect(reducer).not.toBeNull();
});

it("should call update adventurer when action is changing adventurer", () => {
    const updateAdv = jest.fn();
    const updateTre = jest.fn();
    const reducer = createObjectsReducer(updateAdv, updateTre);
    const state = buildGameState();
    const location = vector(3, 5);
    const action = setAdventurerLocation(8, location);
    reducer(state.objects, action);
    expect(updateAdv).toHaveBeenCalledWith(state.objects, 8, { location });
});
