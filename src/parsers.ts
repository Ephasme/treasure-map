import { AnyObject, IAdventurer, IMountain, ITreasure } from "./models";
import { East, IDirection, North, South, West } from "./utils/directions";
import { IVector } from "./utils/vector";

const mapRegexp = /^C - (\d+) - (\d+)$/;
const adventurerRegexp = /^A - (\w+) - (\d+) - (\d+) - ([NSEO]) - ([AGD]+)$/;
const treasureRegexp = /^T - (\d+) - (\d+) - (\d+)$/;
const mountainRegexp = /^M - (\d+) - (\d+)$/;

export const parseMountain: (input: string) => IMountain | null = (input) => {
    const regResult = mountainRegexp.exec(input);
    if (regResult) {
        return {
            type: "Mountain",
            traversable: false,
            location: {x: parseInt(regResult[1]), y: parseInt(regResult[2])},
        };
    }
    return null;
};

export const parseTreasure: (input: string) => ITreasure | null = (input) => {
    const regResult = treasureRegexp.exec(input);
    if (regResult) {
        return {
            type: "Treasure",
            traversable: true,
            location: {x: parseInt(regResult[1]), y: parseInt(regResult[2])},
            quantity: parseInt(regResult[3]),
        };
    }
    return null;
};

export const parseMap: (input: string) => IVector | null = (input) => {
    const regResult = mapRegexp.exec(input);
    if (regResult) {
        return {
            x: parseInt(regResult[1]),
            y: parseInt(regResult[2]),
        };
    }
    return null;
};

export const parseOrientation: (input: string) => IDirection = (input) => {
    const result =
          input === "N" ? North
        : input === "S" ? South
        : input === "E" ? East
        : input === "O" ? West
        : null;
    if (!result) throw new Error(`Can't parse orientation ${input}.`);
    return result;
};

export const parseAdventurer: (input: string) => IAdventurer | null = (input) => {
    const regResult = adventurerRegexp.exec(input);
    if (regResult) {
        return {
            type: "Adventurer",
            traversable: false,
            name: regResult[1],
            location: {x: parseInt(regResult[2]), y: parseInt(regResult[3])},
            orientation: parseOrientation(regResult[4]),
            moves: regResult[5],
        };
    }
    return null;
};

export const parseLine: (line: string) => AnyObject | IVector | null = (line: string) => {
    const result =
           parseMap(line)
        || parseMountain(line)
        || parseAdventurer(line)
        || parseTreasure(line);
    if (!result) throw new Error(`Line '${line}' can't be parsed.`);
    return result;
};
