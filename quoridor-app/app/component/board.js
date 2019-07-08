import React from "react";
import { View, StyleSheet } from "react-native";

import Pawn from "./pawn";
import Square from "./square";

const styles = StyleSheet.create({
  board: {
    width: 360,
    height: 360,
    backgroundColor: "rgb(133, 65, 52)"
  }
});

const DELTA = 40;
const BOARD_PADDING = 5;
const PAWN_TOP_PADDING = BOARD_PADDING - 6;
const PAWN_LEFT_PADDING = BOARD_PADDING + 4;
const PAWN_COLORS = ["rgb(217, 54, 59)", "rgb(184, 88, 46)"];

const Board = ({ squares, pawns }) => {
  if (!squares) {
    return null;
  }

  return (
    <View style={styles.board}>
      {squares.map((item, key) => (
        <Square
          key={key}
          position={{
            top: item.row * DELTA + BOARD_PADDING,
            left: item.column * DELTA + BOARD_PADDING
          }}
        />
      ))}
      {pawns.map((item, key) => (
        <Pawn
          key={key}
          color={PAWN_COLORS[key]}
          position={{
            top: item.position.row * DELTA + PAWN_TOP_PADDING,
            left: item.position.column * DELTA + PAWN_LEFT_PADDING
          }}
        />
      ))}
    </View>
  );
};

export default Board;
