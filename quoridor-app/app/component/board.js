import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Pawn from "./pawn";
import Square from "./square";
import Fence from "./fence";

const styles = StyleSheet.create({
  board: {
    width: 360,
    height: 360,
    backgroundColor: "rgb(133, 65, 52)"
  },

  zone: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderStyle: "dotted",
    borderWidth: 0.5,
    borderColor: "rgb(0, 255, 255)"
  }
});

const DELTA = 40;
const BOARD_PADDING = 5;
const SQUARE_SIZE = 30;
const PAWN_TOP_PADDING = BOARD_PADDING - 6;
const PAWN_LEFT_PADDING = BOARD_PADDING + 4;
const PAWN_COLORS = ["rgb(217, 54, 59)", "rgb(184, 88, 46)"];

const generateKey = (type, position) => {
  return `${type}:${position.column}${position.row}`;
};

const isSquareDisabled = (moves, position) => {
  return !moves.some(move => move.column === position.column && move.row === position.row);
};

const renderFence = (fence) => {
  let topPosition, leftPosition;
  if (fence.Horizontal) {
    topPosition = fence.NWSquare.row * DELTA + SQUARE_SIZE + BOARD_PADDING;
    leftPosition = fence.NWSquare.column * DELTA + BOARD_PADDING;
  } else {
    topPosition = fence.NWSquare.row * DELTA + BOARD_PADDING;
    leftPosition = fence.NWSquare.column * DELTA + SQUARE_SIZE + BOARD_PADDING;
  }
  return (<Fence
          key={generateKey("fence", fence.NWSquare)}
          position={{
            top: topPosition,
            left: leftPosition,
          }}
          horizontal={fence.Horizontal}
        />);
}

const Board = ({squares, fences, pawns, showMoves, possibleMoves, possibleFences, onClick, onFenceClick}) => {
  if (!squares) {
    return null;
  }
  return (
    <View style={styles.board}>
      {squares.map(item => (
        <Square
          key={generateKey("square", item)}
          position={{
            top: item.row * DELTA + BOARD_PADDING,
            left: item.column * DELTA + BOARD_PADDING
          }}
          disable={!showMoves || isSquareDisabled(possibleMoves, item)}
          onClick={() => onClick(item)}
        />
      ))}
      {fences.map(item => (
        renderFence(item)
      ))}
      {pawns.map((item, index) => (
        <Pawn
          key={generateKey("pawn", item.position)}
          color={PAWN_COLORS[index]}
          position={{
            top: item.position.row * DELTA + PAWN_TOP_PADDING,
            left: item.position.column * DELTA + PAWN_LEFT_PADDING
          }}
        />
      ))}
      { showMoves ? <View></View> : renderPossibleFences(possibleFences, onFenceClick)}
    </View>
  );
};

const renderPossibleFences = (possibleFences, onFenceClick) => {
  return (possibleFences.map(item => (
    <TouchableOpacity
      onPress={() => onFenceClick(item)}
      key={generateKey("zone", item.NWSquare)}
      style={[
        styles.zone,
        {
          top: item.NWSquare.row * DELTA + BOARD_PADDING + SQUARE_SIZE / 2,
          left: item.NWSquare.column * DELTA + BOARD_PADDING + SQUARE_SIZE / 2
        }
      ]}
    />
  )))
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
