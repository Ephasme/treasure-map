import { parseMap } from "../../parsers";
import { IVector } from "../../utils/vector";

it("should parse the map size", () => {
    const result = parseMap("C - 1 - 17");
    const expected: IVector = {
        x: 1,
        y: 17,
    };
    expect(result).toEqual(expected);
});

it("should return null when not compatible", () => {
    const result = parseMap("invalid");
    expect(result).toBeNull();
});
