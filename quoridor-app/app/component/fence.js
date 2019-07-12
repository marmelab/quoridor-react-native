import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  fence: {
    position: "absolute",
  },

  fenceHorizontal: {
    width: 70,
    height: 10,
    backgroundColor: "rgb(234, 180, 110)",
  },

  fenceVertical: {
    width: 10,
    height: 70,
    backgroundColor: "rgb(234, 180, 110)",
  }
});

const renderHorizontalFence = props => {
  return (
    <View
      style={[
        styles.square,
        styles.fenceHorizontal,
        {
          top: props.position.top,
          left: props.position.left
        }
      ]}
    />
  );
}

const renderVerticalFence = (props) => {
  return (
    <View
      style={[
        styles.fence,
        styles.fenceVertical,
        {
          top: props.position.top,
          left: props.position.left
        }
      ]}
    />
  );
}


const Fence = props => {
  console.log(props);
  return props.horizontal ? renderHorizontalFence(props): renderVerticalFence(props);
};

export default Fence;
