import { Id, ITreasure } from "../../models";
import { ObjectsState } from "../state";

export type UpdateTreasure = (objects: ObjectsState, id: Id, newTreasure: Partial<ITreasure>) => ITreasure;

export const updateTreasure: UpdateTreasure = (objects, id, treasure) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === "Treasure") {
        return Object.assign({}, adventurer, treasure);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};
