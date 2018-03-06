import master from '../model/master_manager';


class ConversationSession {
  constructor() {
    this._callback_table = {};
  }

  // Callback Registration
  register(psid, callback) {
    this._callback_table[psid] = callback;
    return this;
  }

  unregister(psid, delete_user_thread=false) {
    if (this.isRegistered(psid)) {
      (delete_user_thread)
        ? delete this._callback_table[psid]
        : this._callback_table[psid] = null; 
    }
    return this;
  }

  isRegistered(psid) {
    return this._callback_table.hasOwnProperty(psid);
  }

  apply(psid, args) {
    if (this.isRegistered(psid))
      return this.getCallback(psid)(args);
  }

  getCallback(psid) {
    return this._callback_table[psid];
  }

  // Pre-defined Callbacks
  registerJoinCallback(psid) {
    this.register(psid, (game_id) => {
      let text = "";

      if (master.hasGameManager(game_id)) {
        this.unregister(psid);
        let proxy_id = master
                        .getGameManager(game_id)
                        .createProxy(psid)
                        .getProxyId();
        text = "You have joined the game. Your proxy ID is " + proxy_id.toString();
      } else {
        text = "Unknown game id " + game_id.toString() + ". Please enter a valid one";
      }

      return {
        recipient: {"id": psid},
        message: {"text": text},
      };
    });
  }
}

export default new ConversationSession();
