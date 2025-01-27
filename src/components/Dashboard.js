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

  // Fetch users and workout data when the component mounts
  useEffect(() => {
   
    const storedUsers = [
      { id: 1, name: "User 1", email: "user1@example.com", workoutsCompleted: 10 },
      { id: 2, name: "User 2", email: "user2@example.com", workoutsCompleted: 5 },
      { id: 3, name: "User 3", email: "user3@example.com", workoutsCompleted: 8 },
    ];
    setUsers(storedUsers);


    const storedWorkouts = [
      { id: 1, name: "Workout A", date: "2025-01-15" },
      { id: 2, name: "Workout B", date: "2025-01-14" },
      { id: 3, name: "Workout C", date: "2025-01-13" },
    ];
    setRecentWorkouts(storedWorkouts);
  }, []); 

// Fetch the user count from the backend
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/count"); // Replace with your server URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserCount(data.count); // Update the state with the count
        console.log("User count:", data.count);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    fetchUserCount();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

        <div className="Dashboard-chart">
          <h2>Users Workouts Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={users.map((user) => ({
                name: user.name,
                workouts: user.workoutsCompleted,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="workouts"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="Dashboard-exercise-requests">
          <h2>Exercise Requests</h2>
          <p>New exercises that need to be added to the database</p>
        </div>

        <div className="Dashboard-blog">
          <h2>Blog</h2>
          <p>Blog content goes here</p>
        </div>

        <div className="Dashboard-chart">
          <h2>Users Workouts Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={users.map((user) => ({
                name: user.name,
                workouts: user.workoutsCompleted,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="workouts"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
