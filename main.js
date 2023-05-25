import './style.css'
import gameController from './src/gameController';
import gameUI from './src/gameUI'

let game = gameController();

const startButton = document.querySelector('.user-name-submit');
const userNameInput = document.querySelector('.user-name-input');

startButton.onclick = function() {
  game.user.name = userNameInput.value;
  gameUI(game);
}