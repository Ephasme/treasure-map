import { Map } from "immutable";
import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { mockStore } from "../../__fixtures__/mockStateManager";
import { moveCommand } from "../../commands";
import { ISetAdventurerLocation } from "../../store/mutations";
import { North } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should dispatch the proper mutation", () => {
    const { store, dispatch } = mockStore();
    moveCommand(2)(store);
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
    const { store, dispatch } = mockStore({
        objects: Map([
            [0, buildAdventurer({ location: vector(1, 2), orientation: North })],
            [1, buildAdventurer({ location: vector(1, 3), orientation: North })],
        ]),
    });
    moveCommand(0)(store);
    expect(dispatch).not.toBeCalled();
});

it("should throw if location is invalid", () => {
    const { store } = mockStore({
        objects: Map([
            [0, buildAdventurer({ location: vector(3, 3), orientation: North })],
        ]),
    });
    expect(() => moveCommand(0)(store)).toThrow();
});
