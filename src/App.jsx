import Player from "./Player.jsx"
import GameOver from "./GameOver"
import GameBoard from "./GamneBoard.jsx"
import Log from "./Log.jsx"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "../winning-combinations.js"
 
console.log(WINNING_COMBINATIONS);
const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]; 



function derivedActivePlayer (gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 &&   gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer;
}
function App() {
  const [players,setPlayers] = useState({
    'X' : 'Player 1',
     'O' :'Player 2',
  });
 const [gameTurns, setGameTurns] = useState([])

 const activePlayer = derivedActivePlayer(gameTurns);
let winner;
 
let gameBoard = [...initialGameBoard.map(array => [...array])];

for( const turn of gameTurns){
   const {square, player } = turn;
   const {row, col} = square;
gameBoard [row][col] = player;
}
// 


 for(const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = players[firstSquareSymbol];
   
  }
} 
 const hasDraw = gameTurns.length === 9 && !winner;
  console.log(hasDraw);
  //const [activePlayer, setActivePlayer] = useState('X');
  
  function handleActivePlayer (rowIndex, colIndex){
  //  setActivePlayer ((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
  
    setGameTurns(prevTurns =>{
    
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = 
      [
        {square:{row: rowIndex , col:colIndex }, player: currentPlayer}
        ,...prevTurns,
      ];
      return updatedTurns;
    });
    
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerChange(symbol,newName){
    setPlayers(prevPlayer =>{
      return{
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id = "game-container">
       <ol id="players" className="highlight-player">
       <Player initialName= "Player 1"  symbol = "X" isActive= {activePlayer === 'X'} onChangeName= {handlePlayerChange}/>
       <Player initialName= "Player 2"  symbol = "O" isActive= {activePlayer === 'O'} onChangeName={handlePlayerChange}/>
       </ol>
      
       {(winner || hasDraw) && <GameOver winner= {winner} onRestart= {handleRestart}/> }
        <GameBoard onSelectSquare = {handleActivePlayer}  board = {gameBoard} />
      </div>
     <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
