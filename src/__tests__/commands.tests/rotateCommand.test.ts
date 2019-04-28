import { mockStore } from "../../__fixtures__/mockStateManager";
import { rotateCommand } from "../../commands";
import { ISetAdventurerOrientation } from "../../store/mutations";
import { East, South } from "../../utils/directions";

it("should call rotator on the adventurer", () => {
    const { store } = mockStore();
    const mockRotator = jest.fn();
    rotateCommand(2, mockRotator)(store);
    expect(mockRotator).toBeCalledWith(East);
});

it("should dispatch the proper mutation", () => {
    const { store, dispatch } = mockStore();
    const mockRotator = jest.fn().mockReturnValue(South);

    rotateCommand(2, mockRotator)(store);
    const expectedMutation: ISetAdventurerOrientation = {
        type: "SET_ADVENTURER_ORIENTATION",
        payload: { id: 2, orientation: South },
    };

    expect(dispatch).toBeCalledWith(expectedMutation);
});
