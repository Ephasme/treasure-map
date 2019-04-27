import { IMountain } from "../../models";
import { parseMountain } from "../../parsers";
import { vector } from "../../utils/vector";

it("should parse a mountain", () => {
    const result = parseMountain("M - 1 - 17");
    const expected: IMountain = {
        type: "Mountain",
        location: vector(1, 17),
        traversable: false,
    };
    expect(result).toEqual(expected);
});

it("should return null when not compatible", () => {
    const result = parseMountain("invalid");
    expect(result).toBeNull();
});
