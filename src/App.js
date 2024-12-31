import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [isXNext, setIsXNext] = useState(true); 
  const [winner, setWinner] = useState(null); 

  
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every(cell => cell)) {
      setWinner('Draw');
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; 
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O'; 
    setBoard(newBoard);
    setIsXNext(!isXNext); 
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null)); 
    setIsXNext(true); 
    setWinner(null); 
  };

  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <h1 id='turn'>
        {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} is the winner!`) : `Player ${isXNext ? 'X' : 'O'}'s turn`}
      </h1>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

export default App;