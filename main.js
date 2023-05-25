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

const userInputContainer = document.createElement('div');
userInputContainer.classList.add('user-input-container');
app.appendChild(userInputContainer);

const userNameLabel = document.createElement('label');
userNameLabel.classList.add('user-name-label');
userNameLabel.textContent = 'Player Name: ';
userInputContainer.appendChild(userNameLabel);

const userNameInputContainer = document.createElement('div');
userNameInputContainer.classList.add('user-name-input-container');
userInputContainer.appendChild(userNameInputContainer);

const userNameInput = document.createElement('input');
userNameInput.classList.add('user-name-input');
userNameInput.value = 'Player 1';
userNameInputContainer.appendChild(userNameInput);

const startButton = document.createElement('button');
startButton.classList.add('start-button');
startButton.textContent = 'Start';
userNameInputContainer.appendChild(startButton);

startButton.onclick = function() {
  game.user.name = userNameInput.value;
  gameUI(game);
}