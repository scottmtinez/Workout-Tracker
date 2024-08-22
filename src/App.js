import './App.css';
import React from 'react';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className='header'>[PUMP]</header>
      <nav>
        <ul>
          <li>
            <a href='/'>HOME</a>
          </li>
          <li>
            <a href='/'>MY WORKOUT</a>
          </li>
          <li>
            <a href='/'>COMMUNITY</a>
          </li>
          <li>
            <a href='/'>EXERCISES</a>
          </li>
          <li>
            <a href='/'>ACCOUNT</a>
          </li>
        </ul>
      </nav>

      <Home />
      
      <footer className='footer'>Workout Tracker Web Application | Portfolio Project | 2024</footer>
    </div>
  );
}

export default App;
