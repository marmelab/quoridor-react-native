import getEnvVars from "../../environment";

const { API_BASE_URL } = getEnvVars();

const JSON_TYPE = "application/json";

const DEFAULT_BOARD_SIZE = 9;
const DEFAULT_NUMBER_OF_FENCES_PER_PLAYER = 10;

export const createGame = async () => {
  return await fetch(`${API_BASE_URL}/games`, {
    method: "POST",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE
    },
    body: JSON.stringify({
      boardSize: DEFAULT_BOARD_SIZE,
      numberOfFencesPerPlayer: DEFAULT_NUMBER_OF_FENCES_PER_PLAYER
    })
  });
};

export const joinGame = async gameId => {
  return await fetch(`${API_BASE_URL}/games/${gameId}/join`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE
    }
  });
};

export const movePawn = async (authToken, gameId, position) => {
  return await fetch(`${API_BASE_URL}/games/${gameId}/move-pawn`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE,
      Authorization: authToken
    },
    body: JSON.stringify(position)
  });
};

export const getPossiblePawnMoves = async gameId => {
  return await fetch(`${API_BASE_URL}/games/${gameId}/move-pawn/possibilities`, {
    method: "GET",
    headers: {
      Accept: JSON_TYPE,
    },
  });
};
