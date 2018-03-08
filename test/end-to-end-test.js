import {describe}   from 'mocha';
import {expect}     from 'chai';
import chai         from 'chai';
import chaiHttp     from 'chai-http';
import dotenv       from 'dotenv'

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
        'hub.verify_token': process.env.VERIFY_TOEKN})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be('CHALLENGE_ACCEPTED');
        done();
      });
  });

  it('should not be authenticated', (done) => {
    chai.request(webhookUrl)
      .get('/webhook')
      .query({
        'hub.mode': 'subscribe',
        'hub.challenge': 'CHALLENGE_ACCEPTED',
        'hub.verify_token': process.env.VERIFY_TOEKN})
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});

/*
// --- Behavior Test --- //
describe('Behavior Test', () => {
  it('should show you a template', (done) => {
    chai.request(webhookUrl)
      .post('/webhook')
      .send(thumbUp)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.deep.property('tempate');
      });
  });
});
*/
