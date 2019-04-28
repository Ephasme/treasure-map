import { mockStore } from "../../__fixtures__/mockStateManager";
import { rotateCommand } from "../../commands";
import { IAdventurer, withId } from "../../models";
import { ISetAdventurerOrientation } from "../../store/mutations";
import { East, South } from "../../utils/directions";

it("should call rotator on the adventurer", () => {
    const { store } = mockStore();
    const mockRotator = jest.fn();
    const adventurer = withId(2, store.getState().objects.get(2)! as IAdventurer);
    rotateCommand(store)(adventurer, mockRotator);
    expect(mockRotator).toBeCalledWith(East);
});

it("should dispatch the proper mutation", () => {
    const { store, dispatch } = mockStore();
    const mockRotator = jest.fn().mockReturnValue(South);
    const adventurer = withId(2, store.getState().objects.get(2)! as IAdventurer);

    rotateCommand(store)(adventurer, mockRotator);
    const expectedMutation: ISetAdventurerOrientation = {
        type: "SET_ADVENTURER_ORIENTATION",
        payload: { id: 2, orientation: South },
    };

    expect(dispatch).toBeCalledWith(expectedMutation);
});
