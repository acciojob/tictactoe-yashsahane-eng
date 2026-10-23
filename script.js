//your JS code here. If required.
const container = document.querySelector(".container");

const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const name1 = player1Input.value.trim();
    const name2 = player2Input.value.trim();

    if (!name1 || !name2) {
        alert("Please enter both player names.");
        return;
    }

    players = [
        { name: name1, symbol: "x" },
        { name: name2, symbol: "o" }
    ];

    currentPlayer = 0;
    board = Array(9).fill("");
    gameOver = false;

    showBoard();
});

function showBoard() {
    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${players[currentPlayer].name}, you're up</div>
        <div class="board">
            ${Array.from({ length: 9 }, (_, i) =>
                `<div class="cell" id="${i + 1}" data-index="${i}"></div>`
            ).join("")}
        </div>
    `;

    const cells = container.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", handleMove);
    });
}

function handleMove(event) {
    if (gameOver) return;

    const cell = event.currentTarget;
    const index = Number(cell.dataset.index);

    if (board[index] !== "") return;

    const player = players[currentPlayer];

    board[index] = player.symbol;
    cell.textContent = player.symbol;

    if (hasWon(player.symbol)) {
        container.querySelector(".message").textContent =
            `${player.name}, congratulations you won!`;
        gameOver = true;
        return;
    }

    if (board.every(value => value !== "")) {
        container.querySelector(".message").textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = 1 - currentPlayer;

    container.querySelector(".message").textContent =
        `${players[currentPlayer].name}, you're up`;
}

function hasWon(symbol) {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === symbol)
    );
}