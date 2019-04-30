import { Stack } from "immutable";
import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { createMoveCommand } from "../../commands";
import { AdventurerMove, AnyObject, withId } from "../../models";
import { rotateLeft, rotateRight } from "../../utils/rotations";

function prepareTest(moves: AdventurerMove[]) {
    const adv = withId(0, buildAdventurer({ moves: Stack<AdventurerMove>(moves) }));
    const { store } = mockStore({
        objects: Map<number, AnyObject>([
            [0, adv],
        ]),
    });
    const moveForward = jest.fn();
    const rotate = jest.fn();
    const command = () => createMoveCommand(store, moveForward, rotate)(adv);
    return { adv, moveForward, rotate, command };
}

it("should call moveForward when next move is A", () => {
    const { adv, moveForward, command } = prepareTest(["A"]);
    command();
    expect(moveForward).toBeCalledWith(adv);
});

it("should call rotate when next move is D", () => {
    const { adv, rotate, command } = prepareTest(["D"]);
    command();
    expect(rotate).toBeCalledWith(adv, rotateRight);
});

it("should call rotate when next move is G", () => {
    const { adv, rotate, command } = prepareTest(["G"]);
    command();
    expect(rotate).toBeCalledWith(adv, rotateLeft);
});
