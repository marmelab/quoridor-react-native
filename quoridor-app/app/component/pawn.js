import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pawn: {
    position: "absolute",
    fontSize: 30
  }
});

export class Pawn extends React.Component {
  render() {
    return (
      <Text
        style={[
          styles.pawn,
          {
            color: this.props.color,
            top: this.props.position.top,
            left: this.props.position.left
          }
        ]}
      >
        &#9823;
      </Text>
    );
  }
}
