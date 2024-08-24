import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MyWorkout from './components/MyWorkout';
import Community from './components/Community';
import Exercises from './components/Exercises';
import Account from './components/Account';

function App() {
  return (
    <div className="App">
      <header className='header'>[PUMP]</header>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/myWorkout" element={<MyWorkout />} />
          <Route path="/community" element={<Community />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>

      <footer className='footer'>Workout Tracker Web Application | Portfolio Project | 2024</footer>
    </div>
  );
}

export default App;
