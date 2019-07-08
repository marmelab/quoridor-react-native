import React from "react";
import { View, StyleSheet } from "react-native";

import { Pawn } from "../component/pawn";
import { Square } from "./square";

const styles = StyleSheet.create({
  board: {
    width: 360,
    height: 360,
    backgroundColor: "rgb(133, 65, 52)"
  }
});

export class Board extends React.Component {
  render() {
    if (!this.props.squares) {
      return null;
    }
    const delta = 40;
    const boardPadding = 5;
    const pawnTopPadding = boardPadding - 6;
    const pawnLeftPadding = boardPadding + 4;
    const colors = ["rgb(217, 54, 59)", "rgb(184, 88, 46)"];
    return (
      <View style={styles.board}>
        {this.props.squares.map((item, key) => (
          <Square
            key={key}
            position={{
              top: item.row * delta + boardPadding,
              left: item.column * delta + boardPadding
            }}
          />
        ))}
        {this.props.pawns.map((item, key) => (
          <Pawn
            key={key}
            color={colors[key]}
            position={{
              top: item.position.row * delta + pawnTopPadding,
              left: item.position.column * delta + pawnLeftPadding
            }}
          />
        ))}
      </View>
    );
  }
}
