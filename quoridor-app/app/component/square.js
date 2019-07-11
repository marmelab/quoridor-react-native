import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  square: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "rgb(65, 50, 43)"
  },

  move: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgb(0, 255, 255)"
  }
});

const renderSquare = props => {
  return (
    <View
      style={[
        styles.square,
        {
          top: props.position.top,
          left: props.position.left
        }
      ]}
    />
  );
};

const renderClickableSquare = props => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[
        styles.square,
        styles.move,
        {
          top: props.position.top,
          left: props.position.left
        }
      ]}
    />
  );
};

const Square = props => {
  if (props.disable) {
    return renderSquare(props);
  }
  return renderClickableSquare(props);
};

Square.prototype = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired,
  disable: PropTypes.bool
};

export default Square;
