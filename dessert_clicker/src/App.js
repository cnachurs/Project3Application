import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import './App.css';
import cookie from './cookie.png';
import grandma from './grandma.jpg';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App(){
  const [dessert, setDessert] = useState(0);
  const [dessertMultiplier, setDessertMultiplier] = useState(1);
  const [costClickMultiplier, setCostClickMultiplier] = useState(10);
  const [costGrandmaUpgrade, setCostGrandmaUpgrade] = useState(100);
  const [autoClick, setAutoClick] = useState(1);
  const handleDessertClicks = () => {
    setDessert (dessert + dessertMultiplier);
  }

  const buyMultiplier = () => {
    if (dessert >= costClickMultiplier){
      setDessert(dessert-costClickMultiplier);
      setDessertMultiplier(dessertMultiplier + 1);
    }
    else{
      alert("Not enough desserts to buy the multiplier!")
    }
    setCostClickMultiplier(Math.pow(10, dessertMultiplier+1));
  };

  const buyGrandmaUpgrade = () =>{
    if(dessert >= costGrandmaUpgrade){
      setDessert(dessert-costGrandmaUpgrade);
      setAutoClick(autoClick + 1);
      setCostGrandmaUpgrade(costGrandmaUpgrade*10);
    }
    else{
      alert("Not enough desserts to buy the grandma! Get yo cookies up, not yo funny!");
    }
  };

  useEffect(() => {
    let interval;
    if(autoClick > 1) {
      interval = setInterval(() => {
        setDessert((prevDessert) => prevDessert + autoClick - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoClick]);


return(
  <div className='App'>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="Login">Login</Link>
          </li>
        </ul>
      </nav>
        <section>                              
            <Routes>
               <Route path="/Dashboard" element={<Dashboard/>}/>
               <Route path="/Register" element={<Register/>}/>
               <Route path="/Login" element={<Login/>}/>
            </Routes>                    
        </section>
    </Router>
    <h1 className='Title'>Dessert Clicker!</h1>
    <div>
    <button onClick={handleDessertClicks}><img src={cookie} alt = 'Cookie' className='Cookie' style={{width:'400px', height:'400px'}}/></button>
    </div>
    <div>
    <text>Your Desserts: {dessert}</text>
    </div>
    <div>
      <button onClick={buyMultiplier}>Cost: {costClickMultiplier}</button>
    </div>
    <div>
      <text>Current Multiplier: {dessertMultiplier}</text>
    </div>
    <div>
      <button onClick={buyGrandmaUpgrade}><img src={grandma} alt= 'Grandma' style ={{width:'360px', height: '180px'}}/></button>
    </div>
    <div>
      Cost: {costGrandmaUpgrade}
    </div>
    <div>
      {autoClick > 0 &&(
        <text>Grandma is making : +{autoClick-1} cookies/sec</text>
      )}
    </div>
  </div>
)
}

export default App;
