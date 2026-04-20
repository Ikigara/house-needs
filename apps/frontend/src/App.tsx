import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import ListHome from './Pages/ListHome';
import HomeScreen from './Pages/Home';

function App() {


  return (
    
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>

     
  );
}

export default App;
