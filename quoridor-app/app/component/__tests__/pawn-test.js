import React from "react";
import renderer from "react-test-renderer";

import Pawn from "../pawn";

describe("Pawn Component tests", () => {
  it("should renders the right component", () => {
    const tree = renderer
      .create(<Pawn color="red" position="{top: 0, left: 10}" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
