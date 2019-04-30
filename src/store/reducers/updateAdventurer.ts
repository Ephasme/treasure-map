import { IAdventurer, Id } from "../../models";
import { ObjectsState } from "../state";

export type UpdateAdventurer = (objects: ObjectsState, id: Id, newAdventurer: Partial<IAdventurer>) => IAdventurer;

export const updateAdventurer: UpdateAdventurer = (objects, id, newAdventurer) => {
    const adventurer = objects.get(id);
    if (adventurer && adventurer.type === "Adventurer") {
        return Object.assign({}, adventurer, newAdventurer);
    }
    throw new Error(`Object ${id} is not an adventurer.`);
};
