import { ITreasure } from "../models";
import { vector } from "../utils/vector";

export const buildTreasure = (partialTreasure?: Partial<ITreasure>): ITreasure => ({
    type: "Treasure",
    location: vector(5, 2),
    traversable: true,
    quantity: 4,
    ...partialTreasure,
});
