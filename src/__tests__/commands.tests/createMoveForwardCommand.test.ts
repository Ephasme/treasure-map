import { buildAdventurer } from "../../__fixtures__/buildAdventurer";
import { buildTreasure } from "../../__fixtures__/buildTreasure";
import { createMoveForwardCommand } from "../../commands";
import { withId } from "../../models";
import { ISetAdventurerLocation, ITreasureFound, TREASURE_FOUND } from "../../store/mutations";
import { North } from "../../utils/directions";
import { vector } from "../../utils/vector";

it("should dispatch the proper mutation", () => {
    const adventurer = withId(3, buildAdventurer());
    const dispatch = jest.fn();
    const isLocationValid = () => true;
    const getTreasure = () => undefined;
    const isOccupied = () => false;
    createMoveForwardCommand(isLocationValid, isOccupied, getTreasure, dispatch)(adventurer);
    const expectedMutation: ISetAdventurerLocation = {
        type: "SET_ADVENTURER_LOCATION",
        payload: {
            id: 3,
            location: {x: 5, y: 3},
        },
    };
    expect(dispatch).toBeCalledWith(expectedMutation);
});

it("should dispatch change treasure quantity when location has a treasure", () => {
    const adventurer = withId(3, buildAdventurer());
    const dispatch = jest.fn();
    const isLocationValid = () => true;
    const isOccupied = () => false;
    const getTreasure = () => withId(6, buildTreasure());
    createMoveForwardCommand(isLocationValid, isOccupied, getTreasure, dispatch)(adventurer);
    const expectedMutation: ITreasureFound = {
        type: TREASURE_FOUND,
        payload: {
            id: 6,
        },
    };
    expect(dispatch).toHaveBeenCalledWith(expectedMutation);
});

it("should not move the adventurer if location is occupied", () => {
    const adventurer = withId(0, buildAdventurer({ location: vector(1, 2), orientation: North }));
    const dispatch = jest.fn();
    const isLocationValid = () => true;
    const getTreasure = () => undefined;
    const isOccupied = () => true;
    createMoveForwardCommand(isLocationValid, isOccupied, getTreasure, dispatch)(adventurer);
    expect(dispatch).not.toBeCalled();
});

it("should throw if location is invalid", () => {
    const adventurer = buildAdventurer({ location: vector(3, 3), orientation: North });
    const dispatch = jest.fn();
    const isLocationValid = () => false;
    const getTreasure = () => undefined;
    const isOccupied = () => false;
    expect(() => createMoveForwardCommand(
        isLocationValid, isOccupied, getTreasure, dispatch)(withId(0, adventurer))).toThrow();
});
