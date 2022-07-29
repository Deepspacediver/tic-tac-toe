console.log("hello world")
let gameStatus;

const Player = (sign) => {
    const playingSign = sign;
    return {
        playingSign,
    }
}

const playerX= Player('X')
const playerO = Player('O')


const gameBoard = (() => {
    let gameArray = [];

    let whoseTurn ='xd';
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

                let winningState = gameLogic.gameStatus
                console.log(winningState)
                if(!!e.target.innerText || gameLogic.gameStatus === 'X' ||gameLogic.gameStatus === 'O') return
                gameLogic.checkPlayerTurn()
                whoseTurn = gameLogic.playerTurn
                gameLogic.checkForWinner(e.target, whoseTurn);
                displayResults()

                
                if(whoseTurn === 'X') {
                    e.target.innerText =`${whoseTurn}`
                    gameArray[e.target.dataset.index]=`${whoseTurn}`
                }
                else if(whoseTurn === 'O'){
                    e.target.innerText = `${whoseTurn}`
                    gameArray[e.target.dataset.index]=`${whoseTurn}`
                };
            })
        })
    }
    const resultsDisplay = document.querySelector('.results-display')
    const displayResults = () =>{
        let winningState = gameLogic.gameStatus
        
        if(winningState === 'X') resultsDisplay.innerText = 'X has won'
        else if(winningState ==='O') resultsDisplay.innerText = 'O has won'
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
    gameBoardEvents()
    
    resetGame()
    return{
        gameTiles,
        gameArray,
    }
})();

const gameLogic = (() =>{
    let playerTurn='';
    const checkPlayerTurn = () =>{
        let amountOfX = gameBoard.gameArray.filter(i => i==='X').length;
        console.log(amountOfX)
        let amountOfO = gameBoard.gameArray.filter(i => i==='O').length;
        if(!gameBoard.gameArray.length === 0 || amountOfX <= amountOfO)  gameLogic.playerTurn = 'X';
        else if(amountOfX > amountOfO)  gameLogic.playerTurn ='O';
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

    const checkForWinner = (target, playerTurn) => {
        
       storeInNewArray()
       for (let i = 0; i < winCombinations.length; i++) {
        if(xIndexArray.includes(winCombinations[i][0]) && xIndexArray.includes(winCombinations[i][1])
             && xIndexArray.includes(winCombinations[i][2])) {
                gameLogic.gameStatus ='X'
                alert('X has won')
            break;
             
        }
           else if(oIndexArray.includes(winCombinations[i][0]) && oIndexArray.includes(winCombinations[i][1])
           && oIndexArray.includes(winCombinations[i][2])) {
            gameLogic.gameStatus ='O'   
            alert('O has won') 
               
               break;
               
            } 
       }
        function storeInNewArray(){       
        if(playerTurn === 'X' || playerTurn ==='') xIndexArray.push(Number(target.dataset.index))
        else if(playerTurn === 'O') oIndexArray.push(Number(target.dataset.index))  
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

