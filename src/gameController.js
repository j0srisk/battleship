import shipFactory from './factories/ship.js';
import gameboardFactory from './factories/gameboard.js';
import playerFactory from './factories/player.js';

const gameController = () => {
    //create players
    const user = playerFactory('user', 'User');
    const program = playerFactory('program', 'Program');

    const winner = null
    

    //place ships
    user.board.placeShip(user.ships[0], 0, 'horizontal');
    // user.board.placeShip(user.ships[1], 10, 'horizontal');
    // user.board.placeShip(user.ships[2], 20, 'horizontal');
    // user.board.placeShip(user.ships[3], 30, 'horizontal');
    // user.board.placeShip(user.ships[4], 40, 'horizontal');

    program.board.placeShip(program.ships[0], 0, 'horizontal');
    // program.board.placeShip(program.ships[1], 10, 'horizontal');
    // program.board.placeShip(program.ships[2], 20, 'horizontal');
    // program.board.placeShip(program.ships[3], 30, 'horizontal');
    // program.board.placeShip(program.ships[4], 40, 'horizontal');

    //attack
    const attack = (position) => {
        const attackResult = program.board.receiveAttack(position);

        counterAttack();

        if (attackResult === 'hit') {
            return 'hit';
        } else if (attackResult === 'miss') {
            return 'miss';
        }
    };

    let counterAttacks = [];

    const counterAttack = () => {
        let counterAttackPosition = Math.floor(Math.random() * 100);
        while (counterAttacks.includes(counterAttackPosition)) {
            console.log("loop")
            counterAttackPosition = Math.floor(Math.random() * 100);
        }
        counterAttacks.push(counterAttackPosition); // add new position to array
        user.board.receiveAttack(counterAttackPosition);
    };

    return { user, program, winner, attack  }
}

export default gameController;
