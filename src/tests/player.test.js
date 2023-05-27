import {
  assert, beforeEach, describe, it,
} from 'vitest';
import playerFactory from '../factories/player';

describe('player functions', () => {
  let testPlayer;

  beforeEach(() => {
    testPlayer = playerFactory('playerid', 'playername');
  });

  it('player id', () => {
    assert.equal(testPlayer.id, 'playerid');
  });

  it('player name', () => {
    assert.equal(testPlayer.name, 'playername');
  });

  it('player ships', () => {
    assert.equal(testPlayer.ships.length, 5);
  });

  it('player attacks', () => {
    assert.equal(testPlayer.attacks.length, 0);
  });
});
