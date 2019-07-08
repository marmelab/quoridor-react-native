import React from "react";
import renderer from "react-test-renderer";
import { Text, StyleSheet } from "react-native";

import { Pawn } from "../pawn";

it("renders correctly", () => {
  const tree = renderer
    .create(<Pawn color="red" position="{top: o, left: 10}" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("<Pawn />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Pawn color="red" />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
