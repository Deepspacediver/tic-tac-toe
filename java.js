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

                let winningState = gameLogic.gameStatus
                console.log(winningState)
                if(!!e.target.innerText || gameLogic.gameStatus === 'done') return
                gameLogic.checkPlayerTurn()
                let playerTurn = gameLogic.playerTurn
                gameLogic.checkForWinner(e.target, playerTurn);
                
                
                if(playerTurn === 'X') {
                    e.target.innerText =`${playerTurn}`
                    gameArray[e.target.dataset.index]=`${playerTurn}`
                }
                else if(playerTurn === 'O'){
                    e.target.innerText = `${playerTurn}`
                    gameArray[e.target.dataset.index]=`${playerTurn}`
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
    let playerTurn='';
    const checkPlayerTurn = () =>{
        let amountOfX = gameBoard.gameArray.filter(i => i==='X').length;
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
                gameLogic.gameStatus ='done'
                alert('X has won')
            break;
             
        }
           else if(oIndexArray.includes(winCombinations[i][0]) && oIndexArray.includes(winCombinations[i][1])
           && oIndexArray.includes(winCombinations[i][2])) {
            gameLogic.gameStatus ='done'   
            alert('O has won') 
               
               break;
               
            } 
       }
        function storeInNewArray(){       
        if(playerTurn === 'X') xIndexArray.push(Number(target.dataset.index))
        else if(playerTurn === 'O') oIndexArray.push(Number(target.dataset.index))  
        }
        
    }

    const resetGame = ()=>{
        xIndexArray =[];
        oIndexArray = [];
    }
    return{
        checkPlayerTurn,
        checkForWinner,
        winCombinations,
        xIndexArray,
        oIndexArray,
        gameStatus,
        playerTurn
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

