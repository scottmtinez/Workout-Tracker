import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MyWorkout from './components/MyWorkout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
        </Routes>
      </Router>

      <footer className='footer'>Workout Tracker Web Application | Portfolio Project | 2024</footer>
    </div>
  );
}

export default App;
