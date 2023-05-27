const gameUI = (currentGame) => {
  const game = currentGame;

  let orientation = 'horizontal';

  const app = document.querySelector('#app');
  app.innerHTML = '';

  const gameTitle = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.classList.add('main');
  gameTitle.textContent = 'Battleship';
  app.appendChild(gameTitle);

  const statusContainer = document.createElement('div');
  statusContainer.classList.add('status-container');
  app.appendChild(statusContainer);

  const targetText = document.createElement('h2');
  targetText.classList.add('target-text');

  const statusText = document.createElement('h2');
  statusText.classList.add('status-text');
  statusContainer.appendChild(statusText);

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  app.appendChild(gameContainer);

  function createGameboardContainer(player) {
    const gameboardContainer = document.createElement('div');
    gameboardContainer.classList.add('gameboard-container');
    gameboardContainer.classList.add(player.id);

    // create coordinates
    const xCoordinates = document.createElement('div');
    xCoordinates.classList.add('coordinates');
    xCoordinates.classList.add('x');
    for (let i = 1; i < 11; i += 1) {
      const coordinate = document.createElement('div');
      coordinate.classList.add('coordinate');
      coordinate.textContent = i;
      xCoordinates.appendChild(coordinate);
    }
    gameboardContainer.appendChild(xCoordinates);
    const yCoordinates = document.createElement('div');
    yCoordinates.classList.add('coordinates');
    yCoordinates.classList.add('y');
    for (let i = 65; i < 75; i += 1) {
      const coordinate = document.createElement('div');
      coordinate.classList.add('coordinate');
      coordinate.textContent = String.fromCharCode(i);
      yCoordinates.appendChild(coordinate);
    }
    const horizontalWrapper = document.createElement('div');
    horizontalWrapper.classList.add('horizontal-wrapper');
    horizontalWrapper.appendChild(yCoordinates);

    // creates gameboard
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');
    gameboard.classList.add(player.id);
    gameboard.addEventListener('mouseout', () => {
      targetText.textContent = 'Target: OUT OF RANGE';
    });
    horizontalWrapper.appendChild(gameboard);
    gameboardContainer.appendChild(horizontalWrapper);
    for (let i = 0; i < player.board.board.length; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('gameboard-cell');
      cell.id = i;
      const peg = document.createElement('div');
      peg.classList.add('peg');
      cell.appendChild(peg);
      gameboard.appendChild(cell);
    }

    return gameboardContainer;
  }

  function renderPegs(player) {
    for (let i = 0; i < 100; i += 1) {
      const gameboard = document.querySelector(`.${player.id}`);
      const cell = gameboard.querySelector(`[id="${i}"]`);
      const peg = cell.querySelector('.peg');
      if (player.board.board[i] != null) {
        if (player.board.board[i] === 'miss') {
          peg.classList.add('miss');
        } else if (player.board.board[i].hit.includes(i)) {
          peg.classList.add('hit');
          if (player.board.board[i].isSunk()) {
            cell.classList.add('ship');
            cell.classList.add('sunk');
          }
        }
      }

      if (game.winner() != null) {
        statusText.textContent = `Game Over! ${game.winner()} wins!`;
      }
    }
  }

  function mouseOverHandler(hoveredCell) {
    return function displayCoordinates() {
      const letter = String.fromCharCode(65 + (hoveredCell.id / 10));
      const number = (Math.floor(hoveredCell.id % 10) + 1);
      targetText.textContent = `Target: ${letter}${number}`;
    };
  }

  function clickHandler(clickedCell) {
    return function handleAttackClick() {
      const programGameboard = document.querySelector('.gameboard.program');
      // stops the player from attacking if the game is over
      if (game.winner() != null) {
        clickedCell.removeEventListener('click', clickHandler);
      } else if (!clickedCell.classList.contains('hit') && !clickedCell.classList.contains('miss')) {
        const attackStatus = game.attack(clickedCell.id);
        statusText.textContent = 'Attacking...';
        clickedCell.classList.add('firing');

        programGameboard.querySelectorAll('.gameboard-cell').forEach((cell) => {
          const currentCell = cell;
          currentCell.onclick = null;
        });

        setTimeout(() => {
          if (attackStatus === 'miss') {
            statusText.textContent = 'Miss! Counterattack launched!';
          } else if (attackStatus === 'hit') {
            statusText.textContent = 'Hit! Fire again!';
          }
          clickedCell.classList.remove('firing');
          clickedCell.classList.remove('targeted');
          renderPegs(game.program);
          renderPegs(game.user);

          programGameboard.querySelectorAll('.gameboard-cell').forEach((cell) => {
            const currentCell = cell;
            currentCell.onclick = clickHandler(cell);
          });
        }, 1000);
      }
    };
  }

  function getShipPlacement(ship, board, callback) {
    statusText.textContent = `Place your ${ship.name}!`;
    const userGameboard = document.querySelector('.gameboard.user');
    for (let i = 0; i < board.board.length; i += 1) {
      userGameboard.onmouseleave = function removeClasses() {
        for (let j = 0; j < board.board.length; j += 1) {
          const cell = userGameboard.children[j];
          cell.classList.remove('hover');
          cell.classList.remove('invalid');
        }
      };
      // let cell = document.getElementById(i);
      const cell = userGameboard.children[i];
      cell.onmouseover = function resetAllCellClasses() {
        let selectedId = i;
        let multiplyer = 1;
        // resets all cells to default
        for (let i = 0; i < board.board.length; i++) {
          const cell = userGameboard.children[i];
          cell.classList.remove('hover');
          cell.classList.remove('invalid');
        }

        // finds closest valid cell id to selected cell
        if (orientation === 'horizontal') {
          if (selectedId % 10 + ship.length > 10) {
            selectedId -= (selectedId % 10 + ship.length - 10);
          }
          multiplyer = 1;
        } else if (orientation === 'vertical') {
          if (selectedId + (ship.length - 1) * 10 > 99) {
            selectedId = (99 - (ship.length - 1) * 10) - (9 - (selectedId % 10));
          }
          multiplyer = 10;
        }

        // adds hover class to cells that ship will be placed on
        // adds invalid class to cells that ship cannot be placed on
        for (let j = selectedId; j < selectedId + ship.length * multiplyer; j += multiplyer) {
          // gets cell from user gameboard
          const cell = userGameboard.children[j];
          if (game.checkShipPlacement(board, ship, selectedId, orientation) === false) {
            cell.classList.add('invalid');
          } else {
            cell.classList.add('hover');
          }
        }

        // places the ship on the board when clicked if position is valid
        cell.onclick = function () {
          if (game.checkShipPlacement(board, ship, selectedId, orientation)) {
            board.placeShip(ship, selectedId, orientation);
            for (let i = 0; i < board.board.length; i++) {
              const cell = userGameboard.children[i];
              // removes hover class from all cells and renders ship on board
              if (board.board[i] != null) {
                console.log(board.board[i]);
                cell.classList.remove('hover');
                cell.classList.add('ship');
              }
              cell.onmouseover = null;
              cell.onclick = null;
            }

            callback();
          }
        };
      };
    }
  }

  function placeShips(player) {
    const orientationButton = document.createElement('button');
    orientationButton.classList.add('orientation-button');
    orientationButton.textContent = 'Rotate';
    orientationButton.onclick = function changeOrientation() {
      if (orientation === 'horizontal') {
        orientation = 'vertical';
      } else {
        orientation = 'horizontal';
      }
    };

    statusContainer.appendChild(orientationButton);

    let shipIndex = 0;
    function placeNextShip() {
      if (shipIndex > player.ships.length - 1) {
        statusText.textContent = 'Time to attack!';
        orientationButton.style.display = 'none';
        const programGameboardContainer = document.querySelector('.gameboard-container.program');
        programGameboardContainer.style.display = 'block';
        statusContainer.appendChild(targetText);
        return;
      }
      if (shipIndex < player.ships.length) {
        const ship = player.ships[shipIndex];
        if (ship.placed === false) {
          statusText.textContent = `Place your ${ship.name}!`;
          getShipPlacement(ship, player.board, placeNextShip);
          shipIndex += 1;
        } else {
          placeNextShip(); // Move to the next ship if the current ship is already placed
        }
      }
    }

    placeNextShip(); // Start placing the ships
  }

  function renderGameboards() {
    const userGameboardContainer = createGameboardContainer(game.user);
    gameContainer.insertBefore(userGameboardContainer, gameContainer.children[0]);

    // checks if ships have been placed
    if (game.user.ships[0].placed === false) {
      placeShips(game.user);
    }

    const programGameboardContainer = createGameboardContainer(game.program);
    gameContainer.insertBefore(programGameboardContainer, gameContainer.children[0]);
    programGameboardContainer.style.display = 'none';

    for (let i = 0; i < 100; i += 1) {
      // adds event listener to each cell on the defending player's gameboard
      let cell = programGameboardContainer.children[1].children[1].children[i];
      const targetedCell = cell;
      // let targetedPeg = targetedCell.querySelector('.peg');
      cell.onclick = clickHandler(targetedCell);
      cell.onmouseover = mouseOverHandler(targetedCell);

      // shows ships to the defending player's gameboard for testing
      if (game.program.board.board[i] != null || game.program.board.board[i] === 'miss') {
        cell.classList.add('ship');
      }

      // shows ships to the attacking player's gameboard
      cell = userGameboardContainer.children[1].children[1].children[i];
      if (game.user.board.board[i] != null || game.user.board.board[i] === 'miss') {
        cell.classList.add('ship');
      }
    }
  }

  renderGameboards();
};

export default gameUI;
