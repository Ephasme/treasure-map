import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { createMoveForwardCommand } from "../../commands";
import { IAdventurer, withId } from "../../models";
import { IChangeTreasureQuantity, ISetAdventurerLocation } from "../../store/mutations";
import { North } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should dispatch the proper mutation", () => {
    const { store, dispatch } = mockStore();
    const adventurer = withId(1, store.getState().objects.get(1)! as IAdventurer);
    const isLocationValid = () => true;
    createMoveForwardCommand(isLocationValid, store)(adventurer);
    const expectedMutation: ISetAdventurerLocation = {
        type: "SET_ADVENTURER_LOCATION",
        payload: {
            id: 1,
            location: {x: 2, y: 2},
        },
    };
    expect(dispatch).toBeCalledWith(expectedMutation);
});

it("should dispatch change treasure quantity when location has a treasure", () => {
    const { store, dispatch } = mockStore();
    const adventurer = withId(2, store.getState().objects.get(2)! as IAdventurer);
    const isLocationValid = () => true;
    createMoveForwardCommand(isLocationValid, store)(adventurer);
    const expectedMutation: IChangeTreasureQuantity = {
        type: "CHANGE_TREASURE_QUANTITY",
        payload: {
            id: 3,
            quantity: 2,
        },
    };
    expect(dispatch).toHaveBeenCalledWith(expectedMutation);
});

it("should not move the adventurer if location is occupied", () => {
    const adventurer = {id: 0, ...buildAdventurer({ location: vector(1, 2), orientation: North })};
    const isLocationValid = () => true;
    const { store, dispatch } = mockStore({
        objects: Map([
            [0, adventurer],
            [1, buildAdventurer({ location: vector(1, 3), orientation: North })],
        ]),
    });
    createMoveForwardCommand(isLocationValid, store)(adventurer);
    expect(dispatch).not.toBeCalled();
});

it("should throw if location is invalid", () => {
    const adventurer = buildAdventurer({ location: vector(3, 3), orientation: North });
    const isLocationValid = () => false;
    const { store } = mockStore({
        objects: Map([
            [0, adventurer],
        ]),
    });
    expect(() => createMoveForwardCommand(isLocationValid, store)(withId(0, adventurer))).toThrow();
});
