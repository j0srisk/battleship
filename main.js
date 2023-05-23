import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  const dot = document.createElement('div');
  cell.classList.add('gameboard-cell');
  cell.appendChild(dot);
  dot.classList.add('dot');
  cell.id = i;
  cell.addEventListener('click', () => {
    dot.classList.remove('dot');
    dot.classList.add('hit');
  });
  player1GameboardContainer.appendChild(cell);
  player2GameboardContainer.appendChild(cell.cloneNode(true));
}
