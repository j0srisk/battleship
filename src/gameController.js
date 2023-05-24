import shipFactory from './factories/ship.js';
import gameboardFactory from './factories/gameboard.js';
import playerFactory from './factories/player.js';

const gameController = () => {
    //create players
    const user = playerFactory('user', 'User');
    const program = playerFactory('program', 'Program');

    const winner = () => {
        if (user.board.allSunk()) {
            return program.name;
        } else if (program.board.allSunk()) {
            return user.name;
        } else {
            return null;
        }
    };

    const randomShipPlacement = (board, ship) => {
        let position = Math.floor(Math.random() * 100);
        let orientation = Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical';
        while (!checkShipPlacement(board, ship, position, orientation)) {
            position = Math.floor(Math.random() * 100);
            orientation = Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical';
        }
        board.placeShip(ship, position, orientation);
    };

    const checkShipPlacement = (board, ship, position, orientation) => {
        if (orientation === 'horizontal') {
            //check if ship is out of bounds
            if (position % 10 + ship.length > 10) {
                return false;
            } else {
                //check if ship overlaps with another ship
                for (let i = 0; i < ship.length; i++) {
                    if (board.board[position + i] != null) {
                        return false;
                    }
                }
            }
        } else if (orientation === 'vertical') {
            //check if ship is out of bounds
            console.log(position + (ship.length * 10));
            if (position + (ship.length * 10) > 109) {
                console.log(position)
                console.log('out of bounds');
                console.log(position + (ship.length * 10));
                return false;
            } else {
                //check if ship overlaps with another ship
                for (let i = 0; i < ship.length; i++) {
                    if (board.board[position + (i * 10)] != null) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    // randomShipPlacement(user.board, user.ships[0]);
    // randomShipPlacement(user.board, user.ships[1]);
    // randomShipPlacement(user.board, user.ships[2]);
    // randomShipPlacement(user.board, user.ships[3]);
    // randomShipPlacement(user.board, user.ships[4]);

    randomShipPlacement(program.board, program.ships[0]);
    randomShipPlacement(program.board, program.ships[1]);
    randomShipPlacement(program.board, program.ships[2]);
    randomShipPlacement(program.board, program.ships[3]);
    randomShipPlacement(program.board, program.ships[4]);

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

    return { user, program, checkShipPlacement, winner, attack  }
}

export default gameController;
