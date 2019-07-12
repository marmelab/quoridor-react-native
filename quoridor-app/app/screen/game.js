import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

import Board from "../component/board.js";
import { createGame, joinGame, movePawn, getPossiblePawnMoves, getPossibleFencesAdds, addFence } from "../api/gameApi";

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

const getMessage = (game) => {
  if (game.over) {
    return <Text>Player: {game.pawnTurn} won !</Text>
  }
  return <Text>Player Turn: {game.pawnTurn}</Text>
}

const showPossibilities = (isHorizontal, possibleFences, setMode, setPossibleFences) => () => {
  const fences = possibleFences.filter(fence => fence.Horizontal == isHorizontal);

  setMode(modes.FENCE);
  setPossibleFences(fences);

  console.log(isHorizontal, fences.length);
}
const renderGame = (game, setMove, possiblesMoves, possibleAllFences, possibleFences, setPossibleFences, setFence, mode, setMode) => (
  <View>
    {getMessage(game)}
    <Board
      squares={game.board.squares}
      fences={game.fences}
      possibleMoves={possiblesMoves}
      possibleFences={possibleFences}
      pawns={game.pawns}
      showMoves={mode === modes.MOVE}
      onClick={item => handleClickMove(item, setMove)}
      onFenceClick={item => handleClickFence(item, setFence)}
    />
    <Button
      onPress={showPossibilities(true, possibleAllFences, setMode, setPossibleFences)}
      title="Add horizontal fence"
      color="#841584"
    />
    <Button
      onPress={showPossibilities(false, possibleAllFences, setMode, setPossibleFences)}
      title="Add veritcal fence"
      color="#841584"
    />
  </View>
);

const handleClickMove = (item, setMove) => {
  setMove(item);
};

const handleClickFence = (item, setFence) => {
  setFence(item);
};

const getPossibleMoves = async (gameId, setPossibleMoves) => {
  const response = await getPossiblePawnMoves(gameId);
  const content = await response.json();
  if (!response.ok) {
    console.error(content);
    return;
  }
  setPossibleMoves(content);
};

const getPossibleFences = async (gameId, setPossibleAllFences) => {
  const response = await getPossibleFencesAdds(gameId);
  const content = await response.json();
  if (!response.ok) {
    console.error(content);
  }
  setPossibleAllFences(content);
};

const joinTheGame = async (gameId, players, setPlayers) => {
  const response = await joinGame(gameId);
  const content = await response.json();
  if (!response.ok) {
    console.error(content);
    return;
  }
  players.push(content.AuthToken);
  setPlayers(players);
};

const initGame = async (setIsLoading, players, setPlayers, setGame, setMode, setPossibleMove, setPossibleAllFences) => {
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
  getPlayerPossibilities(content, setMode, setPossibleMove, setPossibleAllFences);

  setIsLoading(false);
};

const getPlayerPossibilities = (game, setMode, setPossibleMoves, setPossibleAllFences) => {
  setMode(modes.MOVE);
  if (game.over) {
    setPossibleMoves([]);
    setPossibleAllFences([]);
  } else {
    getPossibleMoves(game.id, setPossibleMoves);
    getPossibleFences(game.id, setPossibleAllFences);
  }
}

const moveThePawn = async (position, players, game, setGame, setMode, setPossibleMoves, setPossibleAllFences) => {
  if (!position) {
    return;
  }
  const response = await movePawn(
    players[game.pawnTurn - 1],
    {gameId: game.id, position: position}
  );
  const content = await response.json();
  if (!response.ok) {
    return;
  }
  setGame(content);

  getPlayerPossibilities(content, setMode, setPossibleMoves, setPossibleAllFences)
};

const addTheFence = async (fence, players, game, setGame, setMode, setPossibleMoves, setPossibleAllFences) => {
  if (!fence) {
    return;
  }
  const response = await addFence(players[game.pawnTurn - 1], game.id, fence);
  const content = await response.json();
  if (!response.ok) {
    return;
  }
  setGame(content);
  getPlayerPossibilities(content, setMode, setPossibleMoves, setPossibleAllFences)
}

const GameScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({ board: { squares: [] }, pawns: [] });
  const [mode, setMode] = useState(modes.MOVE);
  const [possiblesMoves, setPossibleMoves] = useState([]);
  const [move, setMove] = useState();
  const [possibleAllFences, setPossibleAllFences] = useState([]);
  const [possibleFences, setPossibleFences] = useState([]);
  const [fence, setFence] = useState();

  useEffect(() => {
    initGame(setIsLoading, players, setPlayers, setGame, setMode, setPossibleMoves, setPossibleAllFences);
  }, []);
  useEffect(() => {
    moveThePawn(move, players, game, setGame, setMode, setPossibleMoves, setPossibleAllFences);
  }, [move]);
  useEffect(() => {
    addTheFence(fence, players, game, setGame, setMode, setPossibleMoves, setPossibleAllFences);
  }, [fence]);

  return (
    <View style={styles.container}>
      {isLoading ? renderLoading() : renderGame(game, setMove, possiblesMoves, possibleAllFences, possibleFences, setPossibleFences, setFence, mode, setMode)}
    </View>
  );
};

const modes = {
  MOVE: 1,
  FENCE: 2
}

export default GameScreen;
