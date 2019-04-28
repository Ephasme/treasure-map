import { Stack } from "immutable";
import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { moveCommand } from "../../commands";
import { AdventurerMove, AnyObject } from "../../models";
import { rotateLeft, rotateRight } from "../../utils/rotations";

function prepareTest(moves: AdventurerMove[]) {
    const adv = buildAdventurer({ moves: Stack<AdventurerMove>(moves) });
    const { store } = mockStore({
        objects: Map<number, AnyObject>([
            [0, adv],
        ]),
    });
    const moveForward = jest.fn();
    const rotate = jest.fn();
    const command = moveCommand(moveForward, rotate, 0);
    return { adv: { id: 0, ...adv }, moveForward, rotate, store, command };
}

it("should call moveForward when next move is A", () => {
    const { adv, moveForward, store, command } = prepareTest(["A"]);
    command(store);
    expect(moveForward).toBeCalledWith(adv);
});

it("should call rotate when next move is D", () => {
    const { adv, rotate, store, command } = prepareTest(["D"]);
    command(store);
    expect(rotate).toBeCalledWith(adv, rotateRight);
});

it("should call rotate when next move is G", () => {
    const { adv, rotate, store, command } = prepareTest(["G"]);
    command(store);
    expect(rotate).toBeCalledWith(adv, rotateLeft);
});
