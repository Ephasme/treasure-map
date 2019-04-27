import { Map } from "immutable";
import { AnyObject } from "../models";
import { GameState, MapSizeState } from "../state";
import { parseLine } from "./parseLine";

export const parseLines: (lines: string[]) => GameState = (lines) => {
    let nextObjectId = 0;
    let objects: Map<number, AnyObject> = Map();
    const adventurersOrder: number[] = [];
    let mapSize: MapSizeState = {x: 0, y: 0};

    for (const line of lines) {
        const result = parseLine(line);
        if ("type" in result) {
            const id = nextObjectId++;
            objects = objects.set(id, result);
            if (result.type === "Adventurer") {
                adventurersOrder.push(id);
            }
        } else {
            mapSize = result;
        }
    }

    return {
        adventurersOrder,
        mapSize,
        objects,
    };
};
