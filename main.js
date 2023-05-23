import './style.css'
import gameController from './src/gameController.js'

const app = document.querySelector('#app')

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
app.appendChild(gameContainer);

function createGameboardContainer(board, className) {
  const gameboardContainer = document.createElement('div');
  gameboardContainer.classList.add('gameboard-container');
  gameboardContainer.classList.add(className);

  for (let i = 0; i < board.board.length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    cell.id = i;
    let peg = document.createElement('div');
    peg.classList.add('peg');
    cell.appendChild(peg);
    gameboardContainer.appendChild(cell);
  }

  return gameboardContainer;
}

function renderProgramGameboard() {
  const programGameboardContainer = createGameboardContainer(game.program.board, 'program');
  gameContainer.appendChild(programGameboardContainer);

  for (let i = 0; i < programGameboardContainer.children.length; i++) {
    let cell = programGameboardContainer.children[i];
    cell.onclick = function() {renderAttack(i)}
  };
}

function renderUserGameboard() {
  const userGameboardContainer = createGameboardContainer(game.user.board, 'user');
  gameContainer.appendChild(userGameboardContainer);

  for (let i = 0; i < userGameboardContainer.children.length; i++) {
    let cell = userGameboardContainer.children[i];
    if (game.user.board.board[i] != null) {
      cell.classList.add('ship');
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
      }
    }
  }
}

function renderAttack(id) {
  let attackedCell = document.getElementById(id);
  let attackedPeg = attackedCell.querySelector('.peg');

  if (attackedPeg.classList.contains('hit') || attackedPeg.classList.contains('miss')) {
    return;
  }

  game.attack(id);

  updateBoard(game.program.board, 'program');
  updateBoard(game.user.board, 'user');
}

let game = gameController();

renderProgramGameboard();
renderUserGameboard();
