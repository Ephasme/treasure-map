import { IAdventurer } from "../../models";
import { parseAdventurer } from "../../parsers";
import { South } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should parse a mountain", () => {
    const result = parseAdventurer("A - Loup - 1 - 17 - S - AADGA");
    const expected: IAdventurer = {
        type: "Adventurer",
        name: "Loup",
        orientation: South,
        moves: "AADGA",
        location: vector(1, 17),
        traversable: false,
    };
    expect(result).toEqual(expected);
});

it("should return null when not compatible", () => {
    const result = parseAdventurer("invalid");
    expect(result).toBeNull();
});
