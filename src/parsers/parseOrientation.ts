import { East, IDirection, North, South, West } from "../utils/directions";

export const parseOrientation: (input: string) => IDirection = (input) => {
    const result =
          input === "N" ? North
        : input === "S" ? South
        : input === "E" ? East
        : input === "O" ? West
        : null;
    if (!result) throw new Error(`Can't parse orientation ${input}.`);
    return result;
};
