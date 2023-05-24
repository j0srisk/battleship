import gameController from './gameController.js'

const gameUI = (currentGame) => {
    let game = currentGame

    let orientation = 'horizontal';


    const app = document.querySelector('#app')
    app.innerHTML = '';

    const statusText = document.createElement('h2');
    statusText.classList.add('status-text');
    statusText.textContent = 'Place your ships!';
    app.appendChild(statusText);

    
    let playAgainButton = document.createElement('button');
    playAgainButton.classList.add('play-again-button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.onclick = function() {
        const userName = game.user.name;
        game = gameController();
        game.user.name = userName;
        gameUI(game);
    }


    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');
    app.appendChild(gameContainer);

    

    function createGameboardContainer(board, className) {
        const gameboardContainer = document.createElement('div');
        gameboardContainer.classList.add('gameboard-container');
        gameboardContainer.classList.add(className);

        const xCoordinates = document.createElement('div');
        xCoordinates.classList.add('coordinates');
        xCoordinates.classList.add('x');
        for (let i = 1; i < 11; i++) {
            let coordinate = document.createElement('div');
            coordinate.classList.add('coordinate');
            coordinate.textContent = i;
            xCoordinates.appendChild(coordinate);
        }
        
        gameboardContainer.appendChild(xCoordinates);

        const yCoordinates = document.createElement('div');
        yCoordinates.classList.add('coordinates');
        yCoordinates.classList.add('y');
        for (let i = 65; i < 75; i++) {
            let coordinate = document.createElement('div');
            coordinate.classList.add('coordinate');
            coordinate.textContent = String.fromCharCode(i);
            yCoordinates.appendChild(coordinate);
        }

        const horizontalWrapper = document.createElement('div');
        horizontalWrapper.classList.add('horizontal-wrapper');
        horizontalWrapper.appendChild(yCoordinates);

        const gameboard = document.createElement('div');
        gameboard.classList.add('gameboard');
        gameboard.classList.add(className);

        horizontalWrapper.appendChild(gameboard);

        gameboardContainer.appendChild(horizontalWrapper);

        for (let i = 0; i < board.board.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('gameboard-cell');
            cell.id = i;
            let peg = document.createElement('div');
            peg.classList.add('peg');
            cell.appendChild(peg);
            gameboard.appendChild(cell);
        }

        return gameboardContainer;
    }

    function renderProgramGameboard() {
        const programGameboardContainer = createGameboardContainer(game.program.board, 'program');
        //gets the first child of the gameContainer div
        gameContainer.insertBefore(programGameboardContainer, gameContainer.children[0]);

        //selects div with class gameboard and class program
        const programGameboard = document.querySelector('.gameboard.program');

        for (let i = 0; i < programGameboard.children.length; i++) {
            let cell = programGameboardContainer.children[1].children[1].children[i];
            cell.onclick = function() {renderAttack(i)}
        }
        
    }

    function getShipPlacement(ship, board, callback) {
        statusText.textContent = `Place your ${ship.name}!`;
        for (let i = 0; i < board.board.length; i++) {
            let cell = document.getElementById(i);
            cell.onmouseover = function() {
                let selectedId = i;
                let multiplyer = 1;
                //resets all cells to default
                for (let i = 0; i < board.board.length; i++) {
                    let cell = document.getElementById(i);
                    cell.classList.remove('hover');
                    cell.classList.remove('invalid');
                }

                //finds closest valid cell id to selected cell
                if (orientation === 'horizontal') {
                    if (selectedId % 10 + ship.length > 10) {
                        selectedId = selectedId - (selectedId % 10 + ship.length - 10);
                    }
                    multiplyer = 1
                }
                else if (orientation === 'vertical') {
                    if (selectedId + (ship.length - 1) * 10 > 99) {
                        selectedId = (99 - (ship.length - 1) * 10) - (9 - (selectedId % 10));
                    }
                    multiplyer = 10
                }

                //adds hover class to cells that ship will be placed on
                //adds invalid class to cells that ship cannot be placed on
                for (let j = selectedId; j < selectedId + ship.length * multiplyer; j += multiplyer) {
                    let cell = document.getElementById(j);
                    if (game.checkShipPlacement(board, ship, selectedId, orientation) === false) {
                        cell.classList.add('invalid');
                    } else {
                        cell.classList.add('hover');
                    }
                }

                //places the ship on the board when clicked if position is valid
                cell.onclick = function() {
                    if (game.checkShipPlacement(board, ship, selectedId, orientation)) {
                        board.placeShip(ship, selectedId, orientation);
                        for (let i = 0; i < board.board.length; i++) {
                            let cell = document.getElementById(i);
                            //removes hover class from all cells and renders ship on board
                            if (board.board[i] != null) {
                                cell.classList.remove('hover');
                                cell.classList.add('ship');
                            }
                            cell.onmouseover = null;
                            cell.onclick = null;
                        }
                    
                        callback();
                        
                    }
                }
            }
        }
    }
    
    
    function renderUserGameboard() {
        const userGameboardContainer = createGameboardContainer(game.user.board, 'user');
        gameContainer.appendChild(userGameboardContainer);

        placeShips(game.user);
    }
    

    function updateBoard(board, className) {
        for (let i = 0; i < board.board.length; i++) {
            let gameboard = document.querySelector(`.${className}`);
            let cell = gameboard.querySelector(`[id="${i}"]`);
            let peg = cell.querySelector('.peg');
            if (board.board[i] != null) {
                if (board.board[i] === 'miss') {
                    peg.classList.add('miss');
                } else if (board.board[i].hit.includes(i)) {
                    peg.classList.add('hit');
                    if (board.board[i].isSunk()) {
                        cell.classList.add('ship');
                    }
                }
            }
        }
    }

    function renderAttack(id) {
    let attackedCell = document.getElementById(id);
    let attackedPeg = attackedCell.querySelector('.peg');

    if (game.winner() != null) {
        statusText.textContent = 'Game over! ' + game.winner() + ' wins!';
        app.appendChild(playAgainButton);
        return;
    }

    if (attackedPeg.classList.contains('hit') || attackedPeg.classList.contains('miss')) {
        return;
    }

    game.attack(id);

    updateBoard(game.program.board, 'program');
    if (game.winner() != null) {
        statusText.textContent = 'Game over! ' + game.winner() + ' wins!';
        app.appendChild(playAgainButton);
        return;
    }
    updateBoard(game.user.board, 'user');
    if (game.winner() != null) {
        statusText.textContent = 'Game over! ' + game.winner() + ' wins!';
        app.appendChild(playAgainButton);
        return;
    }
    }

    function placeShips(player) {

        const orientationButton = document.createElement('button');
        orientationButton.classList.add('orientation-button');
        orientationButton.textContent = 'Rotate';
        orientationButton.onclick = function() {
            if (orientation === 'horizontal') {
                orientation = 'vertical';
            } else {
                orientation = 'horizontal';
            }
        }

        app.appendChild(orientationButton);

        let shipIndex = 0;
        function placeNextShip() {
            if (shipIndex > player.ships.length - 1) {
                statusText.textContent = 'Time to attack!'
                orientationButton.style.display = 'none';
                renderProgramGameboard();
                return;
            }
            if (shipIndex < player.ships.length) {
                const ship = player.ships[shipIndex];
                if (ship.placed === false) {
                    getShipPlacement(ship, player.board, placeNextShip);
                    shipIndex++;
                } else {
                    placeNextShip(); // Move to the next ship if the current ship is already placed
                }
            }
        }
    
        placeNextShip(); // Start placing the ships

        
    }


    renderUserGameboard();
}

export default gameUI;