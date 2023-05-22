const gameboardFactory = () => {
    let board = Array(100).fill(null);

    const placeShip = (ship, position, direction) => {
        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                board[position + i] = ship;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                board[position + i * 10] = ship;
            }
        }
    };

    const receiveAttack = (position) => {
        if (board[position] !== null) {
            board[position].hitShip(position);
        } else {
            board[position] = 'miss';
        }
    };

    const allSunk = () => {
        let allSunk = true;
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== null && board[i] !== 'miss' && !board[i].isSunk()) {
                allSunk = false;
            }
        }
        return allSunk;
    };

    return { board, placeShip, receiveAttack, allSunk };
};

export default gameboardFactory;
