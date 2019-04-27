import { GameState } from "../state";

import * as fs from "fs";
import { parseStream } from "./parseStream";

export const parseFile: (filename: string) => Promise<GameState> = (filename) => {
    const stream = fs.createReadStream(filename, { encoding: "utf8" });
    return parseStream(stream);
};
