import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

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

const generateKey = (type, position) => {
  return `${type}:${position.column}${position.row}`;
};

const isSquareDisabled = (moves, position) => {
  return !moves.some(move => move.column === position.column && move.row === position.row);
};

const Board = ({squares, pawns, possibleMoves, onClick}) => {
  if (!squares) {
    return null;
  }
  return (
    <View style={styles.board}>
      {squares.map((item, _) => (
        <Square
          key={generateKey("square", item)}
          position={{
            top: item.row * DELTA + BOARD_PADDING,
            left: item.column * DELTA + BOARD_PADDING
          }}
          disable={isSquareDisabled(possibleMoves, item)}
          onClick={() => onClick(item)}
        />
      ))}
      {pawns.map((item, key) => (
        <Pawn
          key={generateKey("pawn", item.position)}
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

Board.prototype = {
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired,
    })
  ).isRequired,
  possiblesMoves: PropTypes.arrayOf(
    PropTypes.shape({
      column: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired,
    })
  ).isRequired,
  pawns: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        column: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
      }),
      goal: PropTypes.number,
    })
  ).isRequired,
  disable: PropTypes.bool,
};

export default Board;
