import React, { useState } from 'react'
type square = {
  val: string
  onClick: () => void
}
function TicToc() {
  const [sqaures, setSquare] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const winner: string = calculateWinner(sqaures);
  let status: string;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next is: ${isX ? "X" : "O"}`
  }
    
  const handleClick = (i: number) => {
    if (calculateWinner(sqaures) || sqaures[i]) {
      return
    }
    sqaures[i] = isX ? 'X' : "O";
    setSquare(sqaures)
    setIsX(!isX)
  }
  function Square({ val, onClick }: square) {
    return (
      <button onClick={onClick} className='p-3 m-1 font-bold text-3xl size-20 rounded  shadow-red bg-slate-500 text-slate-50'>{val}</button>
    )
  }
  function handleRestart() {
    setIsX(true)
    setSquare(Array(9).fill(null))
  }
  return (
    <div className="min-h-screen bg-blue-900 pt-8">
      <div className=' grid grid-cols-3 w-[350px] mx-auto p-4 bg-slate-600 rounded'>
        {sqaures.map((item: string, id: number) => {
          return (
            <Square val={sqaures[id]} onClick={() => handleClick(id) } />
          )
        })}
        <div className='flex justify-between  w-[300px] mt-4'>
        <p className='text-lg text-yellow-400 font-bold mt-2 '>{ status}</p>
        <button onClick={handleRestart} className='p-2 font-bold bg-slate-400 rounded text-yellow-300'>Restart</button>
        </div>
      </div>
    </div>
  )
}

function calculateWinner(sqaure: any) {
  const winnerPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < winnerPatterns.length; i++){
    const [a, b, c] = winnerPatterns[i];
    if (sqaure[a] && sqaure[a] === sqaure[b] && sqaure[b] === sqaure[c]) {
      return sqaure[a]
    }
  }
  return null
}
export default TicToc
