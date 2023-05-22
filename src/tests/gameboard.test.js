import { assert, beforeEach, describe, expect, it } from 'vitest'
import gameboardFactory from '../factories/gameboard'
import shipFactory from '../factories/ship'

describe('gameboard functions', () => {

    let testGameboard;

    beforeEach(() => {
        testGameboard = gameboardFactory();
    });

    it('placeShip function', () => {
        const testShip = shipFactory(4);
        testGameboard.placeShip(testShip, 0, 'horizontal');
        assert.equal(testGameboard.board[0], testShip);
        assert.equal(testGameboard.board[1], testShip);
        assert.equal(testGameboard.board[2], testShip);
        assert.equal(testGameboard.board[3], testShip);
    });

    it('receiveAttack function', () => {
        const testShip = shipFactory(4);
        testGameboard.placeShip(testShip, 0, 'horizontal');
        testGameboard.receiveAttack(0);
        assert.equal(testGameboard.board[0], testShip);
        assert.equal(testGameboard.board[0].hit[0], 0);
    });

    it('allSunk function', () => {
        const testShip = shipFactory(4);
        testGameboard.placeShip(testShip, 0, 'horizontal');
        testGameboard.receiveAttack(0);
        testGameboard.receiveAttack(1);
        testGameboard.receiveAttack(2);
        testGameboard.receiveAttack(3);
        assert.equal(testGameboard.allSunk(), true);
    });
});