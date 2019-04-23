import { moveNorth, moveSouth } from "../../utils/moves";

it("should move vector y component one unit up", () => {
    expect(moveNorth({x: 1, y: 2})).toEqual({x: 1, y: 3});
});

it("should move vector y component one unit down", () => {
    expect(moveSouth({x: 1, y: 2})).toEqual({x: 1, y: 1});
});
