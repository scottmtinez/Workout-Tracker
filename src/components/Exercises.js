import React, { useState, useEffect } from 'react';
import './Exercises.css';

const Exercises = () => {
    const [user, setUser] = useState(null);
    const [exercises, setExercises] = useState([]);  // State for exercises
    const [loading, setLoading] = useState(true);     // Loading state to show while fetching data

    // Retrieve user data from localStorage when the component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log('User data retrieved from localStorage:', storedUser); // For testing
        }
    }, []); // Runs only once when the component mounts

    // Fetch exercises from the backend API
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:5000/exercises');
                if (response.ok) {
                    const data = await response.json();
                    setExercises(data);  // Set exercises state
                } else {
                    console.error('Failed to fetch exercises');
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
            } finally {
                setLoading(false);  // Set loading to false once fetching is done
            }
        };

        fetchExercises();
    }, []); // Runs only once when the component mounts

    return (
        <div className='Exercises-container'>
            <h1>Exercises Page</h1>

            {loading ? (
                <p>Loading exercises...</p>  // Loading message
            ) : (
                <table className='Exercises-table'>
                    <thead>
                        <tr>
                            <th>Exercise Name:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.length > 0 ? (
                            exercises.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{exercise.name}</td>  {/* Display the exercise name */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="1">No exercises found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Exercises;
