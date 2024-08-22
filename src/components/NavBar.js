import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/home');

  useEffect(() => {
    setActiveTab(location.pathname); 
  }, [location]);

  return (
    <div className="NavBar">
      <nav className='NavBar-nav-container'>
        <ul className='NavBar-nav-links'>
          <li className={`NavBar-link ${activeTab === '/home' ? 'active-tab' : ''}`}>
            <NavLink to='/home' className={activeTab === '/home' ? 'active-tab' : ''}>HOME</NavLink>
          </li>
          <li className={`NavBar-link ${activeTab === '/myWorkout' ? 'active-tab' : ''}`}>
            <NavLink to='/myWorkout' className={activeTab === '/myWorkout' ? 'active-tab' : ''}>MY WORKOUT</NavLink>
          </li>
          <li className={`NavBar-link ${activeTab === '/community' ? 'active-tab' : ''}`}>
            <NavLink to='/community' className={activeTab === '/community' ? 'active-tab' : ''}>COMMUNITY</NavLink>
          </li>
          <li className={`NavBar-link ${activeTab === '/exercises' ? 'active-tab' : ''}`}>
            <NavLink to='/exercises' className={activeTab === '/exercises' ? 'active-tab' : ''}>EXERCISES</NavLink>
          </li>
          <li className={`NavBar-link ${activeTab === '/account' ? 'active-tab' : ''}`}>
            <NavLink to='/account' className={activeTab === '/account' ? 'active-tab' : ''}>ACCOUNT</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
