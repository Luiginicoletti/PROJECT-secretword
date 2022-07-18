
import './App.css'
import { StartScreen } from './components/StartScreen'
import { GameScreen } from './components/GameScreen'
import { GameOverScreen } from './components/GameOverScreen'
import { useCallback, useEffect, useState } from "react"
import { wordsList } from "./data/words"

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    

    return { word, category }
  }, [words])

  // start the game
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates();
    //destructing thw word and category from function 
    const { word, category } = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
   

  }, [pickWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized

    if (
      guessedLetters?.includes(normalizedLetter) ||
      wrongLetters?.includes(normalizedLetter)
    ) {
      return;
    }
    //push guessedLetter or remove a guess

    if (letters?.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])

    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
 

  }

const clearLetterStates = () => {
  setGuessedLetters([])
  setWrongLetters([])
}

  useEffect(()=>{
if(guesses <= 0){
  clearLetterStates()
  setGameStage(stages[2].name)
}
  },[guesses])

  useEffect(()=>{
    const uniqueLetters = [... new Set(letters)]
    //win conditions
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100)
      // restart game with new word
      startGame()
    }
      },[guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <GameScreen
        verifyLetter={verifyLetter} pickedWord={pickedWord}
        pickedCategory={pickedCategory} letters={letters}
        guessedLetters={guessedLetters} wrongLetters={wrongLetters}
        guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOverScreen retry={retry} score={score} />}
    </div>
  )
}

export default App
