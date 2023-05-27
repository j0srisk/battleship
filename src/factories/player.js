import shipFactory from './ship';
import gameboardFactory from './gameboard';

const playerFactory = (playerId, playerName) => {
  const id = playerId;
  const name = playerName;
  const board = gameboardFactory();
  const ships = [
    shipFactory(5, 'Carrier'),
    shipFactory(4, 'Battleship'),
    shipFactory(3, 'Destroyer'),
    shipFactory(3, 'Submarine'),
    shipFactory(2, 'Patrol Boat'),
  ];

  const attacks = [];

  return {
    id, name, board, ships, attacks,
  };
};

export default playerFactory;
