import shipFactory from './ship.js';
import gameboardFactory from './gameboard.js';

const playerFactory = (playerId, playerName) => {
    let id = playerId;
    let name = playerName;
    let board = gameboardFactory();
    let ships = [
        shipFactory(5, 'Carrier'),
        shipFactory(4, 'Battleship'),
        shipFactory(3, 'Destroyer'),
        shipFactory(3, 'Submarine'),
        shipFactory(2, 'Patrol Boat')
    ];
    
    return { id, name, board, ships }
};

export default playerFactory;
