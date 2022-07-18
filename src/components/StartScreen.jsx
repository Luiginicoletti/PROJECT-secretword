import React from "react";

export const StartScreen = ({startGame}) => {
  return (
    <div className="start">
      <h1 className="text-6xl">Secret Word</h1>
      <p className="mb-8 text-gray-400">Clique no botão para começar a jogar</p>
      <button 
      onClick={startGame}
      className="p-3 px-7 font-bold rounded hover:bg-green-600
       transition-colors bg-green-400">
      Começar jogo
      </button>
    </div>
  );
};
