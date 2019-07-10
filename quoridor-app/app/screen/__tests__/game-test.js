import React from "react";
import { render } from "@testing-library/react-native";

import Game from "../game";
import { createGame } from "../../api/gameApi";

jest.mock("../../api/gameApi", () => {
  const game = {
    board: { squares: [{ column: 10, row: 8 }, { column: 10, row: 5 }] },
    pawns: []
  };

  const json = () => Promise.resolve(game);

  const createGame = jest.fn(() =>
    Promise.resolve({
      json
    })
  );

  const mod = {
    createGame
  };

  return mod;
});

describe("Game Component tests", () => {
  it("should render board", () => {
    render(<Game />);

    expect(createGame).toHaveBeenCalled();
  });
});
