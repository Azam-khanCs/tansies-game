import React, { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { boolean, number } from '@storybook/addon-knobs';

const App = () => {

  const [allDie, setAllDie] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  const btnStyle = {
    backgroundColor: tenzies ? "#0bd737" : "#5035FF",
  }

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

  const { width, height } = useWindowSize()

  return (
    <div className='container'>

      <div className="tenzies">
        <div className="tenzies-container">

          <h1>Tenzies</h1>

          {tenzies ?
            <h4>Congratulation you won the game please click the New Game Button to start new game thanks</h4>
            :
            <p>
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>}
          {
            tenzies && <Confetti
              width={width}
              height={height}
              confettiSource={{
                w: 20,
                h: 20,
                x: width / 2,
                y: height / 2,
              }}
              run={boolean('Run', true)}
              recycle={boolean('Recycle', true)}
              numberOfPieces={number('# Pieces', 300, {
                range: true,
                min: 0,
                max: 2000,
                step: 10,
              })}
            />
          }
          <div className="die-container">
            {allDieElements}
          </div>

          <button style={btnStyle} onClick={rollDice} >
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
