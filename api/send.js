import request  from 'request';
import dotenv   from 'dotenv';

dotenv.load();


// --- Send API --- //
const send = (response) => {
  request({
    uri: process.env.CLIENT_HOST,
    qs: {"access_token": process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: response
  }, (error, response, body) => {
    if (error) {
      console.log('[webhook error] Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('[webhook error] Error: ', response.body.error)
    };
  });
}

// --- Send Text --- //
const sendMessage = (psid, text) => {
  let response = {
    recipient: {id: psid},                                                          
    message: {text: text},
  };
  send(response);
}

// --- Send Template --- //
const sendTemplate = (psid,) => {
  let response = {
    recipient: {id: psid},                                                          
    message: template,
  };
  send(response);
}

// --- Buttons --- //
const postbackButton = {
  "type": "postback",
  "title": "Hello",
  "payload": "GREETING"
}

const postbackButtonWithConvSess = {
  "type": "postback",
  "title": "Your Name?",
  "payload": "NAME"
}

// --- Template --- //
const template = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "button",
      "text": "🤖",
      "buttons": [
        postbackButton,
        postbackButtonWithConvSess,
      ]
    }
  }
}

export default {
  sendMessage,
  sendTemplate,
};

