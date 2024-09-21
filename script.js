// Global variables
const gameContainer = document.getElementById('game-container');

// Event listeners for buttons
document.getElementById('tictactoe-btn').addEventListener('click', loadTicTacToe);
document.getElementById('rock-paper-scissors-btn').addEventListener('click', loadRockPaperScissors);
document.getElementById('memory-game-btn').addEventListener('click', loadMemoryGame);
document.getElementById('random-game-btn').addEventListener('click', loadRandomGame);

// Load Tic Tac Toe
function loadTicTacToe() {
    gameContainer.innerHTML = `
        <h2>Tic Tac Toe</h2>
        <div class="game-board">
            <div class="square" data-index="0"></div>
            <div class="square" data-index="1"></div>
            <div class="square" data-index="2"></div>
            <div class="square" data-index="3"></div>
            <div class="square" data-index="4"></div>
            <div class="square" data-index="5"></div>
            <div class="square" data-index="6"></div>
            <div class="square" data-index="7"></div>
            <div class="square" data-index="8"></div>
        </div>
        <div id="message"></div>
        <button id="restart-tic-tac-toe">Restart Game</button>
    `;
    initTicTacToe();
}

function initTicTacToe() {
    const squares = document.querySelectorAll('.square');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill('');

    function handleSquareClick(e) {
        const index = e.target.getAttribute('data-index');

        if (boardState[index] !== '' || !gameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        e.target.innerText = currentPlayer;
        checkResult();
    }

    function checkResult() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        let roundWon = false;

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes('')) {
            document.getElementById('message').innerText = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    squares.forEach(square => square.addEventListener('click', handleSquareClick));
    document.getElementById('restart-tic-tac-toe').addEventListener('click', loadTicTacToe);
}

// Load Rock Paper Scissors
function loadRockPaperScissors() {
    gameContainer.innerHTML = `
        <h2>Rock Paper Scissors</h2>
        <button class="rps-btn" data-choice="rock">Rock</button>
        <button class="rps-btn" data-choice="paper">Paper</button>
        <button class="rps-btn" data-choice="scissors">Scissors</button>
        <div id="rps-result"></div>
    `;
    initRockPaperScissors();
}

function initRockPaperScissors() {
    const choices = ['rock', 'paper', 'scissors'];

    document.querySelectorAll('.rps-btn').forEach(button => {
        button.addEventListener('click', function() {
            const playerChoice = this.getAttribute('data-choice');
            const aiChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = determineRPSWinner(playerChoice, aiChoice);
            document.getElementById('rps-result').innerText = `You chose ${playerChoice}. AI chose ${aiChoice}. ${result}`;
        });
    });

    function determineRPSWinner(player, ai) {
        if (player === ai) return "It's a draw!";
        if ((player === 'rock' && ai === 'scissors') ||
            (player === 'paper' && ai === 'rock') ||
            (player === 'scissors' && ai === 'paper')) {
            return "You win!";
        } else {
            return "AI wins!";
        }
    }
}

// Load Memory Game
function loadMemoryGame() {
    gameContainer.innerHTML = `
        <h2>Memory Card Game</h2>
        <div id="memory-grid"></div>
    `;
    initMemoryGame();
}

function initMemoryGame() {
    const memoryGrid = document.getElementById('memory-grid');
    const cards = ['A', 'B', 'C', 'A', 'B', 'C'].sort(() => 0.5 - Math.random());
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    cards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.card = cardValue;
        card.innerText = "?";
        card.addEventListener('click', () => flipCard(card));
        memoryGrid.appendChild(card);
    });

    function flipCard(card) {
        if (lockBoard || card === firstCard) return;

        card.innerText = card.dataset.card;

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        if (firstCard.dataset.card === secondCard.dataset.card) {
            resetCards(true);
        } else {
            setTimeout(() => resetCards(false), 1000);
        }
    }

    function resetCards(isMatch) {
        if (isMatch) {
            firstCard.removeEventListener('click', () => flipCard(firstCard));
            secondCard.removeEventListener('click', () => flipCard(secondCard));
        } else {
            firstCard.innerText = '?';
            secondCard.innerText = '?';
        }

        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }
}

// Load a Random Game
function loadRandomGame() {
    const games = [loadTicTacToe, loadRockPaperScissors, loadMemoryGame];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    randomGame();
}
