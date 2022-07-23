console.log("hello world")

const game = (() => {
    const gameBoard = ['x', 'o', 'x',];
    const gameTiles = Array.from(document.querySelectorAll('div.game-tile'))

    const displayGameBoardArray = () =>{
        for (let i = 0; i < gameBoard.length; i++) {
                gameTiles[i].innerText = gameBoard[i]
        }
    }
    
    
    displayGameBoardArray()
    return{
        gameTiles,
        gameBoard,
    }
})();

const Player = (sign) => {
    const playingSign = sign;
    const playerMove = (sign) =>{
        game.gameTiles.forEach(tile => {
            tile.addEventListener('click', (e) => {
                e.target.innerText = sign
                e.target.dataset.player = `${sign}`
                game.gameBoard.push(sign)
            })
            
        })
    }

    playerMove(playingSign)
    return {
        playingSign
    }
}

const player1 = Player('x')