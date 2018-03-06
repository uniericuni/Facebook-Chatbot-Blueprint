import sendAPI from './send_api'
import convSess from '../model/conv_session'
import Logger from '../utils/logger.js'

const logger = new Logger('webhook', 'message')

// Message
export default (sender_psid, received_message) => {
  if (isText(received_message)) {
    handleTextMessage(sender_psid, received_message.text);
  } else if (isSticker(received_message)) {
    handleStickerMessage(sender_psid, received_message.attachments);
  } else {
    logger.err(sender_psid, received_message);
  };
}

const handleTextMessage = (psid, text) => {
  logger.log('text', psid);

  let response = (convSess.isRegistered(psid))
    ? convSess.apply(psid, text)
    : getEchoMessage(psid, text);

  sendAPI.sendMessage(response);
}

const getEchoMessage = (psid, text) => {
  return {
    recipient: {"id": psid},
    message: {"text": text},
  };
}

// Sticker Message
const handleStickerMessage = (psid, attachments) => {
  let sticker_id = attachments[0].payload.sticker_id;

  if (sticker_id === 369239263222822 ||     // small thumb-up
      sticker_id === 369239343222814 ||     // medium thumb-up
      sticker_id === 369239383222810) {     // large thumb-up
    logger.log('thumb-up', psid);

    let response = {
      "recipient": {"id": psid},
      "message": startTemplate,
    };
    sendAPI.sendMessage(response);
  } else {
    logger.errSpec(psid, "unknown sticker id " + sticker_id.toString());
  }
}

// Message Type
const isText = (received_message) => {
  return received_message.text;
}

const isSticker = (received_message) => {
  return (received_message.attachments[0] &&
          received_message.attachments[0].payload &&
          received_message.attachments[0].payload.sticker_id);
}

// Buttons
const postbackStartButton = {
  "type": "postback",
  "title": "Start a New Game",
  "payload": "START"
}

const postbackJoinButton = {
  "type": "postback",
  "title": "Join a Game",
  "payload": "JOIN"
}

const postbackLeaveButton = {
  "type": "postback",
  "title": "Leave the Game",
  "payload": "LEAVE"
}

// Template
// TODO: currently only accept three buttons
const startTemplate = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "button",
      "text": "What can I do for you?",
      "buttons": [
        postbackStartButton, 
        postbackJoinButton,
        postbackLeaveButton
      ]
    }
  }
}
