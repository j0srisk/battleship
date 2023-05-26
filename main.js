import './style.css';
import gameController from './src/gameController';
import gameUI from './src/gameUI';

const game = gameController();

const startButton = document.querySelector('.user-name-submit');
const userNameInput = document.querySelector('.user-name-input');

startButton.onclick = function startGame() {
  game.user.name = userNameInput.value;
  gameUI(game);
};
