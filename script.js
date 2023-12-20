/*
1. Create a Gameboard IIFE Factory.(Done)
    Inside create an array to save the gameboard.(Done)
    Create a gameboard.(Done)

    [6,7,8]
    [3,4,5]
    [0,1,2]

*/

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

const players = function(name, symbol) {
    return {
        name,
        symbol,
    }
};

const displayController = (function() {
    const player1 = players('player1', 'X');
    const player2 = players('player2', 'O');

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const render = () => {
        const gameboard = Gameboard.getGameboard();

        console.log(gameboard);
    }

    const anounceWinner = (finalWinner) => {
        if(finalWinner) {
            console.log(`player ${finalWinner.name} (${finalWinner.symbol}) wins!`);
        } else {
            console.log("Its a Tie!");
        }
    }

    const click = (user) => {
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
            console.log("Invalid move. Please try again.");
        }
    };

    render();

    return{
        click,
    };

    
})();
displayController.click(0);
displayController.click(3);
displayController.click(2);
displayController.click(4);
displayController.click(7);
displayController.click(5);