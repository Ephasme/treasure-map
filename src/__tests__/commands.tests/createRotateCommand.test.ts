import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { createRotateCommand } from "../../commands";
import { withId } from "../../models";
import { ISetAdventurerOrientation } from "../../store/mutations";
import { North, South } from "../../utils/directions";

it("should call rotator on the adventurer", () => {
    const dispatch = jest.fn();
    const mockRotator = jest.fn();
    const adventurer = withId(2, buildAdventurer());
    createRotateCommand(dispatch)(adventurer, mockRotator);
    expect(mockRotator).toBeCalledWith(North);
});

it("should dispatch the proper mutation", () => {
    const dispatch = jest.fn();
    const mockRotator = jest.fn().mockReturnValue(South);
    const adventurer = withId(2, buildAdventurer());

    createRotateCommand(dispatch)(adventurer, mockRotator);
    const expectedMutation: ISetAdventurerOrientation = {
        type: "SET_ADVENTURER_ORIENTATION",
        payload: { id: 2, orientation: South },
    };

    expect(dispatch).toBeCalledWith(expectedMutation);
});
