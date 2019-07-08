import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { GameAPI } from "../api/game_api";
import { Board } from "../component/board.js";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      laoding: true,
      game: { board: { squares: [] }, pawns: [] }
    };
  }

  componentDidMount() {
    new GameAPI()
      .createGame()
      .then(data => {
        console.log(data.board.squares);
        this.setState({ game: data, laoding: false });
      })
      .catch(err => console.log({ err }));
  }

  renderLoading() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderGame() {
    return (
      <View>
        <Text>Player Turn: {this.state.game.pawnTurn}</Text>
        <Board
          squares={this.state.game.board.squares}
          pawns={this.state.game.pawns}
        />
      </View>
    );
  }

  render() {
    const isLoading = this.state.loading;

    return (
      <View style={styles.container}>
        {isLoading ? this.renderLoading() : this.renderGame()}
      </View>
    );
  }
}
