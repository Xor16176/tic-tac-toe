const cells = document.querySelectorAll('.cell');
const turnElement = document.getElementById('turn');
const resultElement = document.getElementById('result');

let turn = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        makeMove(row, col);
    });
});

function makeMove(row, col) {
    if (board[row][col] !== '') {
        return;
    }
    board[row][col] = turn;
    turnElement.textContent = `Turn: ${turn === 'X' ? 'O' : 'X'}`;
    turn = turn === 'X' ? 'O' : 'X';
    updateBoard();
    checkWin();
    sendMoveToServer(row, col);
}

function updateBoard() {
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
    });
}

function checkWin() {
    const winner = getWinner();
    if (winner) {
        resultElement.textContent = `Winner: ${winner}`;
        disableBoard();
    } else if (isDraw()) {
        resultElement.textContent = 'Draw!';
        disableBoard();
    }
}

function getWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return board[i][0];
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return board[0][i];
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return board[0][2];
    }
    return null;
}

function isDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function disableBoard() {
    cells.forEach((cell) => {
        cell.removeEventListener('click', () => {});
    });
}

function sendMoveToServer(row, col) {
    fetch('/move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `row=${row}&col=${col}`
    })
    .then((response) => response.text())
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });
}