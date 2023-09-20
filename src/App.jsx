import React from 'react'
import './App.css'


const App = () => {
  return (
    <div className='container'>
      <div className="tenzies">
        <div className="tenzies-container">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='demo'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas eos quia pariatur,
          </div>
          <button>Roll</button>
        </div>
      </div>
    </div>
  )
}

export default App