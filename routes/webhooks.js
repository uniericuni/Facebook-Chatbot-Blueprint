import express          from 'express';
import dotenv           from 'dotenv';

import api              from '../api/api';

dotenv.load();

const router = express.Router();


// --- Webhook GET --- //
router.get('/', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token){
    if (mode == 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('[webhook event] webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// --- Webhook POST --- //
router.post('/', (req, res) => {
  const body = req.body;

  if (body.object === 'page'){
    body.entry.forEach( (entry) => {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;

      if (webhook_event.message){
        api.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        api.handlePostback(sender_psid, webhook_event.postback); 
      } else {
        console.log("[webhook error] unknown message type");
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

export default router;
