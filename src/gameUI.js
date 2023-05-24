import gameController from './gameController.js'

const gameUI = (currentGame) => {
    let game = currentGame

    const app = document.querySelector('#app')
    app.innerHTML = '';

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');
    app.appendChild(gameContainer);

    function createGameboardContainer(board, className) {
        const gameboardContainer = document.createElement('div');
        gameboardContainer.classList.add('gameboard-container');
        gameboardContainer.classList.add(className);

        const gameboard = document.createElement('div');
        gameboard.classList.add('gameboard');
        gameboardContainer.appendChild(gameboard);

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
        gameContainer.appendChild(programGameboardContainer);

        for (let i = 0; i < programGameboardContainer.children[0].children.length; i++) {
            let cell = programGameboardContainer.children[0].children[i];
            cell.onclick = function() {renderAttack(i)}
        }
        
    }

    function renderUserGameboard() {
        const userGameboardContainer = createGameboardContainer(game.user.board, 'user');
        gameContainer.appendChild(userGameboardContainer);

        for (let i = 0; i < userGameboardContainer.children[0].children.length; i++) {
            let cell = userGameboardContainer.children[0].children[i];
            if (game.user.board.board[i] != null) {
                cell.classList.add('ship');
                if (game.user.board.board[i].hit[0] === i) {
                    cell.classList.add('top');
                }
            }
        }
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
        console.log(game.winner());
        return;
    }

    if (attackedPeg.classList.contains('hit') || attackedPeg.classList.contains('miss')) {
        return;
    }

    game.attack(id);

    updateBoard(game.program.board, 'program');
    if (game.winner() != null) {
        console.log(game.winner());
        return;
    }
    updateBoard(game.user.board, 'user');
    if (game.winner() != null) {
        console.log(game.winner());
        return;
    }
    }

    renderProgramGameboard();
    renderUserGameboard();
}

export default gameUI;