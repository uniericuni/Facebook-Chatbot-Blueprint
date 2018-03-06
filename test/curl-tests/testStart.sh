curl \
  -H "Content-Type: application/json" \
  -X POST "localhost:1337/webhook" \
  -d '{
    "object": "page", 
    "entry": [{
      "messaging": [{
        "messaging_type": "<MESSAGING_TYPE>",
        "sender":{
          "id": "2014321581917874"
        },
        "recipient":{
          "id": "173511476584074"
        },
        "postback":{
          "title": "Start a New Game",
          "payload": "START",
          "referral": {
            "ref": "<USER_DEFINED_REFERRAL_PARAM>",
            "source": "<SHORTLINK>",
            "type": "OPEN_THREAD"
          }
        }
      }]
    }]
  }'
