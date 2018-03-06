curl \
  -H "Content-Type: application/json" \
  -X POST "localhost:1337/webhook" \
  -d '{
    "object": "page", 
    "entry": [{
      "messaging": [{
        "messaging_type": "<MESSAGING_TYPE>",
        "sender": {"id": "2014321581917874"},
        "recipient": {"id": "173511476584074"},
        "message": {
          "mid":"mid.$cAADHPVJEDStnxdJQ-VhlI0IqAqYu",
          "seq":1306584,
          "sticker_id":369239263222822,
          "attachments": [{
            "type":"image",
            "payload": {
              "url": "localhost:1999",
              "sticker_id": 369239263222822
            }
          }]
        }
     }]
    }]
  }'

