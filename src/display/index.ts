import { IAdventurer, IMountain, ITreasure } from "../models";
import { GameState } from "../store/state";
import { IVector } from "../utils/vector";
import { IDirection } from "../utils/directions";

function renderDirection(direction: IDirection): string {
    switch (direction.name) {
        case "EAST": return "E";
        case "WEST": return "O";
        case "NORTH": return "N";
        case "SOUTH": return "S";
    }
}

function renderMapSize(vector: IVector): string {
    return `C - ${vector.x} - ${vector.y}\n`;
}

function renderMountain(moutain: IMountain): string {
    const { location: { x, y } } = moutain;
    return `M - ${x} - ${y}\n`;
}

function renderTreasure(treasure: ITreasure): string | undefined {
    const { location: { x, y }, quantity } = treasure;
    if (treasure.quantity > 0) {
        return `T - ${x} - ${y} - ${quantity}\n`;
    }
}

function renderAdventurer(adventurer: IAdventurer): string {
    const {
        name,
        location: { x, y },
        orientation,
        treasures,
    } = adventurer;
    return `A - ${name} - ${x} - ${y} - ${renderDirection(orientation)} - ${treasures}\n`;
}

export function render(state: GameState): string {
    let result = "";
    result += renderMapSize(state.mapSize);
    for (const [, obj] of state.objects) {
        switch (obj.type) {
            case "Adventurer": {
                result += renderAdventurer(obj);
                break;
            }
            case "Mountain": {
                result += renderMountain(obj);
                break;
            }
            case "Treasure": {
                const treasure = renderTreasure(obj);
                if (treasure) {
                    result += treasure;
                }
                break;
            }
        }
    }
    return result;
}
