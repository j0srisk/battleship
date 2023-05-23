import shipFactory from './factories/ship.js';
import gameboardFactory from './factories/gameboard.js';
import playerFactory from './factories/player.js';

const gameController = () => {
    //create players
    const player1 = playerFactory('Player 1');
    const player2 = playerFactory('Player 2');

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
        otherPlayer.board.receiveAttack(position);
        if (otherPlayer.board.allSunk()) {
            console.log(`${currentPlayer.name} wins!`);
        } else {
            if (currentPlayer === player1) {
                currentPlayer = player2;
                otherPlayer = player1;
            } else {
                currentPlayer = player1;
                otherPlayer = player2;
            }
        }
    };

    return { player1, player2 }
}

let game = gameController();

console.log(game.player1.board);
