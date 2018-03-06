export default class Proxy {
  constructor(proxy_id, game_mgr) {
    this._proxy_id = proxy_id;
    this._game_manager = game_mgr;

    console.log("[game state] proxy %s starts in game manager %s", 
                this._proxy_id, this._game_manager.getGameId())
  }
  
  getProxyId() {
    return this._proxy_id;
  }
}
