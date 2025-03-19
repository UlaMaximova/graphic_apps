import { useState } from "react";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  let status;
  let winner;
  let gameOver = true;

  if ((winner = determineWinner(squares)) !== null) {
    status = `Победитель: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = 'Ничья';
  } else {
    gameOver = false;
    status = `Следующий игрок: ${xIsNext ? "X" : "0"}`;
  }

  function handleSquareClick(index) {
    if (squares[index] !== null || winner !== null) {
      return;
    }

    const nextSquares = squares.slice();
    const symbol = xIsNext ? "X" : "0";
    nextSquares[index] = symbol;

    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  function resetBoard() {
    setXIsNext(true);
    setSquares(Array(9).fill(null));
  }

  return (
    <div className="flex flex-col items-center gap-4 font-sans p-5">
      <div className="text-lg font-semibold text-black">{status}</div>
      <div>
        {[0, 3, 6].map(row => (
          <div key={row} className="flex">
            {[0, 1, 2].map(col => (
              <Square key={row + col} value={squares[row + col]} onSquareClick={() => handleSquareClick(row + col)} />
            ))}
          </div>
        ))}
      </div>
      {gameOver && <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={resetBoard}>Сыграть ещё раз</button>}
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button
      className={`w-16 h-16 text-xl font-bold border border-gray-500 flex items-center justify-center hover:bg-blue-100 ${value === "X" ? "text-red-500" : value === "0" ? "text-blue-500" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function determineWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
