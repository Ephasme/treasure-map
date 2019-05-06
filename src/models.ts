import { Stack } from "immutable";
import { IDirection } from "./utils/directions";
import { IVector } from "./utils/vector";

export type WithId<T> = T & { id: Id };
export const withId: <T>(id: Id, t: T) => WithId<T> = (id, t) => ({ ...t, id });

export type Id = number;

export interface IGameObject {
    readonly location: IVector;
    readonly traversable: boolean;
}

export type AdventurerMove = "A" | "D" | "G";

export interface IAdventurer extends IGameObject {
    readonly type: "Adventurer";
    readonly orientation: IDirection;
    readonly treasures: number;
    readonly moves: Stack<AdventurerMove>;
    readonly name: string;
}

export interface ITreasure extends IGameObject {
    readonly type: "Treasure";
    readonly quantity: number;
}

export interface IMountain extends IGameObject {
    readonly type: "Mountain";
}

export type AnyObject =
    | ITreasure
    | IMountain
    | IAdventurer
    ;
