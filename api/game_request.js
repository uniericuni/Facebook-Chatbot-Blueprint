import request from 'request';

import master from '../model/master_manager';
import sendAPI from './send_api';
import convSess from '../model/conv_session'
import Logger from '../utils/logger.js';

// const master = new MasterManager();
const logger = new Logger('games_req', 'request')


// Game Request
//   TODO: check if the game request is sent via legitimate source
export default (sender_psid, received_game_req) => {
  let req_type = received_game_req.request_type;

  if (req_type) {
    if (req_type === "STATE") {
      handleState(sender_psid, received_game_req);
    } else if (req_type === "CONV") {
      handleConv(sender_psid, received_game_req);
    } else if (req_type === "INFO") {
      handleInfo(sender_psid, received_game_req);
    } else if (req_type === "ACTION") {
      handleAction(sender_psid, received_game_req);
    } else {
      logger.err(sender_psid);
    }
  }
}

// State Handler
const handleState = (psid, req) => {
  if (req.game_state) {
    let game_state = req.game_state;
    if (game_state === "START") {
      logger.log('STATE:START', psid);
      handleStart(psid, req);
    } else if (game_state === "JOIN") {
      logger.log('STATE:JOIN', psid);
      handleJoin(psid, req);
    } else if (game_state === "LEAVE") {
      logger.log('STATE:LEAVE', psid);
      handleLeave(psid, req);
    } else {
      logger.err(psid);
    }
  } 
}

const handleStart = (psid, req) => {
  let game_mgr = master.createGameManager();
  let game_id = game_mgr.getGameId();
  let proxy = game_mgr.createProxy(psid);

  let text = "Your game has been initiated. The game ID is "
                + game_id.toString() + ". Your proxy id is "
                + proxy.getProxyId().toString();
  let response = {
    recipient: {"id": psid},
    message: {"text": text}
  };

  sendAPI.sendMessage(response);
}

const handleJoin = (psid, req) => {
  convSess.registerJoinCallback(psid);

  let response = {
    recipient: {"id": psid},
    message: {"text": "Please enter the game id you would like to join"}
  };
  sendAPI.sendMessage(response);
}

const handleLeave = (psid, req) => {
  master
    .getGameManagerByPlayerId(psid)
    .deleteProxy(psid);

  let text = "You have been successfully removed from the game";
  let response = {
    recipient: {"id": psid},
    message: {"text": text}
  };
  sendAPI.sendMessage(response);
}

// Conversation Hanlder
const handleConv = (psid, request) => {
  logger.log('Conversation', psid);
}

// Information Handler
const handleInfo = (psid, request) => {
  logger.log('Information', psid);
}

// Action Handler
const handleAction = (psid, request) => {
  logger.log('Action', psid);
}

