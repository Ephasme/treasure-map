import { buildGameState } from "../__fixtures__/buildGameState";
import { render } from "../display";

it("should render the final state", () => {
    const result = render(buildGameState());
    expect(result).toMatchSnapshot();
});
