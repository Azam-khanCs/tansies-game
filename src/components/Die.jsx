import React from 'react';

const Die = (props) => {

  const styles = {
    backgroundColor: props.isHeld ? "#d5c20d" : "white",
    color: props.isHeld ? "white" : ""
  }

  return (
    <div
      onClick={props.holdDice}
      className="die-face" style={styles}>
      <h2>{props.value}</h2>
    </div>
  )
}

export default Die;
