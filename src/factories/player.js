import shipFactory from './ship.js';
import gameboardFactory from './gameboard.js';

const playerFactory = (playerName) => {
    let name = playerName;
    let board = gameboardFactory();
    let ships = [
        shipFactory(5),
        shipFactory(4),
        shipFactory(3),
        shipFactory(3),
        shipFactory(2)
    ];
    
    return { name, board, ships }
};

export default playerFactory;
