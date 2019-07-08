import React from "react";
import renderer from "react-test-renderer";

import { Square } from "../square";

it("renders correctly", () => {
  const tree = renderer
    .create(<Square position="{top: 0, left: 10}" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("<Pawn />", () => {
  it("has no child", () => {
    const tree = renderer
      .create(<Square position="{top: 0, left: 10}" />)
      .toJSON();
    expect(tree.children.length).toBe(0);
  });
});
