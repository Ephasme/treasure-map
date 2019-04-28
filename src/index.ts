import * as yargs from "yargs";
import * as fs from "fs";
import { parseFile } from "./parsers";
import { getAdventurers } from "./stateQueries";

const args = yargs.option("f", {
    alias: "filename",
    type: "string",
    demand: "filename is required",
}).argv;

const filename = args.f;

if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist.`);
}

parseFile(filename)
    .then(state => {

        for (const adventurer of getAdventurers(state)) {
            const move = adventurer.moves.first();

            
        }


    });
