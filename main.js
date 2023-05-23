import './style.css'
import gameController from './src/gameController.js'

const app = document.querySelector('#app')

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
app.appendChild(gameContainer);

//pretty much duplicated from renderUserGameboard
//refactor later
function renderProgramGameboard() {
  const programGameboardContainer = document.createElement('div');
  programGameboardContainer.classList.add('gameboard-container');
  programGameboardContainer.classList.add('program');
  gameContainer.appendChild(programGameboardContainer);

  let programGameboard = game.program.board;
  for (let i = 0; i < programGameboard.board.length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    cell.id = i;
    let peg = document.createElement('div');
    peg.classList.add('peg');
    cell.appendChild(peg);
    programGameboardContainer.appendChild(cell);

    cell.onclick = function() {renderAttack(i)}
  };
}


function renderUserGameboard() {
  const userGameboardContainer = document.createElement('div');
  userGameboardContainer.classList.add('gameboard-container');
  userGameboardContainer.classList.add('user');
  gameContainer.appendChild(userGameboardContainer);

  let userGameboard = game.user.board;
  for (let i = 0; i < userGameboard.board.length; i++) {
    let cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    //rendering ships
    if (userGameboard.board[i] != null) {
      cell.classList.add('ship');
    }
    cell.id = i;
    let peg = document.createElement('div');
    peg.classList.add('peg');
    cell.appendChild(peg);
    userGameboardContainer.appendChild(cell);
  }
} 

function renderAttack(id) {
  let attackedCell = document.getElementById(id);
  let attackedPeg = attackedCell.querySelector('.peg');

  //checks if the cell has already been attacked
  if (attackedPeg.classList.contains('hit') || attackedPeg.classList.contains('miss')) {
    return;
  //attacks the cell if not already attacked
  } else {
    let attackResult = game.attack(id);
    if(attackResult === 'hit') {
      attackedPeg.classList.add('hit');
    } else if (attackResult === 'miss') {
      attackedPeg.classList.add('miss');
    }
  }

  for (let i = 0; i < game.user.board.board.length; i++) {
    const userGameboard = document.querySelector('.user');
    const cell = userGameboard.querySelector(`[id="${i}"]`);
    const peg = cell.querySelector('.peg');
    if (game.user.board.board[i] != null) {
      if (game.user.board.board[i] === 'miss') {
        peg.classList.add('miss');
      } else if (game.user.board.board[i].hit.includes(i)) {
        peg.classList.add('hit');
      }
    } 
  }
}

let game = gameController();

renderProgramGameboard();
renderUserGameboard();
