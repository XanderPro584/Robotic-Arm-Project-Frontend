import './App.css';
import React from 'react';
import GoHome from './GoHome';
import GoLeft from './GoLeft';
import GoRight from './GoRight';
import Coordinates from './Coordinates';

function App() {

  
  return (
    <>
      <GoLeft />
      <GoHome />
      <GoRight />
      <Coordinates />
    </>

  );
}

export default App;
