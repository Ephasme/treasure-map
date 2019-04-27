import { ITreasure } from "../../models";
import { parseTreasure } from "../../parsers";
import { vector } from "../../utils/vector";

it("should parse a mountain", () => {
    const result = parseTreasure("T - 1 - 17 - 4");
    const expected: ITreasure = {
        type: "Treasure",
        quantity: 4,
        location: vector(1, 17),
        traversable: true,
    };
    expect(result).toEqual(expected);
});

it("should return null when not compatible", () => {
    const result = parseTreasure("invalid");
    expect(result).toBeNull();
});
