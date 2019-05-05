import { GameState } from "../store/state";

export function render(state: GameState): string {
    const { x: xmax, y: ymax } = state.mapSize;
    for (let i = 0; i < xmax; i++) {
        for (let j = 0; j < ymax; j++) {
            console.log(".        ");
        }
        console.log("\n");
    }
    return "";
}
