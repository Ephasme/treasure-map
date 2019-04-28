import * as readline from "readline";
import { Readable } from "stream";
import { GameState } from "../store/state";
import { parseLines } from "./parseLines";

export const parseStream: (stream: Readable) => Promise<GameState> = (stream) => {
    const rl = readline.createInterface({ input: stream });
    const lines: string[] = [];
    rl.on("line", (line) => lines.push(line));
    return new Promise((resolves, rejects) => {
        rl.on("close", () => {
            try {
                resolves(parseLines(lines));
            } catch (err) {
                rejects(err);
            }
        });
    });
};
