import sendAPI  from './send';
import convSess from '../utils/conv_session'


// --- Message Handler --- //
export default (sender_psid, received_message) => {
  if (isText(received_message)) {
    handleTextMessage(sender_psid, received_message.text);
  } else if (isSticker(received_message)) {
    handleStickerMessage(sender_psid, received_message.attachments);
  } else {
    console.log('[webhook error] undefined message type');
  };
}

// --- Message Type --- //
const isText = (received_message) => {
  return received_message.text;
}

const isSticker = (received_message) => {
  return (received_message.attachments[0] &&
          received_message.attachments[0].payload &&
          received_message.attachments[0].payload.sticker_id);
}

// --- Text Message Handler --- //
const handleTextMessage = (psid, text) => {
  let answer = (convSess.isRegistered(psid))
    ? convSess.apply(psid, text)
    : getStartMessage(psid, text);
  sendAPI.sendMessage(psid, answer);
}

const getStartMessage = (psid, text) => {
  let answer = 'It would be better to press thumb-up button instead of saying ' + text;
  return answer;
}

// --- Sticker Message Handler --- //
const handleStickerMessage = (psid, attachments) => {
  let sticker_id = attachments[0].payload.sticker_id;

  if (isThumbUp(sticker_id)) {
    sendAPI.sendTemplate(psid);
  } else {
    console.log('[webhook error] undefined message sticker id');
  }
}

const isThumbUp = (sticker_id) => {
  return (sticker_id === 369239263222822 || // small thumb-up
          sticker_id === 369239343222814 || // medium thumb-up
          sticker_id === 369239383222810);  // large thumb-up
}
