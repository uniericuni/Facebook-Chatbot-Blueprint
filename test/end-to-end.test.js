import {describe}   from 'mocha';
import {expect}     from 'chai';
import chai         from 'chai';
import chaiHttp     from 'chai-http';
import dotenv       from 'dotenv';

dotenv.load();
chai.use(chaiHttp);

const webhookUrl = 'localhost:' + process.env.PORT


// --- Verification Test --- //
describe('Verification Test', () => {
  it('should return status code 200', (done) => {
    chai.request(webhookUrl)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return challenge message', (done) => {
    chai.request(webhookUrl)
      .get('/webhook')
      .query({
        'hub.mode': 'subscribe',
        'hub.challenge': 'CHALLENGE_ACCEPTED',
        'hub.verify_token': process.env.VERIFY_TOKEN})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('CHALLENGE_ACCEPTED');
        done();
      });
  });

  it('should not be authenticated', (done) => {
    chai.request(webhookUrl)
      .get('/webhook')
      .query({
        'hub.mode': 'subscribe',
        'hub.challenge': 'CHALLENGE_ACCEPTED',
        'hub.verify_token': 'HELLO_WORLD'})
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});

// --- Behavior Test -- //
const message = {
  "object": "page", 
  "entry": [{
    "messaging": [{
      "messaging_type": "<MESSAGING_TYPE>",
      "sender": {"id": "1606015496154680"},
      "recipient": {"id": "430311617404468"},
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
}

describe('Behavior Test', () => {
  it('should return status code 200', (done) => {
    chai.request(webhookUrl)
      .post('/webhook')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(message))
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
