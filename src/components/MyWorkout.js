import React, { useState, useEffect } from 'react';
import './MyWorkout.css';

function MyWorkout() {
    // Centralized workout data state
        const [workoutData, setWorkoutData] = useState({
            id: Date.now(),
            elapsedTime: 0,
            startTime: null,
            endTime: null,
            exercises: [],
        });

        const [newExercise, setNewExercise] = useState('');
        const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
        const [user, setUser] = useState(null);

    // Retrieve user data from localStorage when the component mounts
        useEffect(() => {
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log('User data retrieved from localStorage:', storedUser); // For Testing
            }
        }, []); // Runs only once when the component mounts

    // Save to localStorage whenever workoutData changes
        useEffect(() => {
            localStorage.setItem('workoutData', JSON.stringify(workoutData));
        }, [workoutData]);

    // Load from localStorage when component mounts
        useEffect(() => {
            const storedWorkout = localStorage.getItem('workoutData');
            if (storedWorkout) {
                setWorkoutData(JSON.parse(storedWorkout));
            }
        }, []);

    // Stopwatch functionality
        useEffect(() => {
            let interval;
            if (isWorkoutStarted) {
                interval = setInterval(() => {
                    const currentTime = Date.now();
                    const timeSinceStart = Math.floor((currentTime - workoutData.startTime) / 1000);
                    setWorkoutData((prev) => ({
                        ...prev,
                        elapsedTime: timeSinceStart,
                    }));
                }, 1000);
            } else {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [isWorkoutStarted, workoutData.startTime]);

    // Start workout
        const startWorkout = () => {
            const currentTime = Date.now();
            setWorkoutData((prev) => ({
                ...prev,
                startTime: currentTime,
                elapsedTime: 0,
            }));
            setIsWorkoutStarted(true);
        };

    // Stop workout and send data to the server
        const stopWorkout = async () => {
            const currentTime = Date.now();
            const elapsed = Math.floor((currentTime - workoutData.startTime) / 1000);
            const updatedWorkout = {
                ...workoutData,
                endTime: currentTime,
                elapsedTime: elapsed,
            };

            // Current user that's logged in
                const user = JSON.parse(localStorage.getItem('user'));

                if (!user) {
                    console.error("User is not authenticated.");
                    return;
                }

            // Send workout data to the server
                try {
                    const response = await fetch('http://localhost:5000/workouts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...updatedWorkout,
                            username: user.username,  // Include username in the request body
                        }),
                    });

                    if (response.ok) {
                        const savedWorkout = await response.json();
                        console.log('Workout saved:', savedWorkout);
                    } else {
                        console.error('Failed to save workout');
                    }
                } catch (error) {
                    console.error('Error sending workout data:', error);
                }

                setWorkoutData(updatedWorkout);
                setIsWorkoutStarted(false);

            // Save exercise data to the server
                await saveExercisesToDB(workoutData.exercises);
        };

    // Save exercise data to the server
        const saveExercisesToDB = async (exercises) => {
            try {
                const response = await fetch('http://localhost:5000/exercises', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ exercises }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to save exercises');
                }
        
                const result = await response.json();
                console.log(result.message); // "Exercises saved successfully"
            } catch (error) {
                console.error('Error saving exercises:', error);
            }
        };    

    // Reset workout
        const resetWorkout = () => {
            setWorkoutData({
                id: Date.now(),
                elapsedTime: 0,
                startTime: null,
                endTime: null,
                exercises: [],
            });
            setIsWorkoutStarted(false);
        };

    // Add a new exercise
        const handleAddExercise = () => {
            if (newExercise.trim() !== '') {
                setWorkoutData((prev) => ({
                    ...prev,
                    exercises: [
                        ...prev.exercises,
                        { name: newExercise.trim(), weight: '', reps: '', sets: [] },
                    ],
                }));
                setNewExercise('');
            }
        };

    // Handle exercise field changes
        const handleExerciseChange = (index, field, value) => {
            setWorkoutData((prev) => {
                const updatedExercises = prev.exercises.map((exercise, i) =>
                    i === index ? { ...exercise, [field]: value } : exercise
                );
                return { ...prev, exercises: updatedExercises };
            });
        };

    // Add a set to an exercise
        const handleAddSet = (index) => {
            setWorkoutData((prev) => {
                const updatedExercises = prev.exercises.map((exercise, i) =>
                    i === index
                        ? { ...exercise, sets: [...exercise.sets, { weight: '', reps: '' }] }
                        : exercise
                );
                return { ...prev, exercises: updatedExercises };
            });
        };

    // Delete a set from an exercise
        const handleDeleteSet = (exerciseIndex, setIndex) => {
            setWorkoutData((prev) => {
                const updatedExercises = prev.exercises.map((exercise, i) =>
                    i === exerciseIndex
                        ? { ...exercise, sets: exercise.sets.filter((_, j) => j !== setIndex) }
                        : exercise
                );
                return { ...prev, exercises: updatedExercises };
            });
        };

    // Handle set field changes
        const handleSetChange = (exerciseIndex, setIndex, field, value) => {
            setWorkoutData((prev) => {
                const updatedExercises = prev.exercises.map((exercise, i) =>
                    i === exerciseIndex
                        ? {
                            ...exercise,
                            sets: exercise.sets.map((set, j) =>
                                j === setIndex ? { ...set, [field]: value } : set
                            ),
                        }
                        : exercise
                );
                return { ...prev, exercises: updatedExercises };
            });
        };

    // Format elapsed time for display
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

    return (
        <div className='MyWorkout-container'>
            <div className='MyWorkout-timer'>
                <h1 className='MyWorkout-title'>My Workout</h1>
                <h2 className='MyWorkout-timer-tracker'>Elapsed Time: {formatTime(workoutData.elapsedTime)}</h2>

                <div className='MyWorkout-exercise'>
                    <ul className='MyWorkout-exercise-list'>
                        {workoutData.exercises.map((exercise, index) => (
                            <li className='MyWorkout-exercise-item' key={index}>
                                <div className='MyWorkout-exercise-row'>
                                    <span className='MyWorkout-exercise-name'>{exercise.name}</span>
                                    <button
                                        className='MyWorkout-exercise-delete-btn'
                                        onClick={() =>
                                            setWorkoutData((prev) => ({
                                                ...prev,
                                                exercises: prev.exercises.filter((_, i) => i !== index),
                                            }))
                                        }
                                    >
                                        -
                                    </button>
                                </div>

                                <div className='MyWorkout-exercise-row'>
                                    <input
                                        className='MyWorkout-exercise-weight'
                                        type='number'
                                        value={exercise.weight}
                                        onChange={(e) =>
                                            handleExerciseChange(index, 'weight', e.target.value)
                                        }
                                        placeholder='Weight (lbs)'
                                    />
                                    <input
                                        className='MyWorkout-exercise-reps'
                                        type='number'
                                        value={exercise.reps}
                                        onChange={(e) =>
                                            handleExerciseChange(index, 'reps', e.target.value)
                                        }
                                        placeholder='Reps'
                                    />
                                    <button
                                        className='MyWorkout-add-set-btn'
                                        onClick={() => handleAddSet(index)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className='MyWorkout-exercise-sets'>
                                    {exercise.sets.map((set, setIndex) => (
                                        <div key={setIndex} className='MyWorkout-set-row'>
                                            <input
                                                className='MyWorkout-exercise-set-weight'
                                                type='number'
                                                value={set.weight}
                                                onChange={(e) =>
                                                    handleSetChange(index, setIndex, 'weight', e.target.value)
                                                }
                                                placeholder={`Set ${setIndex + 1} Weight`}
                                            />
                                            <input
                                                className='MyWorkout-exercise-set-reps'
                                                type='number'
                                                value={set.reps}
                                                onChange={(e) =>
                                                    handleSetChange(index, setIndex, 'reps', e.target.value)
                                                }
                                                placeholder={`Set ${setIndex + 1} Reps`}
                                            />
                                            <button
                                                className='MyWorkout-delete-set-btn'
                                                onClick={() => handleDeleteSet(index, setIndex)}
                                            >
                                                -
                                            </button>
                                            <button
                                                className='MyWorkout-add-set-btn'
                                                onClick={() => handleAddSet(index)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <input
                        className='MyWorkout-exercise-input'
                        type='text'
                        value={newExercise}
                        onChange={(e) => setNewExercise(e.target.value)}
                        placeholder='Add new exercise'
                    />
                    <button className='MyWorkout-exercise-add-btn' onClick={handleAddExercise}>
                        +
                    </button>
                </div>

                {!isWorkoutStarted ? (
                    <button className='MyWorkout-start-stop' onClick={startWorkout}>
                        Start Workout
                    </button>
                ) : (
                    <button className='MyWorkout-start-stop' onClick={stopWorkout}>
                        Stop Workout
                    </button>
                )}
                <button className='MyWorkout-start-stop' onClick={resetWorkout}>Reset</button>
            </div>
        </div>
    );
}

export default MyWorkout;
