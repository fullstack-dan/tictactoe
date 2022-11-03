const body = document.querySelector('body');
const newGameButton = document.querySelector('#newGame');


const gameboard = (() => {
    var gameDiv = document.createElement('div');
    gameDiv.id = 'gameboard';
    for(let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell')
        boardCell.id = `cell${i}`;
        gameDiv.appendChild(boardCell);
    }
    var createBoard = () => {
        body.appendChild(gameDiv);
    };
    return {createBoard};
})();

newGameButton.addEventListener('click', () => {
    gameboard.createBoard();
});
