import { IAdventurer, ITreasure, WithId, withId } from "./models";
import { IStore } from "./store/IStore";
import { GameState, ObjectsState } from "./store/state";
import { equals, IVector } from "./utils/vector";

/**
 * Returns true if some adventurers have some moves.
 * @param objects the state.
 */
export const hasMovesFactory = (store: IStore) => (): boolean => {
    return !!store.getState().objects.find((x) => {
        return x.type === "Adventurer"
            && !x.moves.isEmpty();
    });
};

/**
 * If this function whether the location is occupied or not.
 * @param objects the current state of the world
 * @param location the location to test
 */
export const isOccupied = (objects: ObjectsState) => (location: IVector): boolean => {
    return !!objects
        .filter((x) => !x.traversable)
        .map((x) => x.location)
        .findKey((vector) => equals(vector, location));
};

/**
 * Returns the treasure if there is some, undefined otherwise.
 * @param objects the current game objets.
 * @param location the location of the treasure.
 */
export const getTreasure = (objects: ObjectsState) => (location: IVector): WithId<ITreasure> | undefined => {
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
 * @param boundaries the map's dimensions.
 * @param location the location to test.
 */
export const isLocationValid = (boundaries: IVector) => (location: IVector) => {
    return location.x >= 0 && location.x < boundaries.x &&
           location.y >= 0 && location.y < boundaries.y;
};

export const getAdventurers: (state: GameState) => () => IterableIterator<WithId<IAdventurer>> = (state) => {
    return function*() {
        for (const id of state.adventurersOrder) {
            const adventurer = state.objects.get(id);
            if (adventurer && adventurer.type === "Adventurer") {
                yield withId(id, adventurer);
            }
        }
    };
};
