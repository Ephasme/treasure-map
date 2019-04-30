import { Dispatch } from "./mutations";
import { GameState } from "./state";
export interface IStore {
    dispatch: Dispatch;
    getState(): GameState;
}
