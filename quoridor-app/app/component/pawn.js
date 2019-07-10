import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  pawn: {
    position: "absolute",
    fontSize: 30
  }
});

const Pawn = ({ color, position }) => {
  return (
    <Text
      style={[
        styles.pawn,
        {
          color: color,
          top: position.top,
          left: position.left
        }
      ]}
    >
      &#9823;
    </Text>
  );
};

Pawn.prototype = {
  color: PropTypes.string.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired
};

export default Pawn;
