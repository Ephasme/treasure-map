import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { moveForwardCommand } from "../../commands";
import { IAdventurer, withId } from "../../models";
import { ISetAdventurerLocation } from "../../store/mutations";
import { North } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should dispatch the proper mutation", () => {
    const { store, dispatch } = mockStore();
    const adventurer = withId(2, store.getState().objects.get(2)! as IAdventurer);
    moveForwardCommand(store)(adventurer);
    const expectedMutation: ISetAdventurerLocation = {
        type: "SET_ADVENTURER_LOCATION",
        payload: {
            id: 2,
            location: {x: 2, y: 1},
        },
    };
    expect(dispatch).toBeCalledWith(expectedMutation);
});

it("should not move the adventurer if location is occupied", () => {
    const adventurer = {id: 0, ...buildAdventurer({ location: vector(1, 2), orientation: North })};
    const { store, dispatch } = mockStore({
        objects: Map([
            [0, adventurer],
            [1, buildAdventurer({ location: vector(1, 3), orientation: North })],
        ]),
    });
    moveForwardCommand(store)(adventurer);
    expect(dispatch).not.toBeCalled();
});

it("should throw if location is invalid", () => {
    const adventurer = buildAdventurer({ location: vector(3, 3), orientation: North });
    const { store } = mockStore({
        objects: Map([
            [0, adventurer],
        ]),
    });
    expect(() => moveForwardCommand(store)(withId(0, adventurer))).toThrow();
});
