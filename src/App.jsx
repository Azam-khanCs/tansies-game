import React, { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import ConfettiExplosion from 'react-confetti-explosion';



const App = () => {

  const [allDie, setAllDie] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  React.useEffect(() => {
    const allHeld = allDie.every(die => die.isHeld)
    const firstValue = allDie[0].value
    const allSameValue = allDie.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [allDie])

  function diceGenrator() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {

    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(diceGenrator())
    }
    return newDice
  }

  function holdDice(id) {
    setAllDie(oldDice => oldDice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const allDieElements = allDie.map(dice =>
  (<Die
    key={dice.id}
    value={dice.value}
    isHeld={dice.isHeld}
    holdDice={() => holdDice(dice.id)}
  />)
  )

  function rollDice() {

    if (!tenzies) {
      setAllDie(oldDice => oldDice.map((die) => {
        return die.isHeld ? die : diceGenrator()
      }))
    }
    else {
      setTenzies(false)
      setAllDie(allNewDice())

    }

  }

  return (
    <div className='container'>

      <div className="tenzies">
        <div className="tenzies-container">

          <h1>Tenzies</h1>

          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          {
            tenzies && <ConfettiExplosion />
          }
          <div className="die-container">
            {allDieElements}
          </div>


          <button onClick={rollDice} >
            {
              tenzies ? "New Game" : "Roll"
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
