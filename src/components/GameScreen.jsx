import React, { useState, useRef } from "react";

export const GameScreen = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(letter);
    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        Pontuação: <span className="font-bold text-green-500  ">{score}</span>
      </p>
      <h1 className="text-5xl mt-5">Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra:{" "}
        <span className="text-yellow-400">{pickedCategory}</span>
      </h3>

      <div className="wordContainer flex m-6 p-6 border border-[20px] border-yellow-400">

        {letters.map((letter, i) =>
          guessedLetters?.includes(letter) ? (
            <span key={i} className="letter text-7xl font-bold bg-white uppercase w-24 h-24
         border border-4 border-gray-900 text-black">{letter}</span>
          ) : (
            <span key={i} className="blankSquare text-7xl font-bold bg-white uppercase w-24 h-24
         border border-4 border-gray-900"></span>
          )
        )}

      </div>

      <div className="">
        <p className="mb-5">Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit} className="flex items-center justify-center ">
          <input
            className="w-12 h-12 focus: text-blue-500 rounded-l text-4xl font-medium text-center
          uppercase "
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button
            onClick={verifyLetter}
            className="p-3 px-7 font-bold rounded-r hover:bg-green-600
       transition-colors bg-green-400"
          >
            Jogar!
          </button>
        </form>
        <p className="mb-5 text-sm">
          Você ainda tem <span className="text-green-500">{guesses}</span>{" "}
          tentativa(s).
        </p>
      </div>
      <div className="wrongLettersContainer">
        <p className="text-3xl mt-3">Letras já utilizadas:</p>
        {wrongLetters?.map((letter, i) => (
          <span key={i} className="text-red-500 font-bold text-2xl">{letter}, </span>
        ))}
      </div>
    </div>
  );
};
