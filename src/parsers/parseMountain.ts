import { IMountain } from "../models";

const regexp = /^M - (\d+) - (\d+)$/;

export const parseMountain: (input: string) => IMountain | null = (input) => {
    const regResult = regexp.exec(input);
    if (regResult) {
        return {
            type: "Mountain",
            traversable: false,
            location: {x: parseInt(regResult[1]), y: parseInt(regResult[2])},
        };
    }
    return null;
};
