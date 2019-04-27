import { IVector } from "../utils/vector";

const mapRegexp = /^C - (\d+) - (\d+)$/;

export const parseMap: (input: string) => IVector | null = (input) => {
    const regResult = mapRegexp.exec(input);
    if (regResult) {
        return {
            x: parseInt(regResult[1]),
            y: parseInt(regResult[2]),
        };
    }
    return null;
};
