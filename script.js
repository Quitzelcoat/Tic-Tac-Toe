// This will create the gameboard.
const Gameboard = (function () {
    let gameboard = ['', '', '', '', '', '', '', '', '',];

    const getGameboard = () => gameboard;

    const resetGameboard = () => {
        gameboard = ['', '', '', '', '', '', '', '', '',];
    }

    const makeMove = (user, symbol) => {
        if(gameboard[user] === '') {
            gameboard[user] = symbol;
            return true;
        };
        return false;
    };

    const winner = () => {
        const winCondition = [
            [0,1,2], [3,4,5], [6,7,8], //rows
            [0,3,6], [1,4,7], [2,5,8], //columns
            [0,4,8], [2,4,6] //Diagonal
        ];

        for(let condition of winCondition) {
            const [a,b,c] = condition;

            if (gameboard[a] !== '' && gameboard[a] === gameboard[b] && 
                gameboard[a] === gameboard[c]) 
            {
                return gameboard[a];
            }
        }
        return null;
    };

    const isBoardFull = () => !gameboard.includes('');

    return {
        getGameboard,
        resetGameboard,
        makeMove,
        winner,
        isBoardFull,
    };
})();

// To display player name and symbols.
const players = function(name, symbol) {
    return {
        name,
        symbol,
    }
};

// This will display the gameboard and the winner or loser.
const displayController = (function() {
    const playerTurn = document.querySelector(".playerTurn");
    const results = document.querySelector('.results');
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const playerOneInput = document.getElementById("playerOne");
    const playerTwoInput = document.getElementById("playerTwo");
    
    const player1 = players(`player 1`, 'X');
    const player2 = players(`player 2`, 'O');
    let currentPlayer = player1;
    
    const updatePlayerName = () => {
        player1.name = playerOneInput.value;
        player2.name = playerTwoInput.value;

        playerOneInput.value = '';
        playerTwoInput.value = '';
    }

    
    startButton.addEventListener("click", () => {
        updatePlayerName();
        render();
    });

    restartButton.addEventListener('click', () => {
        Gameboard.resetGameboard();
        playerTurn.innerHTML = '';
        results.innerHTML = '';
        player1.name = "Player 1";
        player2.name = "Player 2"
        render();
    });

    const switchPlayer = () => {
        if(currentPlayer === player1) {
            currentPlayer = player2;

            playerTurn.innerHTML = `${player2.name}`
        } else {
            currentPlayer = player1;

            playerTurn.innerHTML = `${player1.name}`
        }
    };
    
    const eachClick = () => {
        const eachCell = document.querySelectorAll('.cell');
        eachCell.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                performClick(index)
            });
        });
    };

    const render = () => {
        const gameboard = Gameboard.getGameboard();
        let board = document.getElementById("board");

        if(board) {
            const htmlBoard = gameboard.map((cell) => `<div class='cell'>${cell}</div>`).join('');
            board.innerHTML = htmlBoard;
            eachClick();
        }

    };

    const anounceWinner = (finalWinner) => {
        if(finalWinner) {

            results.innerHTML = `${finalWinner.name} (${finalWinner.symbol}) wins!`;

        } else {
            results.innerHTML = 'Its a Tie!';

        }
    };

    const performClick = (user) => {
        if(Gameboard.makeMove(user, currentPlayer.symbol)) {
            render();

            const finalWinner = Gameboard.winner();

            if(finalWinner) {
                anounceWinner(currentPlayer);
                Gameboard.resetGameboard();
            } else if (Gameboard.isBoardFull()) {
                anounceWinner();
                Gameboard.resetGameboard();
            } else {
                switchPlayer();
            }

        } else {
            playerTurn.innerHTML = "Invalid move. Please try again.";
        }
    };

    render();

    return{
        performClick,
    };
})();