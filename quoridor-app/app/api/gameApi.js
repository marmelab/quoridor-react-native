const API_PATH = "http://192.168.86.56:8383/games";
const JSON_TYPE = "application/json";

const DEFAULT_BOARD_SIZE = 9;
const DEFAULT_NUMBER_OF_FENCES_PER_PLAYER = 10;

export const createGame = async () => {
  const response = await fetch(API_PATH, {
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
  return await response.json();
};

export const joinGame = async gameId => {
  const response = await fetch(`${API_PATH}/${gameId}/join`, {
    method: "PUT",
    headers: {
      Accept: JSON_TYPE,
      "Content-Type": JSON_TYPE
    }
  });
  return await response.json();
};
