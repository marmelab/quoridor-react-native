import React from "react";
import renderer from "react-test-renderer";

import Square from "../square";

describe("Square Component tests", () => {
  it("should renders the right component", () => {
    const tree = renderer
      .create(<Square position="{top: 0, left: 10}" disable />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
