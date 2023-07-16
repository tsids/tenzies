import { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const value = dice[0].value
    const won = dice.every(die => (die.isHeld && die.value === value))
    if (won) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++)
      newDice.push(generateNewDie())
    return newDice
  }


  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }

  function holdDice(id: any) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die }
    }))
  }

  function newGame() {
    setTenzies(false)
    setDice(allNewDice)
  }

  return (
    <main className='max-w-2xl h-[700px] mx-auto my-8 px-5 py-7 bg-cyan-950 font-karla'>
      <section className='max-w-full h-full bg-slate-200 rounded-lg flex justify-around items-center flex-col'>
        <div className='text-center'>
          {tenzies && <Confetti />}
          <h1 className='text-5xl'>Tenzies</h1>
          <p className="font-inter mb-0 text-xl max-w-lg">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className='grid grid-rows-2 grid-cols-5 gap-4'>
          {dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)}
        </div>
        <button
          className='flex justify-center items-center bg-indigo-700 w-40 h-20 border-none rounded-md text-2xl font-bold text-white brightness-125 cursor-pointer'
          onClick={tenzies ? newGame : rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </section>
    </main>
  )
}

export default App
