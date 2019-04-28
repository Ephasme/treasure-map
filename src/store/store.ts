import { AnyMutation, Dispatch } from "./mutations";
import { MainReducer } from "./reducers";
import { GameState } from "./state";

export interface IStore {
    dispatch: Dispatch;
    getState(): GameState;
}

export class Store implements IStore {
    constructor(
        private state: GameState,
        private readonly mainReducer: MainReducer,
    ) {}

    public getState() { return this.state; }
    public dispatch(mutation: AnyMutation): void {
        this.state = this.mainReducer(this.state, mutation);
    }
}
