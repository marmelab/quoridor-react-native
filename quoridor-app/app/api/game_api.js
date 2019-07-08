const API_PATH = "http://192.168.86.56:8383/games";
const JSON_TYPE = "application/json";

export class GameAPI {
  async createGame() {
    const res = await fetch(API_PATH, {
      method: "POST",
      headers: {
        Accept: JSON_TYPE,
        "Content-Type": JSON_TYPE
      },
      body: JSON.stringify({
        boardSize: 9,
        numberOfFencesPerPlayer: 10
      })
    });
    return await res.json();
  }

  async joinGame(gameId) {
    const res = await fetch(API_PATH + "/" + gameId + "/join", {
      method: "PUT",
      headers: {
        Accept: JSON_TYPE,
        "Content-Type": JSON_TYPE
      }
    });
    return await res.json();
  }
}
