// --- Conversation Session --- //
class ConversationSession {
  constructor() {
    this._callback_table = {};
  }

  register(psid, callback) {
    this._callback_table[psid] = callback;
    return this;
  }

  unregister(psid, delete_user_thread=true) {
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
    if (this.getCallback(psid) &&
        typeof(this.getCallback(psid))==='function')
      return this.getCallback(psid)(args);
  }

  getCallback(psid) {
    return this._callback_table[psid];
  }

  // --- Predefined Callback --- //
  registerNameCallback(psid) {
    return this.register(psid, (name) => {
      this.unregister(psid);
      this.registerNextCallback(psid);

      let text = "Nice to meet you "
                    + name 
                    + ". Would you like to have a cake?";
      return text;
    });
  }

  registerNextCallback(psid) {
    return this.register(psid, (ans) => {
      ans = ans.toLowerCase();
      let text = "";

      if (ans==='yes') {
        text = "The cake is a lie.";
        this.unregister(psid);
      } else if (ans==='no') {
        text = "The Enrichment Center is required to remind you that you will be baked, and then there will be cake.";
        this.unregister(psid);
      } else {
        text = "Sorry, I don't understand your answer. I hope simple answer such as yes and no are not too difficult for you.";
      }
      return text;
    });
  }
}

export default new ConversationSession();
