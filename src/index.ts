import * as fs from "fs";
import * as yargs from "yargs";
import { createMoveCommand, createMoveForwardCommand, createRotateCommand } from "./commands";
import { parseStream } from "./parsers";
import { getAdventurers, getTreasure, hasMovesFactory, isLocationValid, isOccupied } from "./stateQueries";
import { createMainReducer, createObjectsReducer } from "./store/reducers";
import { updateAdventurer, updateTreasure } from "./store/reducers";
import { Store } from "./store/Store";

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
    const store = new Store(firstState, createMainReducer(createObjectsReducer(updateAdventurer, updateTreasure)));
    const move = createMoveCommand(store.dispatch,
        createMoveForwardCommand(
            isLocationValid(store.getState().mapSize),
            isOccupied(store.getState().objects),
            getTreasure(store.getState().objects),
            store.dispatch),
        createRotateCommand(store.dispatch));
    const hasMoves = hasMovesFactory(store);
    const getAdventurersQuery = getAdventurers(store.getState());
    while (hasMoves()) {
        for (const adventurer of getAdventurersQuery()) {
            move(adventurer);
        }
    }
}).catch((err) => {
    console.error(err);
});
