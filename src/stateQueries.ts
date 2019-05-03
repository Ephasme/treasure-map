import { IAdventurer, Id, ITreasure, WithId, withId } from "./models";
import { IStore } from "./store/IStore";
import { GameState, MapSizeState, ObjectsState } from "./store/state";
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
export const isOccupied = (objects: ObjectsState, location: IVector): boolean => {
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
export const getTreasure = (objects: ObjectsState, location: IVector): WithId<ITreasure> | undefined => {
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
 * @param mapSize the map's dimensions.
 * @param location the location to test.
 */
export const isLocationValid = (mapSize: MapSizeState, location: IVector): boolean => {
    return location.x >= 0 && location.x < mapSize.x &&
           location.y >= 0 && location.y < mapSize.y;
};

/**
 * Find an adventurer in the list of objects.
 * @param objects the current list of objects.
 * @param id the adventurer's id.
 */
export const findAdventurer = (objects: ObjectsState, id: Id): WithId<IAdventurer> => {
    const adventurer = objects.get(id);
    if (!adventurer || adventurer.type !== "Adventurer") {
        throw new Error("Not found.");
    }
    return withId(id, adventurer);
};

/**
 * Iterate over all the adventurers in order.
 * @param state the game state.
 */
export function *getAdventurers(state: GameState): IterableIterator<WithId<IAdventurer>> {
    for (const id of state.adventurersOrder) {
        const adventurer = state.objects.get(id);
        if (adventurer && adventurer.type === "Adventurer") {
            yield withId(id, adventurer);
        }
    }
}
