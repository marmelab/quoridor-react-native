import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Board from "../component/board.js";
import { createGame, joinGame, movePawn } from "../api/gameApi";

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

const renderGame = (game, setAction) => {
  return (
    <View>
      <Text>Player Turn: {game.pawnTurn}</Text>
      <Board
        squares={game.board.squares}
        pawns={game.pawns}
        onClick={item => handleClickMove(item, setAction)}
      />
    </View>
  );
};

const handleClickMove = (item, setAction) => {
  setAction(item);
};

const joinTheGame = async (gameId, players, setPlayers) => {
  const response = await joinGame(gameId);
  const content = await response.json();
  if (!response.ok) {
    console.err(content);
  }
  players.push(content.AuthToken);
  setPlayers(players);
};

const initGame = async (setIsLoading, players, setPlayers, setGame) => {
  setIsLoading(true);
  const response = await createGame();
  const content = await response.json();
  if (!response.ok) {
    console.log(content);
    return;
  }
  setGame(content);

  joinTheGame(content.id, players, setPlayers);
  joinTheGame(content.id, players, setPlayers);

  setIsLoading(false);
};

const moveThePawn = async (position, players, game, setGame) => {
  console.log({ players });
  console.log(players[game.pawnTurn - 1]);
  const response = await movePawn(
    players[game.pawnTurn - 1],
    game.id,
    position
  );
  const content = await response.json();
  if (!response.ok) {
    return;
  }
  setGame(content);
};

const GameScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState({ board: { squares: [] }, pawns: [] });
  const [players, setPlayers] = useState([]);
  const [move, setMove] = useState();

  useEffect(() => {
    initGame(setIsLoading, players, setPlayers, setGame);
  }, []);
  useEffect(() => {
    moveThePawn(move, players, game, setGame);
  }, [move]);

  return (
    <View style={styles.container}>
      {isLoading ? renderLoading() : renderGame(game, setMove)}
    </View>
  );
};

export default GameScreen;
