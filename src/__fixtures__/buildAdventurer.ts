import { Stack } from "immutable";
import { IAdventurer } from "../models";
import { North } from "../utils/directions";
import { vector } from "../utils/vector";

export const buildAdventurer = (partialAdventurer?: Partial<IAdventurer>): IAdventurer => ({
    type: "Adventurer",
    location: vector(5, 2),
    traversable: false,
    moves: Stack(["G", "D", "A", "A", "A", "G", "G"]),
    orientation: North,
    treasures: 4,
    name: "name",
    ...partialAdventurer,
});
