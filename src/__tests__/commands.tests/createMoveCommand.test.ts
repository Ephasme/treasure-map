import { Stack } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { createMoveCommand } from "../../commands";
import { AdventurerMove, withId } from "../../models";
import { rotateLeft, rotateRight } from "../../utils/rotations";

function prepareTest(moves: AdventurerMove[]) {
    const adv = withId(0, buildAdventurer({ moves: Stack<AdventurerMove>(moves) }));
    const dispatch = jest.fn();
    const moveForward = jest.fn();
    const rotate = jest.fn();
    const command = () => createMoveCommand(dispatch, moveForward, rotate)(adv);
    return { adv, dispatch, moveForward, rotate, command };
}

it("should do nothing when there are no moves left", () => {
    const { dispatch, rotate, moveForward, command } = prepareTest([]);
    command();
    expect(moveForward).not.toBeCalled();
    expect(rotate).not.toBeCalled();
    expect(dispatch).not.toBeCalled();
});

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
