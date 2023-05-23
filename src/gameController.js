import shipFactory from './factories/ship.js';
import gameboardFactory from './factories/gameboard.js';
import playerFactory from './factories/player.js';

const gameController = () => {
    //create players
    const player1 = playerFactory('player1', 'Player 1');
    const player2 = playerFactory('player2', 'Player 2');

    let currentPlayer = player1;
    let otherPlayer = player2;

    //place ships
    player1.board.placeShip(player1.ships[0], 0, 'horizontal');
    player1.board.placeShip(player1.ships[1], 10, 'horizontal');
    player1.board.placeShip(player1.ships[2], 20, 'horizontal');
    player1.board.placeShip(player1.ships[3], 30, 'horizontal');
    player1.board.placeShip(player1.ships[4], 40, 'horizontal');

    player2.board.placeShip(player2.ships[0], 0, 'horizontal');
    player2.board.placeShip(player2.ships[1], 10, 'horizontal');
    player2.board.placeShip(player2.ships[2], 20, 'horizontal');
    player2.board.placeShip(player2.ships[3], 30, 'horizontal');
    player2.board.placeShip(player2.ships[4], 40, 'horizontal');

    //attack
    const attack = (position) => {
        console.log(otherPlayer.name, position);
        if (otherPlayer.board.receiveAttack(position)) {
            return 'hit';
        };
    };

    return { player1, player2, attack }
}

export default gameController;
