import { Stack } from "immutable";
import { IDirection } from "./utils/directions";
import { IVector } from "./utils/vector";

export type Id = number;

export interface IGameObject {
    readonly location: IVector;
    readonly traversable: boolean;
}

export interface IAdventurer extends IGameObject {
    readonly type: "Adventurer";
    readonly orientation: IDirection;
    readonly moves: Stack<"A" | "D" | "G">;
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
    | IAdventurer;
