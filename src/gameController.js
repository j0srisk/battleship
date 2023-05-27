import playerFactory from './factories/player';

const gameController = () => {
// create players
  const user = playerFactory('user', 'User');
  const program = playerFactory('program', 'Computer');

  const counterAttacks = [];

  const winner = () => {
    if (user.board.allSunk()) {
      return program.name;
    } if (program.board.allSunk()) {
      return user.name;
    }
    return null;
  };

  const checkShipPlacement = (board, ship, position, orientation) => {
    if (orientation === 'horizontal') {
      // check if ship is out of bounds
      if ((position % 10) + ship.length > 10) {
        return false;
      }
      // check if ship overlaps with another ship
      for (let i = 0; i < ship.length; i += 1) {
        if (board.board[position + i] != null) {
          return false;
        }
      }
    } else if (orientation === 'vertical') {
      // check if ship is out of bounds
      if (position + (ship.length * 10) > 109) {
        return false;
      }
      // check if ship overlaps with another ship
      for (let i = 0; i < ship.length; i += 1) {
        if (board.board[position + (i * 10)] != null) {
          return false;
        }
      }
    }
    return true;
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

  randomShipPlacement(program.board, program.ships[0]);
  randomShipPlacement(program.board, program.ships[1]);
  randomShipPlacement(program.board, program.ships[2]);
  randomShipPlacement(program.board, program.ships[3]);
  randomShipPlacement(program.board, program.ships[4]);

  const counterAttack = () => {
    let counterAttackPosition = Math.floor(Math.random() * 100);

    while (counterAttacks.includes(counterAttackPosition)) {
      counterAttackPosition = Math.floor(Math.random() * 100);
    }

    counterAttacks.push(counterAttackPosition); // add new position to array

    const attackResult = user.board.receiveAttack(counterAttackPosition);

    if (attackResult === 'hit') {
      // Store the hit position and recursively call counterAttack()
      counterAttacks.push(counterAttackPosition);
      counterAttack();
    }
  };

  const attack = (position) => {
    const attackResult = program.board.receiveAttack(parseInt(position, 10));

    if (attackResult === 'hit') {
      return 'hit';
    } if (attackResult === 'miss') {
      counterAttack();
      return 'miss';
    }

    return null;
  };

  return {
    user, program, checkShipPlacement, winner, attack,
  };
};

export default gameController;
