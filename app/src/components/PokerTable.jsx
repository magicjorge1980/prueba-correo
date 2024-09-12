import React from 'react'

const suits = [
  { symbol: '♠', color: 'bg-gray-700', name: '-picas' },
  { symbol: '♥', color: 'bg-red-300', name: '-corazones' },
  { symbol: '♣', color: 'bg-gray-700', name: '-trebol' },
  { symbol: '♦', color: 'bg-red-300', name: '-diamantes' },
]

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const PokerTable = ({ handleButtonClick }) => {
  return (
    <div className='flex justify-center items-center p-5'>
      <table className='table-auto border-collapse border border-gray-500'>
        <thead>
          <tr>
            {suits.map(({ symbol, color }) => (
              <th
                key={symbol}
                className={`px-4 py-2 border border-gray-400 text-2xl ${color} text-center text-white`}
              >
                {symbol}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {suits.map(({ name, color }) => (
              <td key={name} className='px-4 py-2 border border-gray-400'>
                <div className='grid grid-rows-13 gap-2'>
                  {ranks.map((rank) => {
                    const card = `${rank}${name}`
                    return (
                      <button
                        key={card}
                        className={`m-1 px-4 py-2 font-bold rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-2xl ${color} text-white`}
                        onClick={() => handleButtonClick(card)}
                      >
                        {rank}
                      </button>
                    )
                  })}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PokerTable
