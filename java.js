console.log("hello world")

const Player = (sign) => {
    const playingSign = sign;
    return {
        playingSign,
    }
}

const playerX= Player('X')
const playerO = Player('O')


const gameBoard = (() => {
    const gameArray = [];
    const gameTiles = Array.from(document.querySelectorAll('div.game-tile'))
    
    
   

    /* const displayGameBoardArray = () =>{
        for (let i = 0; i < gameArray.length; i++) {
                gameTiles[i].innerText = gameArray[i]
        }
    } */
    const assignIndex = () => {
        for (let i = 0; i < gameTiles.length; i++) {
            gameTiles[i].dataset.index = `${i}`;
            
        }
    }
    const gameBoardEvents = (xSign, oSign) =>{
        gameTiles.forEach(tile => {
            tile.addEventListener('click', (e)=>{
                let playerTurn = gameLogic.checkPlayerTurn()
                if(!!e.target.innerText) return;
                if(playerTurn === 'X') {
                    e.target.innerText =`${playerTurn}`
                    gameBoard.gameArray[e.target.dataset.index]=`${playerTurn}`

                    console.log(gameBoard.gameArray)
                }
                else if(playerTurn === 'O'){
                    e.target.innerText = `${playerTurn}`
                    gameBoard.gameArray[e.target.dataset.index]=`${playerTurn}`
                    console.log(gameBoard.gameArray)
                };
            })
        })
    }
    assignIndex()
    gameBoardEvents()
    return{
        gameTiles,
        gameArray,
    }
})();

const gameLogic = (() =>{
    const checkPlayerTurn = () =>{
        let playerTurn;
        let amountOfX = gameBoard.gameArray.filter(i => i==='X').length;
        let amountOfO = gameBoard.gameArray.filter(i => i==='O').length;
        if(!gameBoard.gameArray || amountOfX <= amountOfO) return playerTurn = 'X';
        else if(amountOfX > amountOfO) return playerTurn ='O';
    }
    return{
        checkPlayerTurn,
    }
})();

/*
 const playGame = (player1, target) =>{
    gameTiles.forEach(tile => {
        tile.addEventListener('click', (e) =>{
            let target = e.target;
            player1.playerMove(player1.playingSign)
        })
    })
    
    if(!gameBoard.length) {
        
    }
}
const playerMove = (sign, target) =>{
        if(!!target.innerText) return;
        target.innerText = sign
        target.dataset.player = `${sign}`
        game.gameBoard.push(sign) 
    }  
     const playerChoice = () =>{
        const playerButtonContainer = document.querySelector('player-container')
        const player1Button = document.querySelector('.player1')
        const player2Button = document.querySelector('.player2')   

        playerButtonContainer.addEventListener('click', ()=>{
            let 
        })
    } 
 */

