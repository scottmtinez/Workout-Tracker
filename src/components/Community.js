import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  //States
    const [leaderboard, setLeaderboard] = useState([]);
    const [user, setUser] = useState(null);

  // Retrieve user data from localStorage when the component mounts
    useEffect(() => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log('User data retrieved from localStorage:', storedUser); // For Testing
      }
    }, []); // Runs only once when the component mounts

  useEffect(() => {
    // Simulate fetching leaderboard data from an API or database
    const fetchData = async () => {
      const data = [
        { rank: 1, name: ' Alice ', weight: 1200 },
        { rank: 2, name: ' Bob ', weight: 1100 },
        { rank: 3, name: ' Charlie ', weight: 1000 },
        { rank: 4, name: ' Diana ', weight: 950 },
        { rank: 5, name: ' Edward ', weight: 900 },
      ];

      setLeaderboard(data);
    };
    
    fetchData();
  }, []);

  return (
    <div className='Community-container'>
      <h2 className='Community-title'>This Weeks Top Lifters</h2>
      <div className='Community-leaderboard'>
        {leaderboard.map((user) => (
          <div key={user.rank} className='Community-leaderboard-item'>
            <span className='Communtiy-leaderboard-rank'>#{user.rank}</span>
            <span className='Community-leaderboard-name'>{user.name}</span>
            <span className='Community-leaderboard-weight'>{user.weight} lbs.</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
