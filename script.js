const body = document.querySelector('body');
const newGameButton = document.querySelector('#newGame');
const cells = [];

const playerSwitches = document.createElement('div');
playerSwitches.id = 'playerSwitches';
const p1Switch = document.createElement('div');
p1Switch.id = 'p1';
p1Switch.classList.add('currentPlayer');
p1Switch.textContent = ('Player 1');
const p2Switch = document.createElement('div');
p2Switch.id = 'p2';
p2Switch.textContent = ('Player 2');
playerSwitches.appendChild(p1Switch);
playerSwitches.appendChild(p2Switch);

active = false;

const Player = (token) => {
    let thistoken = token;
    let cellsHeld = [];

    const captureCell = (cell) => {
        cellsHeld.push(cell.dataset.cellid);
    }
    const checkWin = () => {
        let win = false;
        if ((cellsHeld.includes('0') && cellsHeld.includes('1') && cellsHeld.includes('2')) ||
            (cellsHeld.includes('3') && cellsHeld.includes('4') && cellsHeld.includes('5')) ||
            (cellsHeld.includes('6') && cellsHeld.includes('7') && cellsHeld.includes('8')) ||
            (cellsHeld.includes('0') && cellsHeld.includes('3') && cellsHeld.includes('6')) ||
            (cellsHeld.includes('1') && cellsHeld.includes('4') && cellsHeld.includes('7')) ||
            (cellsHeld.includes('2') && cellsHeld.includes('5') && cellsHeld.includes('8')) ||
            (cellsHeld.includes('0') && cellsHeld.includes('4') && cellsHeld.includes('8')) ||
            (cellsHeld.includes('2') && cellsHeld.includes('4') && cellsHeld.includes('6'))) {
            win = true;
        }
        if (win) {
            winGame(thistoken);
            return true;
        } else return false;
    }
    return {
        captureCell,
        checkWin
    }
}

var player1 = true; //false if player 2 is playing

const gameboard = (() => {
    let gameboard = document.createElement('div');
    gameboard.id = 'gameboard';
    for (let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell')
        boardCell.id = `cell${i}`;
        boardCell.dataset.cellid = i;
        gameboard.appendChild(boardCell);
        cells.push(boardCell);
    }
    let createBoard = () => {
        cells.forEach(cell => {
            cell.textContent = 'X'
        });
        body.appendChild(gameboard);
        body.appendChild(playerSwitches);
    };
    return {
        createBoard,
    };
})();

newGameButton.addEventListener('click', () => {
    if (active) {
        location.reload();
    }
    gameboard.createBoard();
    p1 = Player('X');
    p2 = Player('O')
    playGame(p1, p2);
    active = true;
});

function playGame(p1, p2) {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (player1) {
                cell.classList.add('p1cell');
                p1.captureCell(cell);
                player1 = !player1;
                for (let cell of cells) {
                    if (!cell.classList.contains('p1cell')) {
                        cell.textContent = 'O';
                    }
                }
                p1Switch.classList.remove('currentPlayer');
                p2Switch.classList.add('currentPlayer');
                if (p1.checkWin()) {
                    for (let cell of cells) {
                        if (cell.classList.contains('p1cell')) cell.classList.add('winner');
                        p2Switch.classList.remove('currentPlayer');
                        p1Switch.classList.add('winner');
                    }
                }
            } else {
                cell.classList.add('p2cell');
                p2.captureCell(cell);
                player1 = !player1;
                for (let cell of cells) {
                    if (!cell.classList.contains('p2cell')) {
                        cell.textContent = 'X';
                    }
                }
                p2Switch.classList.remove('currentPlayer');
                p1Switch.classList.add('currentPlayer');
                if (p2.checkWin()) {
                    for (let cell of cells) {
                        if (cell.classList.contains('p2cell')) cell.classList.add('winner');
                        p1Switch.classList.remove('currentPlayer');
                        p2Switch.classList.add('winner');
                    }
                }
            }
        })
    })
}

function winGame(player) {
    for (let cell of cells) {
        cell.style.cssText += 'pointer-events: none;'
    }
    if (player == 'X') {
        alert('Player 1 has won!');
    } else {
        alert('Player 2 has won!');
    }
}