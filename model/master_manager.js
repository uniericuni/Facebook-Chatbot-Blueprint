import GameManager from './game_manager';

// TODO: Database
// TODO: Garbage collection
// const db;


class MasterManager {
  // Constructor
  constructor() {
    const _start_time = Date.now(); 

    this._state = "RUN";
    this._game_manager_table = {};

    console.log("[game state] master manager starts");
  }

  // Game Manager
  createGameManager() {
    //   TODO: unrepeatable random integer generations
    //   sol1: pre-reserved array
    //   sol2: collision check
    let game_id = Math.floor(Math.random() * 100);
    while (this.hasGameManager(game_id))
      game_id = Math.floor(Math.random() * 100);
    this._game_manager_table[game_id] = new GameManager(game_id);
    return this._game_manager_table[game_id];
  }

  hasGameManager(game_id) {
    game_id = game_id.toString();
    return this._game_manager_table.hasOwnProperty(game_id);
  }

  getGameManager(game_id) {
    game_id = game_id.toString();
    return this._game_manager_table[game_id];
  }

  // TODO: make function linear by using universal table ?
  getGameManagerByPlayerId(player_id) {
    player_id = player_id.toString();

    for (var game_mgr_id in (this._game_manager_table)) {
      let game_mgr = this.getGameManager(game_mgr_id);
      if (game_mgr.hasPlayer(player_id))
        return game_mgr;
    }
    return undefined;
  }

  getNumGameManagers() {
    return Object.keys(this._game_manager_table).length;
  }

  deleteGameManager(game_id) {
    // TODO: check super call from subclass
    if (this.hasGameManager(game_id))
      delete this._game_manager_table[game_id];
    return this;
  }
}

export default new MasterManager();
