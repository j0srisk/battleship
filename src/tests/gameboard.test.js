import {
  assert, beforeEach, describe, it,
} from 'vitest';
import gameboardFactory from '../factories/gameboard';
import shipFactory from '../factories/ship';

describe('gameboard functions', () => {
  let testGameboard;

  beforeEach(() => {
    testGameboard = gameboardFactory();
  });

  it('placeShip function horizontal', () => {
    const testShip = shipFactory(4);
    testGameboard.placeShip(testShip, 0, 'horizontal');
    assert.equal(testGameboard.board[0], testShip);
    assert.equal(testGameboard.board[1], testShip);
    assert.equal(testGameboard.board[2], testShip);
    assert.equal(testGameboard.board[3], testShip);
  });

  it('placeShip function vertical', () => {
    const testShip = shipFactory(4);
    testGameboard.placeShip(testShip, 0, 'vertical');
    assert.equal(testGameboard.board[0], testShip);
    assert.equal(testGameboard.board[10], testShip);
    assert.equal(testGameboard.board[20], testShip);
    assert.equal(testGameboard.board[30], testShip);
  });

  it('receiveAttack function', () => {
    const testShip = shipFactory(4);
    testGameboard.placeShip(testShip, 0, 'horizontal');
    testGameboard.receiveAttack(0);
    assert.equal(testGameboard.board[0], testShip);
    assert.equal(testGameboard.board[0].hit[0], 0);
  });

  it('allSunk function horizontal', () => {
    const testShip = shipFactory(4);
    testGameboard.placeShip(testShip, 0, 'horizontal');
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(1);
    testGameboard.receiveAttack(2);
    testGameboard.receiveAttack(3);
    assert.equal(testGameboard.allSunk(), true);
  });

  it('allSunk function vertical', () => {
    const testShip = shipFactory(4);
    testGameboard.placeShip(testShip, 0, 'vertical');
    testGameboard.receiveAttack(0);
    testGameboard.receiveAttack(10);
    testGameboard.receiveAttack(20);
    testGameboard.receiveAttack(30);
    assert.equal(testGameboard.allSunk(), true);
  });
});
