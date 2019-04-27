import { parseAdventurer, parseMap, parseMountain, parseTreasure } from ".";
import { AnyObject } from "../models";
import { IVector } from "../utils/vector";
import { parseComment, IComment } from "./parseComment";

export const parseLine: (line: string) => AnyObject | IVector | IComment = (line: string) => {
    const result =
           parseComment(line)
        || parseMap(line)
        || parseMountain(line)
        || parseAdventurer(line)
        || parseTreasure(line);
    if (!result) throw new Error(`Line '${line}' can't be parsed.`);
    return result;
};
