import { Map } from "immutable";
import { IVector, make } from "../utils/vector";

it("should be able to use vectors as keys", () => {
    const v = make(0, 1);
    const v2 = make(1, 0);
    const map = Map<IVector, string>()
        .set(v, "v1")
        .set(v2, "v2");
    expect(map.get(v)).toBe("v1");
    expect(map.get(v2)).toBe("v2");
});
