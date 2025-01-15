import React, { useState, useEffect } from 'react';
import './Food.css';

const Food = () => {
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
        <div className='Food-container'>
            <div className='Food-container'>
                Food Page
            </div>
        </div>
    );
}

export default Food;
