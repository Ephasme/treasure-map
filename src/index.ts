import * as fs from "fs";
import * as yargs from "yargs";
import { moveCommand, moveForwardCommand, rotateCommand } from "./commands";
import { parseStream } from "./parsers";
import { getAdventurers, hasMovesFactory as hasMovesFactory } from "./stateQueries";
import { mainReducer } from "./store/reducers";
import { Store } from "./store/store";

const args = yargs.option("f", {
    alias: "filename",
    type: "string",
    demand: "filename is required",
}).argv;

const filename = args.f;

if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist.`);
}

parseStream(fs.createReadStream(filename)).then((firstState) => {
    const store = new Store(firstState, mainReducer);
    const move = moveCommand(store, moveForwardCommand(store), rotateCommand(store));
    const hasMoves = hasMovesFactory(store);
    while (hasMoves()) {
        for (const adventurer of getAdventurers(store.getState())) {
            move(adventurer);
        }
    }
}).catch((err) => {
    console.error(err);
});
