import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  //States
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('/home');
      
  // Retrieve user data from localStorage when the component mounts
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log('User data retrieved from localStorage:', storedUser); // For Testing
        }
      }, []); // Runs only once when the component mounts
  
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
          <li className={`NavBar-link ${activeTab === '/food' ? 'active-tab' : ''}`}>
            <NavLink to='/food' className={activeTab === '/food' ? 'active-tab' : ''}>MY PLATE</NavLink>
          </li>
          <li className={`NavBar-link ${activeTab === '/dashboard' ? 'active-tab' : ''}`}>
            <NavLink to='/dashboard' className={activeTab === '/dashboard' ? 'active-tab' : ''}>DASHBOARD</NavLink>
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
