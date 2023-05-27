import {
  assert, beforeEach, describe, expect, it, test,
} from 'vitest';
import gameController from '../gameController';

describe('gameController functions', () => {
  let testGame;

  beforeEach(() => {
    testGame = gameController();
  });

  it('players exist', () => {
    assert.equal(testGame.user.id, 'user');
    assert.equal(testGame.program.id, 'program');
  });

  it('checks ship placement', () => {
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 0, 'horizontal'), true);
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 0, 'vertical'), true);
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 9, 'horizontal'), false);
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 90, 'vertical'), false);
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 99, 'horizontal'), false);
    assert.equal(testGame.checkShipPlacement(testGame.user.board, testGame.user.ships[0], 99, 'vertical'), false);
  });

  it('attacks', () => {
    testGame.program.board.placeShip(testGame.program.ships[0], 0, 'horizontal');
    assert.equal(testGame.attack(0), 'hit');
  });
});
