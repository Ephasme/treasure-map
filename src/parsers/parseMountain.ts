import { IMountain } from "../models";

const mountainRegexp = /^M - (\d+) - (\d+)$/;

export const parseMountain: (input: string) => IMountain | null = (input) => {
    const regResult = mountainRegexp.exec(input);
    if (regResult) {
        return {
            type: "Mountain",
            traversable: false,
            location: {x: parseInt(regResult[1]), y: parseInt(regResult[2])},
        };
    }
    return null;
};
