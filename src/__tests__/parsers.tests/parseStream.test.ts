import { Map, Stack } from "immutable";
import { Readable } from "stream";
import { AnyObject, IAdventurer, IMountain, ITreasure } from "../../models";
import { parseStream } from "../../parsers";
import { GameState } from "../../store/state";
import { North } from "../../utils/directions";

it("should reject promise when things are broken", async () => {
    const data = `anything`;
    const stream = new Readable();
    stream.push(data, "utf8");
    stream.push(null);
    await expect(parseStream(stream)).rejects.toThrow();
});

it("should work", async () => {
    const data = `# comment
C - 4 - 4
M - 2 - 1
T - 1 - 1 - 4
A - Loup - 0 - 0 - N - AAAGADA`;
    const stream = new Readable();
    stream.push(data, "utf8");
    stream.push(null);
    const state = await parseStream(stream);
    const adventurer: IAdventurer = {
        type: "Adventurer",
        treasures: 0,
        location: {x: 0, y: 0},
        moves: Stack(["A", "A", "A", "G", "A", "D", "A"]),
        name: "Loup",
        orientation: North,
        traversable: false,
    };
    const mountain: IMountain = {
        type: "Mountain",
        location: {x: 2, y: 1},
        traversable: false,
    };
    const treasure: ITreasure = {
        type: "Treasure",
        location: {x: 1, y: 1},
        traversable: true,
        quantity: 4,
    };
    const expected: GameState = {
        adventurersOrder: [2],
        mapSize: {x: 4, y: 4},
        objects: Map([
            [0, mountain as AnyObject],
            [1, treasure as AnyObject],
            [2, adventurer as AnyObject],
        ]),
    };
    expect(state).toEqual(expected);
});
