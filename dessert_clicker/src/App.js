import React from 'react';
import './App.css';
import Title from './Title';
import Cookie from './Cookie';

const App = () =>{
  return(
    <div className='App'>
      <Title text ="Dessert Clicker!"/>
      <Cookie/>
    </div>
  );
};
export default App;
