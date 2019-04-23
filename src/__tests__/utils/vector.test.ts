import { add, equals } from "../../utils/vector";

it("should add vectors", () => {
    expect(add({x: 4, y: -5}, {x: 7, y: 1})).toEqual({x: 11, y: -4});
});

it("should return true when vectors are identical", () => {
    expect(equals({x: 4, y: -5}, {x: 4, y: -5})).toBeTruthy();
});

it("should return false when vectors are not identical", () => {
    expect(equals({x: 4, y: -5}, {x: 2, y: -7})).toBeFalsy();
});
