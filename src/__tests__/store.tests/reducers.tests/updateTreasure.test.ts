import { Map } from "immutable";
import { buildAdventurer } from "../../../__fixtures__/buildAdventurer";
import { buildGameState } from "../../../__fixtures__/buildGameState";
import { ITreasure } from "../../../models";
import { updateTreasure } from "../../../store/reducers";

it("should update treasure", () => {
    const state = buildGameState({
        objects: Map([[0, { type: "Treasure", location: {x: 2, y: 7}, quantity: 5, traversable: true }]]),
    });
    const newTreasure: ITreasure = { type: "Treasure", location: {x: 2, y: 7}, quantity: 4, traversable: true };
    const updatedTreasure = updateTreasure(state.objects, 0, newTreasure);
    expect(updatedTreasure).toEqual(newTreasure);
});

it("should throw if object is not a treasure", () => {
    const state = buildGameState({
        objects: Map([[0, buildAdventurer()]]),
    });
    const newTreasure: ITreasure = { type: "Treasure", location: {x: 2, y: 7}, quantity: 4, traversable: true };
    expect(() => updateTreasure(state.objects, 0, newTreasure)).toThrow();
});
