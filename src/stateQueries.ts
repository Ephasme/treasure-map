import { Map } from "immutable";
import { isNumber } from "util";
import { AnyObject, IAdventurer, ITreasure, WithId, withId } from "./models";
import { equals, IVector } from "./utils/vector";

/**
 * Returns true if some adventurers have some moves.
 * @param getObjects the state.
 */
export const hasMoves = (getObjects: () => AnyObject[]) => (): boolean => {
    return !!getObjects().find((x) => {
        return x.type === "Adventurer"
            && !x.moves.isEmpty();
    });
};

/**
 * If this function whether the location is occupied or not.
 * @param getObjects the current state of the world
 * @param location the location to test
 */
export const isOccupied = (getObjects: () => AnyObject[]) => (location: IVector): boolean => {
    return !!getObjects()
        .filter((x) => !x.traversable)
        .map((x) => x.location)
        .find((vector) => equals(vector, location));
};

/**
 * Returns the treasure if there is some, undefined otherwise.
 * @param getObjects the current game objets.
 * @param location the location of the treasure.
 */
export const getTreasure =
        (getObjects: () => Map<number, AnyObject>) => (location: IVector): WithId<ITreasure> | undefined => {
    const objects = getObjects();
    const id = objects.findKey((x) => equals(location, x.location));
    if (isNumber(id)) {
        const obj = objects.get(id);
        if (obj && obj.type === "Treasure") {
            return withId(id, obj);
        }
    }
};

/**
 * Checks if the location is valid.
 * @param getBoundaries the map's dimensions.
 * @param location the location to test.
 */
export const isLocationValid = (getBoundaries: () => IVector) => (location: IVector) => {
    const { x: xmax, y: ymax } = getBoundaries();
    return location.x >= 0 && location.x < xmax &&
           location.y >= 0 && location.y < ymax;
};

/**
 * Iterates over all the players in order.
 * @param getAdventurersOrder the list of id representing the order of players.
 * @param getObjects all the game objects.
 */
export const getAdventurers:
    (getAdventurersOrder: () => readonly number[], getObjects: () => Map<number, AnyObject>)
        => () => IterableIterator<WithId<IAdventurer>> = (getAdventurersOrder, getObjects) => {
    return function*() {
        const adventurersOrder = getAdventurersOrder();
        const objects = getObjects();
        for (const id of adventurersOrder) {
            const adventurer = objects.get(id);
            if (adventurer && adventurer.type === "Adventurer") {
                yield withId(id, adventurer);
            }
        }
    };
};
