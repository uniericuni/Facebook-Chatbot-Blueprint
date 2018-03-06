import express from 'express';

import api from '../api/api';
import {PAGE_ACCESS_TOKEN, GAME_ACCESS_TOEKN} from '../config';

const router = express.Router();


router.get('/', (req, res) => {
  let access_token = req.query['access_token'];
  let game_token = req.query['game_access_token'];
  
  if (access_token && game_token) {
    if (access_token === PAGE_ACCESS_TOKEN && 
        game_token === GAME_ACCESS_TOEKN) {
      if (res.message && res.recipient) {
        console.log("I GOTTA POWER");
        // api.handleGameRequest(res.message, res.recipient);
      }
    } else {
      res.sendStatus(403);
    }
  }
});

router.post('/', (req, res) => {
  let access_token = req.query['access_token'];
  let game_token = req.query['game_access_token'];
  
  if (access_token && game_token) {
    if (access_token === PAGE_ACCESS_TOKEN && 
        game_token === GAME_ACCESS_TOEKN) {
      if (res.message && res.recipient) {
        console.log("I GOTTA POWER");
        // api.handleGameRequest(res.message, res.recipient);
      }
    } else {
      res.sendStatus(403);
    }
  }
});

export default router;
