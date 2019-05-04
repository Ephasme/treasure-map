import { IAdventurer, ITreasure, WithId, withId } from "./models";
import { GameState, ObjectsState } from "./store/state";
import { equals, IVector } from "./utils/vector";

/**
 * Returns true if some adventurers have some moves.
 * @param getObjects the state.
 */
export const hasMoves = (getObjects: () => ObjectsState) => (): boolean => {
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
export const isOccupied = (getObjects: () => ObjectsState) => (location: IVector): boolean => {
    return !!getObjects()
        .filter((x) => !x.traversable)
        .map((x) => x.location)
        .findKey((vector) => equals(vector, location));
};

/**
 * Returns the treasure if there is some, undefined otherwise.
 * @param getObjects the current game objets.
 * @param location the location of the treasure.
 */
export const getTreasure = (getObjects: () => ObjectsState) => (location: IVector): WithId<ITreasure> | undefined => {
    const objects = getObjects();
    const id = objects.findKey((x) => equals(location, x.location));
    if (id) {
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

export const getAdventurers: (getState: () => GameState) => () => IterableIterator<WithId<IAdventurer>> = (state) => {
    return function*() {
        const { adventurersOrder, objects } = state();
        for (const id of adventurersOrder) {
            const adventurer = objects.get(id);
            if (adventurer && adventurer.type === "Adventurer") {
                yield withId(id, adventurer);
            }
        }
    };
};
