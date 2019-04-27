import { IAdventurer } from "../models";
import { parseOrientation } from "./parseOrientation";

const adventurerRegexp = /^A - (\w+) - (\d+) - (\d+) - ([NSEO]) - ([AGD]+)$/;

export const parseAdventurer: (input: string) => IAdventurer | null = (input) => {
    const regResult = adventurerRegexp.exec(input);
    if (regResult) {
        return {
            type: "Adventurer",
            traversable: false,
            name: regResult[1],
            location: {x: parseInt(regResult[2]), y: parseInt(regResult[3])},
            orientation: parseOrientation(regResult[4]),
            moves: regResult[5],
        };
    }
    return null;
};
