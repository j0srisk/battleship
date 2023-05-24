import './style.css'
import gameController from './src/gameController';
import gameUI from './src/gameUI'

let game = gameController();

const app = document.querySelector('#app')
app.innerHTML = '';

const gameTitle = document.createElement('h1');
gameTitle.classList.add('game-title');
gameTitle.textContent = 'Battleship';
app.appendChild(gameTitle);

const userNameLabel = document.createElement('label');
userNameLabel.classList.add('user-name-label');
userNameLabel.textContent = 'Player Name: ';
app.appendChild(userNameLabel);

const userNameInput = document.createElement('input');
userNameInput.classList.add('user-name-input');
userNameInput.value = 'Player 1';
app.appendChild(userNameInput);

const startButton = document.createElement('button');
startButton.classList.add('start-button');
startButton.textContent = 'Start';
app.appendChild(startButton);

startButton.onclick = function() {
  game.user.name = userNameInput.value;
  gameUI(game);
}