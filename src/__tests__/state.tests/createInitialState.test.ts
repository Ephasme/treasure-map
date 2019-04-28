import { createInitialState } from "../../store/state";

it("should create initial state with proper size", () => {
    const mapSize = { x: 5, y: 8 };
    const state = createInitialState(mapSize);
    expect(state.mapSize).toEqual(mapSize);
});
