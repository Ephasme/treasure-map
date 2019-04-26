import { isLocationValid } from "../../stateQueries";

it("should not be valid when outside of the map", () => {
    const mapSize = {x: 1, y: 1};
    const result = isLocationValid(mapSize, {x: 2, y: 0});
    expect(result).toBe(false);
});

it("should be valid when inside of the map", () => {
    const mapSize = {x: 5, y: 8};
    const result = isLocationValid(mapSize, {x: 2, y: 0});
    expect(result).toBe(true);
});
