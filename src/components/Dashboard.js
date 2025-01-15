import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    //States
        const [user, setUser] = useState(null);
    
      // Retrieve user data from localStorage when the component mounts
        useEffect(() => {
          const storedUser = localStorage.getItem('user');
    
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log('User data retrieved from localStorage:', storedUser); // For Testing
          }
        }, []); // Runs only once when the component mounts

    return (
        <div className='Dashboard-container'>
            
        </div>
    );
}

export default Dashboard;
