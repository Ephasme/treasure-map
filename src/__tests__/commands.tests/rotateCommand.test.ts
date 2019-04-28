import { buildGameState } from "../../__fixtures__/buildGameState";
import { rotateCommand } from "../../commands";
import { IAdventurer } from "../../models";
import { East, South } from "../../utils/directions";

it("should call rotator on the adventurer", () => {
    const gameState = buildGameState();
    const mockRotator = jest.fn();
    rotateCommand(gameState, 2, mockRotator);
    expect(mockRotator).toBeCalledWith(East);
});

it("should return different state", () => {
    const gameState = buildGameState();
    const newOrientation = South;
    const mockRotator = jest.fn().mockReturnValue(newOrientation);
    const newState = rotateCommand(gameState, 2, mockRotator);
    expect((newState.objects.get(2) as IAdventurer).orientation).toBe(newOrientation);
});
