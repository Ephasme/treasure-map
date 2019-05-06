import { buildGameState } from "../../../__fixtures__/buildGameState";

import { Map, Stack } from "immutable";
import { AdventurerMove, IAdventurer } from "../../../models";
import { updateAdventurer } from "../../../store/reducers";

import { buildTreasure } from "../../../__fixtures__/buildTreasure";
import { North, South } from "../../../utils/directions";

it("should update an adventurer", () => {
    const state = buildGameState({
        objects: Map([[0, {
            type: "Adventurer", location: {x: 2, y: 7}, name: "bla", treasures: 4,
            traversable: true, orientation: North, moves: Stack<AdventurerMove>(["A"]) }]]),
    });
    const newAdventurer: IAdventurer = {
            type: "Adventurer", location: {x: 4, y: 2}, name: "bla", treasures: 2,
            traversable: false, orientation: South, moves: Stack<AdventurerMove>(["D"]),
    };
    const updatedAdventurer = updateAdventurer(state.objects, 0, newAdventurer);
    expect(updatedAdventurer).toEqual(newAdventurer);
});

it("should throw if object is not an adventurer", () => {
    const state = buildGameState({
        objects: Map([[0, buildTreasure()]]),
    });
    const newAdventurer: IAdventurer = {
            type: "Adventurer", location: {x: 4, y: 2}, name: "bla", treasures: 2,
            traversable: false, orientation: South, moves: Stack<AdventurerMove>(["D"]),
    };
    expect(() => updateAdventurer(state.objects, 0, newAdventurer)).toThrow();
});
