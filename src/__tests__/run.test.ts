import { IAdventurer, ITreasure } from "../models";
import { run } from "../run";
import { toStream } from "../utils/toStream";
import { vector } from "../utils/vector";

it("should move properly", async () => {
    const game = `C - 4 - 4
M - 0 - 1
M - 1 - 1
T - 1 - 3 - 2
A - Loup - 2 - 0 - N - AAADA`;

    await run(toStream(game), (endState) => {
        const adv = endState.objects.get(3) as IAdventurer;
        expect(adv.location).toEqual(vector(3, 3));
    });
});

it("should take a treasure", async () => {
    const game = `C - 4 - 4
T - 3 - 3 - 1
A - Loup - 3 - 2 - N - A`;

    await run(toStream(game), (endState) => {
        const tre = endState.objects.get(0) as ITreasure;
        expect(tre.quantity).toEqual(0);
    });
});

it("should not move in front of a mountain", async () => {
    const game = `C - 4 - 4
M - 0 - 1
A - Loup - 0 - 0 - N - A`;

    await run(toStream(game), (endState) => {
        const adv = endState.objects.get(1) as IAdventurer;
        expect(adv.location).toEqual(vector(0, 0));
    });
});

it("should move adventurers in order", async () => {
    const game = `C - 4 - 4
A - Jim - 0 - 0 - N - A
A - Loup - 1 - 1 - O - A`;

    await run(toStream(game), (endState) => {
        const loup = endState.objects.get(1) as IAdventurer;
        const jim = endState.objects.get(0) as IAdventurer;
        expect(loup.location).toEqual(vector(1, 1));
        expect(jim.location).toEqual(vector(0, 1));
    });
});
