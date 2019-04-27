import { buildGameState } from "../../__fixtures__/buildGameState";
import { rotateCommandHandler } from "../../commandHandlers";
import { IAdventurer } from "../../models";
import { East, South } from "../../utils/directions";

it("should call rotator on the adventurer", () => {
    const gameState = buildGameState();
    const mockRotator = jest.fn();
    rotateCommandHandler(gameState, {
        type: "ROTATE",
        adventurerId: 2,
        rotator: mockRotator,
    });
    expect(mockRotator).toBeCalledWith(East);
});

it("should return different state", () => {
    const gameState = buildGameState();
    const newOrientation = South;
    const mockRotator = jest.fn().mockReturnValue(newOrientation);
    const newState = rotateCommandHandler(gameState, {
        type: "ROTATE",
        adventurerId: 2,
        rotator: mockRotator,
    });
    expect((newState.objects.get(2) as IAdventurer).orientation).toBe(newOrientation);
});
