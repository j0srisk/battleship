import './style.css'
import gameController from './src/gameController.js'

const app = document.querySelector('#app')

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
app.appendChild(gameContainer);

const player1GameboardContainer = document.createElement('div');
player1GameboardContainer.classList.add('gameboard-container');
player1GameboardContainer.classList.add('player1');
gameContainer.appendChild(player1GameboardContainer);

const player2GameboardContainer = document.createElement('div');
player2GameboardContainer.classList.add('gameboard-container');
player2GameboardContainer.classList.add('player2');
gameContainer.appendChild(player2GameboardContainer);

function renderGameboard() {
  let player2gameBoard = game.player2.board;
  for (let i = 0; i < player2gameBoard.board.length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    // rendering ships
    // if (player2gameBoard.board[i] != null) {
    //   cell.classList.add('ship');
    // }
    cell.id = i;
    let peg = document.createElement('div');
    peg.classList.add('peg');
    cell.appendChild(peg);
    player2GameboardContainer.appendChild(cell);
    cell.onclick = function() {renderAttack(i)};
  };
}

function renderAttack(id) {
  let attackedCell = document.getElementById(id);
  let attackedPeg = attackedCell.querySelector('.peg');
  if(game.attack(id) === 'hit') {
    attackedPeg.classList.add('hit');
  } else {
    attackedPeg.classList.add('miss');
  }

  if (game.player2.board.allSunk()) {
    alert('Player 1 wins!');
  }
}

let game = gameController();

renderGameboard();