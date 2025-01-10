import React, { useState, useEffect } from 'react';
import './MyWorkout.css';

function MyWorkout() {
    //States
        const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
        const [elapsedTime, setElapsedTime] = useState(0);
        const [exercises, setExercises] = useState([]);
        const [newExercise, setNewExercise] = useState('');
        const [user, setUser] = useState(null);
        const [stoppedTime, setStoppedTime] = useState(null)
        const [startTime, setStartTime] = useState(null); 
    
    // Retrieve user data and workout state when the component mounts
        useEffect(() => {
            const storedUser = localStorage.getItem('user');
            const storedExercises = localStorage.getItem('exercises');
            const storedStartTime = localStorage.getItem('startTime');
            const storedElapsedTime = localStorage.getItem('elapsedTime');

            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log('User data retrieved from localStorage:', storedUser);
            }

            if (storedExercises) {
                setExercises(JSON.parse(storedExercises)); // Load saved exercises
            }

            if (storedStartTime && storedElapsedTime) {
                const currentTime = Date.now();
                const timeSinceStart = Math.floor((currentTime - parseInt(storedStartTime, 10)) / 1000);
                setElapsedTime(parseInt(storedElapsedTime, 10) + timeSinceStart); // Resume timer
                setStartTime(parseInt(storedStartTime, 10));
                setIsWorkoutStarted(true);
            }
        }, []);

    // Save exercises to localStorage when they change
        useEffect(() => {
            if (exercises.length > 0) {
                localStorage.setItem('exercises', JSON.stringify(exercises));
            }
        }, [exercises]);

    // Stopwatch functionality
        useEffect(() => {
            let interval;
            if (isWorkoutStarted) {
                interval = setInterval(() => {
                    const currentTime = Date.now();
                    const timeSinceStart = Math.floor((currentTime - startTime) / 1000);
                    setElapsedTime(timeSinceStart);
                }, 1000);
            } else {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [isWorkoutStarted, startTime]);

    // Start and stop workout stopwatch buttons
        const startWorkout = () => {
            const currentTime = Date.now();
            setStartTime(currentTime); // Save the current timestamp
            localStorage.setItem('startTime', currentTime); // Persist to localStorage
            localStorage.setItem('elapsedTime', 0); // Reset elapsed time in localStorage
            setElapsedTime(0);
            setIsWorkoutStarted(true);

            console.log('Stop button clicked!'); // For Testing
            console.log('Elapsed Time:', elapsedTime); // For Testing
        };

        const stopWorkout = () => {
            setIsWorkoutStarted(false);
            const currentTime = Date.now();
            const timeSinceStart = Math.floor((currentTime - startTime) / 1000);
            localStorage.setItem('elapsedTime', timeSinceStart + elapsedTime); // Save elapsed time
            localStorage.removeItem('startTime'); // Clear start time from localStorage
            console.log('Workout stopped. Elapsed Time:', elapsedTime + timeSinceStart); // For Testing
        };

    // Reset workout stopwatch button
        const resetWorkout = () => {
            setIsWorkoutStarted(false);
            setElapsedTime(0);
            setStartTime(null);
            localStorage.removeItem('startTime');
            localStorage.removeItem('elapsedTime');
            localStorage.removeItem('exercises'); 
        };

    // Add and delete exercises
        const handleAddExercise = () => {
            if (newExercise.trim() !== '') {
                const updatedExercises = [...exercises, { name: newExercise.trim(), weight: '', reps: '', sets: [] }];
                setExercises(updatedExercises);
                setNewExercise('');
            }
        };

        const handleDeleteExercise = (index) => {
            const updatedExercises = exercises.filter((_, i) => i !== index);
            setExercises(updatedExercises);
        };

    // Exercise Handler
        const handleExerciseChange = (index, field, value) => {
            const updatedExercises = exercises.map((exercise, i) =>
                i === index ? { ...exercise, [field]: value } : exercise
            );
            setExercises(updatedExercises);
        };

    // Add Sets and Delete Sets
        const handleAddSet = (index) => {
            const updatedExercises = exercises.map((exercise, i) =>
                i === index ? { ...exercise, sets: [...exercise.sets, { weight: '', reps: '' }] } : exercise
            );
            setExercises(updatedExercises);
        };

        const handleDeleteSet = (exerciseIndex, setIndex) => {
            const updatedExercises = exercises.map((exercise, i) =>
                i === exerciseIndex
                    ? { ...exercise, sets: exercise.sets.filter((_, j) => j !== setIndex) }
                    : exercise
            );
            setExercises(updatedExercises);
        };
        
    // Set Change Handler
        const handleSetChange = (exerciseIndex, setIndex, field, value) => {
            const updatedExercises = exercises.map((exercise, i) =>
                i === exerciseIndex
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((set, j) =>
                            j === setIndex ? { ...set, [field]: value } : set
                        ),
                    }
                    : exercise
            );
            setExercises(updatedExercises);
        };

    // Format Timer
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

    return (
        <div className='MyWorkout-container'>
            <div className='MyWorkout-timer'>
                <h1 className='MyWorkout-title'>My Workout</h1>
                <h2 className='MyWorkout-timer-tracker'>Elapsed Time: {formatTime(elapsedTime)}</h2>

            <div className='MyWorkout-exercise'>
                <ul className='MyWorkout-exercise-list'>
                    {exercises.map((exercise, index) => (
                        <li className='MyWorkout-exercise-item' key={index}>
                            <div className='MyWorkout-exercise-row'>
                                <span className='MyWorkout-exercise-name'>{exercise.name}</span>
                                <button className='MyWorkout-exercise-delete-btn' onClick={() => handleDeleteExercise(index)}>-</button>
                            </div>

                            <div className='MyWorkout-exercise-row'>
                                <input
                                    className='MyWorkout-exercise-weight'
                                    type='number'
                                    value={exercise.weight}
                                    onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                    placeholder='Weight (lbs)'
                                />
                                <input
                                    className='MyWorkout-exercise-reps'
                                    type='number'
                                    value={exercise.reps}
                                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                    placeholder='Reps'
                                />
                                 <button className='MyWorkout-add-set-btn' onClick={() => handleAddSet(index)}>+</button>
                            </div>

                            <div className='MyWorkout-exercise-sets'>
                                {exercise.sets.map((set, setIndex) => (
                                    <div key={setIndex} className='MyWorkout-set-row'>
                                        <input
                                            className='MyWorkout-exercise-set-weight'
                                            type='number'
                                            value={set.weight}
                                            onChange={(e) => handleSetChange(index, setIndex, 'weight', e.target.value)}
                                            placeholder={`Set ${setIndex + 1} Weight`}
                                        />
                                        <input
                                            className='MyWorkout-exercise-set-reps'
                                            type='number'
                                            value={set.reps}
                                            onChange={(e) => handleSetChange(index, setIndex, 'reps', e.target.value)}
                                            placeholder={`Set ${setIndex + 1} Reps`}
                                        />
                                         <button className='MyWorkout-add-set-btn' onClick={() => handleAddSet(index)}>+</button>
                                        <button
                                            className='MyWorkout-delete-set-btn'
                                            onClick={() => handleDeleteSet(index, setIndex)}
                                        >
                                            - 
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
                <button className='MyWorkout-exercise-add-btn' onClick={handleAddExercise}>+</button>
            </div>

            {!isWorkoutStarted ? (
                    <button className='MyWorkout-start-stop' onClick={startWorkout}>Start Workout</button>
                ) : (
                    <button className='MyWorkout-start-stop' onClick={stopWorkout}>Stop Workout</button>
                )}
                <button className='MyWorkout-start-stop' onClick={resetWorkout}>Reset</button>
            </div>
        </div>
    );
}

export default MyWorkout;
