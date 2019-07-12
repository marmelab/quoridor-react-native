import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  fence: {
    position: "absolute",
    backgroundColor: "rgb(234, 180, 110)"
  },

  horizontalFence: {
    width: 70,
    height: 10,
  },

  verticalFence: {
    width: 10,
    height: 70,
  }
});

const Fence = props => {
  return (<View
    style={[
      styles.fence, props.horizontal ? styles.horizontalFence : styles.verticalFence,
      {
        top: props.position.top,
        left: props.position.left
      }
    ]}
  />)
};

export default Fence;
