import { East, IDirection, North, South, West } from "../../utils/directions";
import { Rotate, rotateLeft, rotateRight } from "../../utils/rotations";

const build: (rotate: Rotate, source: IDirection, target: IDirection) => () => void =
    (rotate, source, target) => () => {
        expect(rotate(source)).toBe(target);
    };

it("should rotate north to west", build(rotateLeft, North, West));
it("should rotate west to south", build(rotateLeft, West, South));
it("should rotate south to east", build(rotateLeft, South, East));
it("should rotate east to north", build(rotateLeft, East, North));

it("should rotate north to east", build(rotateRight, North, East));
it("should rotate east to south", build(rotateRight, East, South));
it("should rotate south to west", build(rotateRight, South, West));
it("should rotate west to north", build(rotateRight, West, North));
