import request from 'request';
import {SERVER_URI, WEBHOOK_RESPONSE_URI, GAME_ACCESS_TOEKN, PAGE_ACCESS_TOKEN} from '../config';


// --- Send API --- //
// messenger send API: https://developers.facebook.com/docs/messenger-platform/reference/send-api/
const sendMessage = (response) => {
  request({
    uri: WEBHOOK_RESPONSE_URI,
    qs: {"access_token": PAGE_ACCESS_TOKEN},
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

export default {
  sendMessage
};
