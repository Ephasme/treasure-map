import { Readable } from "stream";
import { parseFile } from "../../parsers";

jest.mock("fs", () => ({
    createReadStream(filename: string) {
        if (filename === "wrongfile") {
            const stream = new Readable();
            stream.push(`       SOME DATA      `);
            stream.push(null);
            return stream;
        }
        return null;
    },
}));

it("should not parse when data is wrong", async () => {
    await expect(parseFile("wrongfile")).rejects.toThrow();
});
