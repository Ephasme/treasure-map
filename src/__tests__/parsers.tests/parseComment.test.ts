import { IComment, parseComment } from "../../parsers";

it("should create a comment object", () => {
    const result = parseComment("# this is a comment");
    const expected: IComment = { comment: "this is a comment" };
    expect(result).toEqual(expected);
});

it("should return null if it is not a comment", () => {
    const result = parseComment("T - 4 - 2 - 64");
    expect(result).toBeNull();
});
