import { Readable } from "stream";
import { buildContainer } from "./buildContainer";
import { parseStream } from "./parsers";
import { GameState } from "./store/state";

/**
 * Runs the game and returns the end state.
 * @param stream a stream containing the description of the game data.
 */
export const run = async (stream: Readable): Promise<GameState> => {
    const firstState = await parseStream(stream);
    const { hasMovesQuery, getAdventurersQuery, move, store } = buildContainer(firstState);
    // Game Loop.
    while (hasMovesQuery()) {
        for (const adventurer of getAdventurersQuery()) {
            move(adventurer);
        }
    }
    return store.getState();
};
