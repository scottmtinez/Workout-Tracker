import React, { useState, useEffect } from 'react';
import './Dashboard.css';
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

    // Fetch users and workout data when the component mounts
    useEffect(() => {
        // Mock data retrieval (replace with API calls in production)
        const storedUsers = [
            { id: 1, name: 'User 1', email: 'user1@example.com', workoutsCompleted: 10 },
            { id: 2, name: 'User 2', email: 'user2@example.com', workoutsCompleted: 5 },
            { id: 3, name: 'User 3', email: 'user3@example.com', workoutsCompleted: 8 },
        ];
        setUsers(storedUsers);

        const storedWorkouts = [
            { id: 1, name: 'Workout A', date: '2025-01-15' },
            { id: 2, name: 'Workout B', date: '2025-01-14' },
            { id: 3, name: 'Workout C', date: '2025-01-13' },
        ];
        setRecentWorkouts(storedWorkouts);
    }, []); // Runs only once when the component mounts

    return (
        <div className='Dashboard-container'>
            <h1>Admin Dashboard</h1>

            <div className='Dashboard-active-users'>
                <h2>Active Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Workouts Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.workoutsCompleted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='Dashboard-list-of-recent-workouts'>
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
                        {recentWorkouts.map(workout => (
                            <tr key={workout.id}>
                                <td>{workout.id}</td>
                                <td>{workout.name}</td>
                                <td>{workout.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className='Dashboard-exercise-requests'>
                <h2>Exercise Requests</h2>
                *New exercies that need to be added to the database*

            </div>

            <div className='Dashboard-graph'>
                <h2>Users Workouts Overview</h2>
                <LineChart className='Dashboard-line-chart'
                    width={600}
                    height={400}
                    data={users.map(user => ({ name: user.name, workouts: user.workoutsCompleted }))}
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
            </div>


        </div>
    );
}

export default Dashboard;
