import sendAPI  from './send';
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
      return;
    case "NAME":
      handleName(psid, postback);
      return;
    default:
      console.log('[webhook error] undefined button postback type');
      return;
  }
}

const handleGreeting = (psid, postback) => {
  sendAPI.sendMessage(psid, "Greetings!");
}

const handleName = (psid, postback) => {
  convSess.registerNameCallback(psid);
  sendAPI.sendMessage(psid, "The name is GlaDOS. And yours?");
}
