import React from 'react'

export const GameOverScreen = ({retry, score}) => {
  return (
    <div className="start">
      <h1 className="text-6xl">Game Over</h1>
      <h2 className="text-2xl mt-5">Sua pontuação foi de <span className="text-green-500">{score}</span></h2>
      <p className="mb-8 text-gray-400">Clique em recomeçar para tentar novamente!</p>
      <button 
      onClick={retry}
      className="p-3 px-7 font-bold rounded hover:bg-green-600
       transition-colors bg-green-400">
      Recomeçar
      </button>
    </div>
  )
}
