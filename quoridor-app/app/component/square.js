import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  square: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "rgb(65, 50, 43)"
  }
});

export class Square extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.square,
          {
            top: this.props.position.top,
            left: this.props.position.left
          }
        ]}
      />
    );
  }
}
