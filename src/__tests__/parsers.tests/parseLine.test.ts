import { parseLine } from "../../parsers";

it("should throw when nothing is matching", () => {
    expect(() => parseLine("invalid")).toThrow();
});

it("should parse mountains", () => expect(parseLine("M - 1 - 3")).not.toBeNull());
it("should parse adventurers", () => expect(parseLine("A - Loup - 1 - 3 - N - AADGA")).not.toBeNull());
it("should parse treasures", () => expect(parseLine("T - 1 - 3 - 3")).not.toBeNull());
it("should parse map size", () => expect(parseLine("C - 3 - 1")).not.toBeNull());
it("should parse comments", () => expect(parseLine("# blabla")).not.toBeNull());
