import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Board from "../component/board.js";
import { createGame, joinGame, movePawn, getPossiblePawnMoves } from "../api/gameApi";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const renderLoading = () => (
  <View>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const renderGame = (game, setMove, possiblesMoves) => (
  <View>
    <Text>Player Turn: {game.pawnTurn}</Text>
    <Board
      squares={game.board.squares}
      possibleMoves={possiblesMoves}
      pawns={game.pawns}
      onClick={item => handleClickMove(item, setMove)}
    />
  </View>
);

const handleClickMove = (item, setMove) => {
  setMove(item);
};

const getPossibleMoves = async (gameId, setPossibleMoves) => {
  const response = await getPossiblePawnMoves(gameId);
  const content = await response.json();
  if (!response.ok) {
    console.err(content);
  }
  setPossibleMoves(content);
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

const initGame = async (setIsLoading, players, setPlayers, setGame, setPossibleMoves) => {
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
  getPossibleMoves(content.id, setPossibleMoves);

  setIsLoading(false);
};

const moveThePawn = async (position, players, game, setGame, setPossibleMoves) => {
  if (!position) {
    return;
  }
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
  getPossibleMoves(content.id, setPossibleMoves);
};

const GameScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState({ board: { squares: [] }, pawns: [] });
  const [possiblesMoves, setPossibleMoves] = useState([]);
  const [players, setPlayers] = useState([]);
  const [move, setMove] = useState();

  useEffect(() => {
    initGame(setIsLoading, players, setPlayers, setGame, setPossibleMoves);
  }, []);
  useEffect(() => {
    moveThePawn(move, players, game, setGame, setPossibleMoves);
  }, [move]);

  return (
    <View style={styles.container}>
      {isLoading ? renderLoading() : renderGame(game, setMove, possiblesMoves)}
    </View>
  );
};

export default GameScreen;
