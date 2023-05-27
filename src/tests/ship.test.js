import {
  assert, beforeEach, describe, it,
} from 'vitest';
import shipFactory from '../factories/ship';

describe('ship functions', () => {
  let testShip;

  beforeEach(() => {
    testShip = shipFactory(4, 'Battleship');
  });

  it('ship length', () => {
    assert.equal(testShip.length, 4);
  });

  it('ship name', () => {
    assert.equal(testShip.name, 'Battleship');
  });

  it('hit function', () => {
    testShip.hitShip(0);
    assert.equal(testShip.hit[0], 0);
  });

  it('isSunk function', () => {
    testShip.hitShip(0);
    testShip.hitShip(1);
    testShip.hitShip(2);
    testShip.hitShip(3);
    assert.equal(testShip.isSunk(), true);
  });
});
