import sendAPI from './send_api';
import convSess from '../model/conv_session'
import handleGameRequest from './game_request';
import Logger from '../utils/logger.js';
import {PAGE_ACCESS_TOKEN, GAME_ACCESS_TOEKN} from '../config';

const logger = new Logger('webhook', 'postback')


// Postback
export default (sender_psid, received_postback) => {
  if (isButtonPostback(received_postback)) {
    handleButtonPostback(sender_psid, received_postback);
  } else {
    logger.err(sender_psid);
  };
}

const handleButtonPostback = (psid, postback) => {
  logger.log('button', psid);

  // TODO: determine if I need to use specific repackager
  let game_state = getGameState(psid, postback);
  let game_request = {
    "request_type" : "STATE",
    "sender": {"id": psid},
    "timestamp": postback.timestamp,
    "game_state": game_state,
    "game_id": undefined,
  };
  handleGameRequest(psid, game_request);
}

// Postback Type
const isButtonPostback = (postback) => {
  return postback.title;
}

// Game State
const getGameState = (psid, postback) => {
  if (postback.payload) {
    switch (postback.payload) {
      case "START":
        return "START";
      case "JOIN":
        return "JOIN";
      case "LEAVE":
        return "LEAVE";
      default:
        return "ERROR" + "$" + postback.payload.toString();
    }
  } else {
    return "ERROR" + "$" + "NOPAYLOAD";
  }
}
