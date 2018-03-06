export default class logger {
  constructor (event_type, message_type) {
    this.event_type = event_type,
    this.message_type = message_type;
  }

  log (content_type, sender_psid) {
    console.log("[%s event] received %s %s from %s",
      this.event_type, content_type, this.message_type, sender_psid);
  }

  err (sender_psid, received_message) {
    console.log("[%s error] received unknown content typed %s from %s" +
                "           the message content is" +
                "           %s",
      this.event_type, this.message_type, sender_psid, JSON.stringify(received_message));
  }

  errSpec (sender_psid, spec) {
    console.log("[%s error] from %s, %s",
      this.event_type, sender_psid, spec)
  }
}
