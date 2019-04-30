import { IStore } from "../store/IStore";
import { GameState } from "../store/state";
import { buildGameState } from "./buildGameState";

export function mockStore(gameState?: Partial<GameState>) {
    const dispatch = jest.fn();
    const mGameState = buildGameState(gameState);
    const store: IStore = {
        getState: () => mGameState,
        dispatch,
    };
    return {store, dispatch};
}
