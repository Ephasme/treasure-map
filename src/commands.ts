import { Id } from "./models";
import { Rotate } from "./utils/rotations";

type MOVE_COMMAND_TYPE = "MOVE";
type ROTATE_COMMAND_TYPE = "ROTATE";

export interface IMoveCommand {
    readonly type: MOVE_COMMAND_TYPE;
    readonly adventurerId: Id;
}

export interface IRotateCommand {
    readonly type: ROTATE_COMMAND_TYPE;
    readonly adventurerId: Id;
    readonly rotator: Rotate;
}
