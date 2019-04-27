import { parseOrientation } from "../../parsers";
import { East, North, South, West } from "../../utils/directions";

it("should throw when orientation does not exist", () => {
    expect(() => parseOrientation("X")).toThrow();
});

it("should parse O to West", () => expect(parseOrientation("O")).toBe(West));
it("should parse E to East", () => expect(parseOrientation("E")).toBe(East));
it("should parse N to North", () => expect(parseOrientation("N")).toBe(North));
it("should parse S to South", () => expect(parseOrientation("S")).toBe(South));
