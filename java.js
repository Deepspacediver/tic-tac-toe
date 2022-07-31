console.log("hello world")
let gameStatus;

const Player = (sign) => {
    const playingSign = sign;
    return {
        playingSign,
    }
}

const playerX= Player('Player un')
const playerO = Player('Player do')


const gameBoard = (() => {
    let gameArray = [];

    let whoseTurn ='';
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
    const choosePlayer = () =>{
        const playerButtonContainer = document.querySelector('.player-container')
        playerButtonContainer.addEventListener('click', (e)=>{
            if(e.target.className === "player1") {
                let newPlayer1Name = String(window.prompt('Please input your player name', 'X'))
                console.log(newPlayer1Name)
            }
        })
    }
    const gameBoardEvents = (xSign='X', oSign='O') =>{
        gameTiles.forEach(tile => {
            tile.addEventListener('click', (e)=>{

                let winningState = gameLogic.gameStatus
                console.log(winningState)
                if(!!e.target.innerText || gameLogic.gameStatus === `${xSign}`||
                    gameLogic.gameStatus === `${oSign}`) return
                gameLogic.checkPlayerTurn(playerX.playingSign, playerO.playingSign)
                whoseTurn = gameLogic.playerTurn
                gameLogic.checkForWinner(e.target, playerX.playingSign, playerO.playingSign);
                displayResults(playerX.playingSign, playerO.playingSign)

                
                if(whoseTurn === `${xSign}`) {
                    e.target.innerText =`${whoseTurn}`
                    gameArray[e.target.dataset.index]=`${whoseTurn}`
                }
                else if(whoseTurn === `${oSign}`){
                    e.target.innerText = `${whoseTurn}`
                    gameArray[e.target.dataset.index]=`${whoseTurn}`
                };
            })
        })
    }
    const resultsDisplay = document.querySelector('.results-display')
    const displayResults = (xSign='X', oSign='O') =>{
        let winningState = gameLogic.gameStatus
        
        if(winningState === `${xSign}`) resultsDisplay.innerText = `${xSign} has won`
        else if(winningState ===`${oSign}`) resultsDisplay.innerText = `${oSign} has won`
        return
    }
    
    const resetGame = ()=>{
        const button = document.querySelector('.reset-btn')
        button.addEventListener('click', () =>{
        gameLogic.xIndexArray.length =0;
        gameLogic.oIndexArray.length = 0;
        gameArray.length = 0;
        gameLogic.playerTurn ='';
        gameLogic.gameStatus ='';
        gameBoard.gameTiles.forEach(tile =>{
        tile.innerText =''
        resultsDisplay.innerText =''
            })
        })
    }
    assignIndex()
    choosePlayer()
    gameBoardEvents(playerX.playingSign, playerO.playingSign)
    
    resetGame()
    return{
        gameTiles,
        gameArray,
    }
})();

const gameLogic = (() =>{
    let playerTurn='';
    const checkPlayerTurn = (xSign='X', oSign='O') =>{
        let amountOfX = gameBoard.gameArray.filter(i => i===`${xSign}`).length;
        console.log(amountOfX)
        let amountOfO = gameBoard.gameArray.filter(i => i===`${oSign}`).length;
        if(!gameBoard.gameArray.length === 0 || amountOfX <= amountOfO)  gameLogic.playerTurn = `${xSign}`;
        else if(amountOfX > amountOfO)  gameLogic.playerTurn =`${oSign}`;
    }
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let xIndexArray =[];
    let oIndexArray = []; 
    let gameStatus ='';

    const checkForWinner = (target, xSign=`X`, oSign=`O`) => {
        
       storeInNewArray(gameLogic.playerTurn)
       for (let i = 0; i < winCombinations.length; i++) {
        if(xIndexArray.includes(winCombinations[i][0]) && xIndexArray.includes(winCombinations[i][1])
             && xIndexArray.includes(winCombinations[i][2])) {
                gameLogic.gameStatus =`${xSign}`
                alert(`${xSign} has won`)
            break;
             
        }
           else if(oIndexArray.includes(winCombinations[i][0]) && oIndexArray.includes(winCombinations[i][1])
           && oIndexArray.includes(winCombinations[i][2])) {
            gameLogic.gameStatus =`${oSign}`   
            alert(`${oSign} has won`) 
               
               break;
               
            } 
       }
        function storeInNewArray(playerTurn){       
        if(playerTurn === `${xSign}` || playerTurn ==='') xIndexArray.push(Number(target.dataset.index))
        else if(playerTurn === `${oSign}`) oIndexArray.push(Number(target.dataset.index))  
        }
        
    }

    
    return{
        checkPlayerTurn,
        checkForWinner,
        winCombinations,
        xIndexArray,
        oIndexArray,
        gameStatus,
        playerTurn,
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

