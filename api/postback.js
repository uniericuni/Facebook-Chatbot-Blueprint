import sendAPI  from './send_api';
import convSess from '../utils/conv_session'


// --- Postback Handler --- //
export default (sender_psid, received_postback) => {
  if (isButtonPostback(received_postback)) {
    handleButtonPostback(sender_psid, received_postback);
  } else {
    console.log('[webhook error] undefined postback type');
  };
}

// --- Postback Type --- //
const isButtonPostback = (postback) => {
  let payload = postback.payload;
  return payload &&
         (payload === "GREETING" ||
          payload === "NAME");  
}

// --- Button Postback Handler -- //
const handleButtonPostback = (psid, postback) => {
  let payload = postback.payload;
  switch (payload) {
    case "GREETING":
      handleGreeting(psid, postback);
    case "NAME":
      handleName(psid, postback);
    default:
      console.log('[webhook error] undefined button postback type');
  }
}

const handleGreeting = (psid, postback) => {
  let response = {
    recipient: {"id": psid},
    message: {"text": "Greetings!"}
  };
  sendAPI.sendMessage(response);
}

const handleName = (psid, postback) => {
  convSess.registerNameCallback(psid);

  let response = {
    recipient: {"id": psid},
    message: {"text": "The name is GlaDOS. And yours?"}
  };
  sendAPI.sendMessage(response);
}
