import { Stack } from "immutable";
import { AdventurerMove, IAdventurer } from "../models";
import { parseOrientation } from "./parseOrientation";

const regexp = /^A - (\w+) - (\d+) - (\d+) - ([NSEO]) - ([AGD]+)$/;

export const parseAdventurer: (input: string) => IAdventurer | null = (input) => {
    const regResult = regexp.exec(input);
    if (regResult) {
        return {
            type: "Adventurer",
            traversable: false,
            treasures: 0,
            name: regResult[1],
            location: {x: parseInt(regResult[2]), y: parseInt(regResult[3])},
            orientation: parseOrientation(regResult[4]),
            moves: Stack(Array.from(regResult[5]) as AdventurerMove[]),
        };
    }
    return null;
};
