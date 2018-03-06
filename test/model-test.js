import {describe} from 'mocha';
import {expect} from 'chai';

import GameMananger from '../model/game_manager';
import master from '../model/master_manager';

const NumGameManagers = 4;
const NumProxies = 4;  
const PlayerId = 123153;


describe('Master Manager', () => {
  describe('Master instantiation', () => {
    it('should in the state of RUN', () => {
      expect(master).to.have.property('_state', 'RUN');
    });
  });

  describe('Game manager instantiation & deletion', () => {
    it('should create ' + NumGameManagers.toString() + ' game managers', () => {
      for (var it=0; it<NumGameManagers; it++) {
        let game_mgr = master.createGameManager();
        let game_mgr_id = game_mgr.getGameId();

        expect(game_mgr).to.exist;
        expect(master.hasGameManager(game_mgr_id)).to.be.true;
        expect(master.getGameManager(game_mgr_id)).to.exist;
      }
      expect(master.getNumGameManagers()).to.equal(NumGameManagers);
    });

    it('should delete all game managers', () => {
      for (var game_mgr_id in master._game_manager_table) {
        expect(master.deleteGameManager(game_mgr_id)).to.exist;
        expect(master.deleteGameManager(game_mgr_id)).to.exist;
        expect(master.hasGameManager(game_mgr_id)).to.not.be.true;
      }
      expect(master.getNumGameManagers()).to.equal(0);
    });
  });
});


describe('Game Manager', () => {
  describe('Get Game Manager by PlayerId', () => {
    it('should get the same game manager', () => {
      let game_mgr = master.createGameManager(); 
      let proxy_id = game_mgr.createProxy(PlayerId).getProxyId();
      expect(master.getGameManagerByPlayerId(proxy_id)).to.deep.equal(game_mgr);

      game_mgr.deleteProxy(proxy_id);
      expect(game_mgr.getNumProxies()).to.equal(0);
      master.deleteGameManager(game_mgr.getGameId());
      expect(master.getNumGameManagers()).to.equal(0);
    });
  });

  describe('Proxy instantiation & deletion', () => {
    let game_mgr = master.createGameManager(); 
    let game_mgr_id = game_mgr.getGameId();

    it('should be ' + NumProxies.toString() + ' proxies', () => {
      for (var id=0; id<NumProxies; id++) {
        let proxy = game_mgr.createProxy(id); 

        expect(proxy).to.exist;
        expect(game_mgr.hasPlayer(id)).to.be.true;
        expect(game_mgr.getProxy(id)).to.exist;
      }
      expect(game_mgr.getNumProxies()).to.equal(NumProxies);
    });

    it('should be 0 proxies', () => {
      for (var id in game_mgr._proxy_table) {
        expect(game_mgr.deleteProxy(id)).to.exist;
        expect(game_mgr.deleteProxy(id)).to.exist;
        expect(game_mgr.hasPlayer(id)).to.be.not.true;
      }
      expect(game_mgr.getNumProxies()).to.equal(0);
    });

    master.deleteGameManager(game_mgr_id);
  });
});
