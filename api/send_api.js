import request  from 'request';
import dotenv   from 'dotenv';

dotenv.load();


// --- Send API --- //
const sendMessage = (response) => {
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

export default {
  sendMessage
};
