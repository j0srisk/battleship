const gameboardFactory = () => {
  const board = Array(100).fill(null);

  const placeShip = (ship, position, direction) => {
    const currentShip = ship;
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i += 1) {
        board[position + i] = ship;
        currentShip.placed = true;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i += 1) {
        board[position + i * 10] = ship;
        currentShip.placed = true;
      }
    }
  };

  const receiveAttack = (position) => {
    if (board[position] !== null) {
      board[position].hitShip(position);
      return 'hit';
    }
    board[position] = 'miss';
    return 'miss';
  };

  const allSunk = () => {
    let isAllSunk = true;
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] !== null && board[i] !== 'miss' && !board[i].isSunk()) {
        isAllSunk = false;
      }
    }
    return isAllSunk;
  };

  return {
    board, placeShip, receiveAttack, allSunk,
  };
};

export default gameboardFactory;
