import { Stack } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { hasMoves } from "../../stateQueries";

it("should return true when some adventurer have some moves", () => {
    const objects = [buildAdventurer()];
    expect(hasMoves(() => objects)()).toBeTruthy();
});

it("should return false when no adventurer have moves", () => {
    const objects = [buildAdventurer({ moves: Stack() })];
    expect(hasMoves(() => objects)()).toBeFalsy();
});
