import { ITreasure } from "../models";

const treasureRegexp = /^T - (\d+) - (\d+) - (\d+)$/;

export const parseTreasure: (input: string) => ITreasure | null = (input) => {
    const regResult = treasureRegexp.exec(input);
    if (regResult) {
        return {
            type: "Treasure",
            traversable: true,
            location: {x: parseInt(regResult[1]), y: parseInt(regResult[2])},
            quantity: parseInt(regResult[3]),
        };
    }
    return null;
};
