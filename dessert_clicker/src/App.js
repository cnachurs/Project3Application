import React, { useState } from 'react';
import './App.css';

function App(){
  const [dessert, setDessert] = useState(0);
  const [dessertMultiplier, setDessertMultiplier] = useState(1);
  const [cost, setCost] = useState(10);

  const handleDessertClicks = () => {
    setDessert (dessert + dessertMultiplier);
  }

  const buyMultiplier = () => {
    if (dessert >= cost){
      setDessert(dessert-cost);
      setDessertMultiplier(dessertMultiplier + 1);
    }
    else{
      alert("Not enough desserts to buy the multiplier!")
    }
    setCost(Math.pow(10, dessertMultiplier+1));
  };
return(
  <div className='App'>
    <h1 className='Title'>Dessert Clicker!</h1>
    <div>
    <button onClick={handleDessertClicks}><img src='cookie.png' alt = 'Cookie' className='Cookie'/></button>
    </div>
    <div>
    <text>Your Desserts: {dessert}</text>
    </div>
    <div>
      <button onClick={buyMultiplier}>Cost: {cost}</button>
    </div>
    <div>
      <text>Current Multiplier: {dessertMultiplier}</text>
    </div>
  </div>
)
}

export default App;
