import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import './App.css';
import cookie from './cookie.png';
import grandma from './grandma.jpg';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  auth,
  db,
  userDocRef,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  loadGameData,
  saveGameData,
} from "./firebase";

function App(){
  const [dessert, setDessert] = useState(0);
  const [dessertMultiplier, setDessertMultiplier] = useState(1);
  const [costClickMultiplier, setCostClickMultiplier] = useState(10);
  const [costGrandmaUpgrade, setCostGrandmaUpgrade] = useState(100);
  const [autoClick, setAutoClick] = useState(1);


  useEffect(() => {
    const saveGameDataToFirestore = async () => {
      try {
        await saveGameData(auth.currentUser.uid, {
          dessert,
          dessertMultiplier,
          costClickMultiplier,
          costGrandmaUpgrade,
          autoClick,
        });
      } catch (error) {
        console.error("Error saving game data:", error);
      }
    }
  
    saveGameDataToFirestore();
  }, [dessert, dessertMultiplier, costClickMultiplier, costGrandmaUpgrade, autoClick]);

  useEffect(() => {
    const fetchGameDataFromFirestore = async () => {
      try {
        const userData = await loadGameData(auth.currentUser.uid);
        if (userData) {
          // setDessert(userData.dessert || 0);
          // setDessertMultiplier(userData.dessertMultiplier || 1);
          // setCostClickMultiplier(userData.costClickMultiplier || 10);
          // setCostGrandmaUpgrade(userData.costGrandmaUpgrade || 100);
          // setAutoClick(userData.autoClick || 1);
          setDessert(userData.dessert);
          setDessertMultiplier(userData.dessertMultiplier);
          setCostClickMultiplier(userData.costClickMultiplier);
          setCostGrandmaUpgrade(userData.costGrandmaUpgrade);
          setAutoClick(userData.autoClick);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchGameDataFromFirestore();
  }, []);
  


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (auth.currentUser) {

  //       // Fetch user data from Firestore
  //       // const userDocRef = db.collection("users").doc(auth.currentUser.uid);
  //       try {
  //         if (auth.currentUser) {
  //           const doc = await userDocRef.get();

  //           if (doc.exists) {
  //               const userData = doc.data();
  //             setDessert(userData.dessert || 0);
  //             setDessertMultiplier(userData.dessertMultiplier || 1);
  //             setCostClickMultiplier(userData.costClickMultiplier || 10);
  //             setCostGrandmaUpgrade(userData.costGrandmaUpgrade || 100);
  //             setAutoClick(userData.autoClick || 1);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }  
  //     } 
  //   };

  //   fetchData();
  // }, []);

  const handleDessertClicks = () => {
    setDessert(dessert + dessertMultiplier);
  };

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



  


  // useEffect(() => {
  //   const saveGameData = async () => {
  //     if (auth.currentUser) {
  //       try{
  //       // Save user data to Firestore
  //       // const userDocRef = db.collection("users").doc(auth.currentUser.uid);
  //         await userDocRef.set({
  //           dessert,
  //           dessertMultiplier,
  //           costClickMultiplier,
  //           costGrandmaUpgrade,
  //           autoClick,
  //         });
  //       } catch (error) {
  //         console.error("Error saving game data:", error);
  //       }
  //     }
  //   };

  //   saveGameData();
  // }, [dessert, dessertMultiplier, costClickMultiplier, costGrandmaUpgrade, autoClick]);



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
