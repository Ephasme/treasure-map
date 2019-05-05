import * as fs from "fs";
import * as yargs from "yargs";
import { createMoveCommand, createMoveForwardCommand, createRotateCommand } from "./commands";
import { parseStream } from "./parsers";
import { getAdventurers, getTreasure, hasMoves, isLocationValid, isOccupied } from "./stateQueries";
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
    // Poor man DI.
    const store = new Store(firstState, createMainReducer(createObjectsReducer(updateAdventurer, updateTreasure)));
    const move = createMoveCommand(store.dispatch,
        createMoveForwardCommand(
            isLocationValid(() => store.getState().mapSize),
            isOccupied(() => Array.from(store.getState().objects.values())),
            getTreasure(() => store.getState().objects),
            store.dispatch),
        createRotateCommand(store.dispatch));
    const hasMovesQuery = hasMoves(() => Array.from(store.getState().objects.values()));
    const getAdventurersQuery = getAdventurers(() => store.getState().adventurersOrder, () => store.getState().objects);

    // Game Loop.
    while (hasMovesQuery()) {
        for (const adventurer of getAdventurersQuery()) {
            move(adventurer);
        }
    }
}).catch((err) => {
    console.error(err);
});
