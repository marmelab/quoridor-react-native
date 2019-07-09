import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  square: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "rgb(65, 50, 43)"
  }
});

const Square = ({ position }) => {
  return (
    <View
      style={[
        styles.square,
        {
          top: position.top,
          left: position.left
        }
      ]}
    />
  );
};

Square.prototype = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired
};

export default Square;
