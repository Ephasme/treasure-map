import { Id, ITreasure } from "../../models";
import { ObjectsState } from "../state";

export type UpdateTreasure = (objects: ObjectsState, id: Id, newTreasure: Partial<ITreasure>) => ITreasure;

export const updateTreasure: UpdateTreasure = (objects, id, newTreasure) => {
    const treasure = objects.get(id);
    if (treasure && treasure.type === "Treasure") {
        return Object.assign({}, treasure, newTreasure);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};
