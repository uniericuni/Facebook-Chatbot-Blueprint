import Proxy from './proxy';


export default class GameManager {
  // Constructor
  constructor(game_id) {
    this._game_id = game_id;
    this._uri = undefined;
    this._proxy_table = {};
    this._proxy_to_player_id = {};
    this._proxy_response_queue = {}; 
    this._proxy_conv_queue = {};
    this._proxy_info_queue = {};

    console.log("[game state] game manager %s starts", this.getGameId());
  }

  // Game Manager
  getGameId() {
    return this._game_id;
  }

  playerIdToProxy(player_id) {
    return player_id.toString();
  }

  // Proxy
  createProxy(player_id) {
    // let proxy_id = Math.floor(Math.random() * 100);
    let proxy_id = this.playerIdToProxy(player_id);
    if (!this.hasPlayer(player_id))
      this._proxy_table[proxy_id] = new Proxy(proxy_id, this);
    return this._proxy_table[proxy_id];
  }

  hasPlayer(player_id) {
    player_id = this.playerIdToProxy(player_id);
    return this._proxy_table.hasOwnProperty(player_id);
  }

  getNumProxies() {
    return Object.keys(this._proxy_table).length;
  }

  getProxy(player_id) {
    player_id = this.playerIdToProxy(player_id);
    return this._proxy_table[player_id];
  }

  deleteProxy(player_id) {
    if (this.hasPlayer(player_id))
      delete this._proxy_table[player_id];
    return this;
  }







  // Private
  postPrivate(proxy_id, type, req, res) {
    if (type === "Conv") {
      return this.postPrivateConv(proxy_id, req, res);
    } else if (type === "Info") {
      return this.postPrivateInfo(proxy_id, req, res);
    } else {
      console.log("[game status] unimplimented private post type: %s", type);
      return this;
    };
  }
    
  postPrivateConv(proxy_id, req, res) {
    return this;
  }

  postPrivateInfo(proxy_id, req, res) {
    return this;
  }


  // Public
  postPublic(proxy_id, type, req, res) {
    if (type === "Conv") {
      return this.postPublicConv(proxy_id, req, res);
    } else if (type === "Info") {
      return this.postPublicInfo(proxy_id, req, res);
    } else {
      console.log("[game status] unimplimented private post type: %s", type);
      return this;
    };
  }
  
  postPublicConv(proxy_id, req, res) {
    return this;
  }

  postPublicInfo(proxy_id, req, res) {
    return this;
  }

}
