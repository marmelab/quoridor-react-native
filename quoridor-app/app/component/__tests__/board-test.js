import React from "react";
import renderer from "react-test-renderer";

import Board from "../board";
import Pawn from "../pawn";
import Square from "../square";

describe("Board Component tests", () => {
  it("should render with two squares and one pawn both well positioned", () => {
    const testRenderer = renderer.create(
      <Board
        squares={[{ column: 10, row: 8 }, { column: 10, row: 5 }]}
        possibleMoves={[{ column: 10, row: 5 }]}
        pawns={[{ goal: 2, position: { column: 5, row: 2 } }]}
      />
    );
    const testInstance = testRenderer.root;

    const pawnComponent = testInstance.findByType(Pawn);
    expect(pawnComponent).toBeDefined();
    expect(pawnComponent.props.position).toStrictEqual({
      top: 79,
      left: 209
    });

    const squareComponents = testInstance.findAllByType(Square);
    expect(squareComponents.length).toBe(2);
    expect(squareComponents[0].props.position).toStrictEqual({
      top: 325,
      left: 405
    });
    expect(squareComponents[1].props.position).toStrictEqual({
      top: 205,
      left: 405
    });
  });
});
