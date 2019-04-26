import { IAdventurer } from "../models";
import { North } from "../utils/directions";
import { vector } from "../utils/vector";

export const buildAdventurer = (partialAdventurer?: Partial<IAdventurer>): IAdventurer => ({
    type: "Adventurer",
    location: vector(5, 2),
    traversable: false,
    orientation: North,
    name: "name",
    ...partialAdventurer,
});
