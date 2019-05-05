import { GameState } from "../store/state";
import { IVector } from "../utils/vector";

function renderMapSize(vector: IVector): string {
    return `C - ${vector.x} - ${vector.y}`;
}

export function render(state: GameState): string {
    let result = "";
    result += renderMapSize(state.mapSize) + "\n";

    return result;
}
