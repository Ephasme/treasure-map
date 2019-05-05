import { Readable } from "stream";
import { buildContainer } from "./buildContainer";
import { parseStream } from "./parsers";
import { GameState } from "./store/state";

export const run = async (stream: Readable, onFinished: (game: GameState) => void) => {
    const firstState = await parseStream(stream);
    const { hasMovesQuery, getAdventurersQuery, move, store } = buildContainer(firstState);
    // Game Loop.
    while (hasMovesQuery()) {
        for (const adventurer of getAdventurersQuery()) {
            move(adventurer);
        }
    }
    onFinished(store.getState());
};
