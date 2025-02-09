import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
// States
  const [users, setUsers] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [pendingExercises, setPendingExercises] = useState([]);

// Fetch the user count from the backend
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/count"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserCount(data.count); // Updates the state with the count
        console.log("User count:", data.count);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    fetchUserCount();
  }, []); // Empty dependency array ensures this runs once when the component mounts

// Load exercises from localStorage when component mounts
    useEffect(() => {
      const storedExercises = JSON.parse(localStorage.getItem('pendingExercises')) || [];
      setPendingExercises(storedExercises);
    }, []);

// Function to accept an exercise
  const acceptExercise = async (exerciseName) => {
    console.log("📡 Sending request for:", exerciseName);

    try {
        const response = await fetch('http://localhost:5000/exercises/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: exerciseName }),
        });

        console.log("📩 Response received:", response);

        if (!response.ok) {
            throw new Error('Failed to approve exercise');
        }

        const data = await response.json();
        console.log("✅ Exercise Approved:", data);

        setPendingExercises(prevExercises =>
            prevExercises.filter(ex => ex !== exerciseName)
        );
    } catch (error) {
        console.error("❌ Failed to approve exercise:", error);
    }
  };
  
// Function to reject an exercise
    const rejectExercise = (exerciseName) => {
      setPendingExercises(pendingExercises.filter(name => name !== exerciseName));
      
      // Update localStorage after rejecting
      localStorage.setItem('pendingExercises', JSON.stringify(pendingExercises.filter(name => name !== exerciseName)));
    };

//


  return (
    <div className="Dashboard-container">
      <h1 className="Dashboard-h1">Admin Dashboard</h1>

      <div className="Dashboard-grid">
        <div className="Dashboard-active-users">
          <h2>{userCount}</h2>
          <p>Active Users</p>
        </div>

        <div className="Dashboard-recent-workouts">
          <h2>Recent Workouts</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Workout Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Dashboard-exercise-requests">
        <h2>Pending Exercises for Approval</h2>
            <ul>
                {pendingExercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise}
                        <button className='Dashboard-approve-btn' onClick={() => acceptExercise(exercise)}><i class="bi bi-check2"></i></button>
                        <button className='Dashboard-reject-btn' onClick={() => rejectExercise(exercise)}><i class="bi bi-ban"></i></button>
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
