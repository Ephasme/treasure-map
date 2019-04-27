import { parseAdventurer, parseMap, parseMountain, parseTreasure } from ".";
import { AnyObject } from "../models";
import { IVector } from "../utils/vector";

export const parseLine: (line: string) => AnyObject | IVector = (line: string) => {
    const result =
           parseMap(line)
        || parseMountain(line)
        || parseAdventurer(line)
        || parseTreasure(line);
    if (!result) throw new Error(`Line '${line}' can't be parsed.`);
    return result;
};
