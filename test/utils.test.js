import {describe}   from 'mocha';
import {expect}     from 'chai';
import chai         from 'chai';

import convSess     from '../utils/conv_session';


// --- Conversation Session Test --- //
const psid = 123;
const name = 'BOB';
const res1 = "Nice to meet you " + name + ". Would you like to have a cake?";
const res2 = "Sorry, I don't understand your answer. I hope simple answer such as yes and no are not too difficult for you.";
const res3 = "The cake is a lie.";

describe('Conversation Session Test', () => {
  let res = "";

  it('should register a callback', (done) => {
    res = convSess
                .registerNameCallback(psid)
                .isRegistered(psid);
    expect(res).to.be.true;
    done();
  });

  it('should match the responses', (done) => {
    res = convSess.apply(psid, name);
    expect(res.recipient).to.have.property('id', psid);
    expect(res.message).to.have.property('text', res1);
    done();
  });

  it('should register another callback', (done) => {
    res = convSess.isRegistered(psid);
    expect(res).to.be.true;
    done();
  });

  it('should match the responses', (done) => {
    res = convSess.apply(psid, 'yep');
    expect(res.recipient).to.have.property('id', psid);
    expect(res.message).to.have.property('text', res2);

    res = convSess.apply(psid, 'YeS');
    expect(res.recipient).to.have.property('id', psid);
    expect(res.message).to.have.property('text', res3);
    done();
  });

  it('should not be registered any callback', (done) => {
    res = convSess.isRegistered(psid);
    expect(res).to.be.false;
    done();
  });
});
