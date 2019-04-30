import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { IAdventurer } from "../../models";
import { isOccupied } from "../../stateQueries";
import { vector } from "../../utils/vector";

it("should return the current occupant", () => {
    const state: Map<number, IAdventurer> = Map([
        [1, buildAdventurer({ location: vector(5, 2) })],
    ]);
    const result = isOccupied(state, vector(5, 2));
    expect(result).toBeTruthy();
});

const shouldReturnUndefined: (map: Map<number, IAdventurer>) => () => void = (map) => () => {
    const result = isOccupied(map, vector(3, 10));
    expect(result).toBeFalsy();
};

it("should return undefined when no occupant at vector", shouldReturnUndefined(Map([
    [1, buildAdventurer({ location: vector(5, 2) })],
])));

it("should return undefined when occupant is traversable", shouldReturnUndefined(Map([
    [1, buildAdventurer({ traversable: true, location: vector(3, 10) })],
])));

it("should return undefined when no occupant at all", shouldReturnUndefined(Map()));
