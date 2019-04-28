import { IAdventurer, Id } from "./models";
import { GameState, MapSizeState, ObjectsState } from "./state";
import { equals, IVector } from "./utils/vector";

/**
 * If this function returns an object's id the location is occupied by this object.
 * Otherwise it returns undefined and it means that the location is free.
 * @param objects the current state of the world
 * @param location the location to test
 */
export const getOccupant = (objects: ObjectsState, location: IVector): Id | undefined => {
    return objects
        .filter((x) => !x.traversable)
        .map((x) => x.location)
        .findKey((vector) => equals(vector, location));
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
export const findAdventurer = (objects: ObjectsState, id: Id): IAdventurer => {
    const adventurer = objects.get(id);
    if (!adventurer || adventurer.type !== "Adventurer") {
        throw new Error("Not found.");
    }
    return adventurer;
};

/**
 * Iterate over all the adventurers in order.
 * @param state the game state.
 */
export function *getAdventurers(state: GameState): IterableIterator<IAdventurer> {
    for (const id of state.adventurersOrder) {
        const obj = state.objects.get(id);
        if (obj && obj.type === "Adventurer") {
            yield state.objects.get(id) as IAdventurer;
        }
    }
}
