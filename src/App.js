import './App.css';
import React from 'react';
import GoHome from './GoHome';
import GoLeft from './GoLeft';
import GoRight from './GoRight';
import Coordinates from './Coordinates';
import Joystick from './Joystick';

function App() {

  
  return (
    <>
      <GoHome />
      <Coordinates />
      <Joystick />
    </>

  );
}

export default App;
