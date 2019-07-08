import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Board from "../component/board.js";
import { createGame } from "../api/gameApi";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
});

const renderLoading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const renderGame = game => {
  return (
    <View>
      <Text>Player Turn: {game.pawnTurn}</Text>
      <Board squares={game.board.squares} pawns={game.pawns} />
    </View>
  );
};

const GameScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState({ board: { squares: [] }, pawns: [] });

  useEffect(() => {
    const fetchGame = () => {
      setIsLoading(true);
      createGame()
        .then(game => {
          setGame(game);
          setIsLoading(false);
        })
        .catch(err => {
          console.log({ err });
          setIsLoading(false);
        });
    };
    fetchGame();
  });

  return (
    <View style={styles.container}>
      {isLoading ? renderLoading() : renderGame(game)}
    </View>
  );
};

export default GameScreen;
