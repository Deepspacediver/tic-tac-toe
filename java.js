const Player = (sign) => {
    const playingSign = sign;
    return {
        playingSign,
    }
}

let playerX;
let playerO;


const gameBoard = (() => {
    let gameArray = [];
    const gameTiles = Array.from(document.querySelectorAll('div.game-tile'))
   
    const assignIndex = () => {
        for (let i = 0; i < gameTiles.length; i++) {
            gameTiles[i].dataset.index = `${i}`;
            
        }
    }

    const choosePlayer = () =>{
                let newPlayer1Name = String(window.prompt('Please input your player1 name', 'X'))
                playerX = Player(newPlayer1Name="X")
                let newPlayer2Name = String(window.prompt('Please input your player2 name', 'O'))
                playerO = Player(newPlayer2Name='O')
                
    }

    const gameBoardEvents = (xSign='X', oSign='O') =>{
        gameTiles.forEach(tile => {
            tile.addEventListener('click', (e)=>{

                let winningState = gameLogic.gameStatus
                
                if(!!e.target.innerText || gameLogic.gameStatus === `${xSign}`||
                    gameLogic.gameStatus === `${oSign}`) return
                
                gameLogic.checkPlayerTurn(playerX.playingSign, playerO.playingSign)
                 
                if(gameLogic.playerTurn === `${xSign}` || gameLogic.playerTurn === ''){
                    e.target.innerText =`${xSign}`
                    gameArray[e.target.dataset.index]=`${xSign}`
                }
                else if(gameLogic.playerTurn === `${oSign}`){
                    e.target.innerText = `${oSign}`
                    gameArray[e.target.dataset.index]=`${oSign}`
                };

                if(gameLogic.checkForWinner(e.target, playerX.playingSign, playerO.playingSign) === true){
                    return
                }
                
                if(gameLogic.checkForTie()== true) {alert('tie')}
                
                displayResults(playerX.playingSign, playerO.playingSign)
            })
        })
    }

    const resultsDisplay = document.querySelector('.results-display')
    const displayResults = (xSign='X', oSign='O') =>{
        let winningState = gameLogic.gameStatus
        
        if(winningState === `${xSign}`) resultsDisplay.innerText = `${xSign} has won`
        else if(winningState ===`${oSign}`) resultsDisplay.innerText = `${oSign} has won`
        else if(winningState ==='tie')resultsDisplay.innerText="its a tie"
    }
    
    const resetGame = ()=>{
        const button = document.querySelector('.reset-btn')
        button.addEventListener('click', () =>{
        gameLogic.xIndexArray.length =0;
        gameLogic.oIndexArray.length = 0;
        gameArray.length = 0;
        gameLogic.playerTurn ='';
        gameLogic.gameStatus ='';
        gameTiles.forEach(tile =>{
        tile.innerText =''
            })
        resultsDisplay.innerText =''    
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
        let amountOfO = gameBoard.gameArray.filter(i => i===`${oSign}`).length;

        if(!gameBoard.gameArray.length === 0 || amountOfX <= amountOfO)  gameLogic.playerTurn = `${xSign}`;
        else if(amountOfX> amountOfO)  gameLogic.playerTurn =`${oSign}`;
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
                    return true;
             
        }
           else if(oIndexArray.includes(winCombinations[i][0]) && oIndexArray.includes(winCombinations[i][1])
           && oIndexArray.includes(winCombinations[i][2])) {
                gameLogic.gameStatus =`${oSign}`   
                alert(`${oSign} has won`) 
                return true;
               
            } 
       }
        function storeInNewArray(playerTurn){       
            console.log({playerTurn})
        if(gameLogic.playerTurn === `${xSign}` || gameLogic.playerTurn ==='') xIndexArray.push(Number(target.dataset.index))
        else if(gameLogic.playerTurn === `${oSign}`) oIndexArray.push(Number(target.dataset.index))  
        }
    }

    const checkForTie = () =>{
            if (xIndexArray.length === 5 && oIndexArray.length === 4){
                gameLogic.gameStatus = 'tie'
                return true
            } return false; 
    }

    return{
        checkPlayerTurn,
        checkForWinner,
        winCombinations,
        xIndexArray,
        oIndexArray,
        gameStatus,
        playerTurn,
        checkForTie
    }
})();

