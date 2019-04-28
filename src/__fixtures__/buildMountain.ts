import { IMountain } from "../models";
import { vector } from "../utils/vector";

export const buildMountain = (partialMountain?: Partial<IMountain>): IMountain => ({
    type: "Mountain",
    location: vector(5, 2),
    traversable: false,
    ...partialMountain,
});
