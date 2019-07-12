import getEnvVars from "../../environment";

const { API_BASE_URL } = getEnvVars();

const JSON_TYPE = "application/json";

const DEFAULT_BOARD_SIZE = 9;
const DEFAULT_NUMBER_OF_FENCES_PER_PLAYER = 10;

export const createGame = () => {
  return fetch(`${API_BASE_URL}/games`, {
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

export const joinGame = gameId => {
  return fetch(`${API_BASE_URL}/games/${gameId}/join`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE
    }
  });
};

export const movePawn = (authToken, {gameId, position}) => {
  return fetch(`${API_BASE_URL}/games/${gameId}/move-pawn`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE,
      Authorization: authToken
    },
    body: JSON.stringify(position)
  });
};

export const getPossiblePawnMoves = gameId => {
  return fetch(`${API_BASE_URL}/games/${gameId}/move-pawn/possibilities`, {
    method: "GET",
    headers: {
      Accept: JSON_TYPE,
    },
  });
};

export const getPossibleFencesAdds = async gameId => {
  return await fetch(`${API_BASE_URL}/games/${gameId}/add-fence/possibilities`, {
    method: "GET",
    headers: {
      Accept: JSON_TYPE,
    },
  });
};

export const addFence = async (authToken, gameId, fence) => {
  return await fetch(`${API_BASE_URL}/games/${gameId}/add-fence`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE,
      Authorization: authToken
    },
    body: JSON.stringify(fence)
  });
};
