import { Map, Stack } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { AnyObject } from "../../models";
import { hasMoves } from "../../stateQueries";
import { ObjectsState } from "../../store/state";

it("should return true when some adventurer have some moves", () => {
    const objects: ObjectsState = Map([
        [0, buildAdventurer()],
    ]);
    expect(hasMoves(() => objects)()).toBeTruthy();
});

it("should return false when no adventurer have moves", () => {
    const objects = Map<number, AnyObject>([
        [0, buildAdventurer({ moves: Stack() })],
    ]);
    expect(hasMoves(() => objects)()).toBeFalsy();
});
