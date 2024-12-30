import React, { useState, useEffect } from 'react';
import './MyWorkout.css';

function MyWorkout() {
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState('');

    useEffect(() => {
        let interval;
        if (isWorkoutStarted) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isWorkoutStarted && elapsedTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isWorkoutStarted]);

    const startWorkout = () => {
        setIsWorkoutStarted(true);
    };

    const stopWorkout = () => {
        setIsWorkoutStarted(false);
    };

    const resetWorkout = () => {
        setIsWorkoutStarted(false);
        setElapsedTime(0);
        setExercises([]);
    };

    const handleAddExercise = () => {
        if (newExercise.trim() !== '') {
            setExercises([...exercises, { name: newExercise.trim(), weight: '', reps: '', sets: [] }]);
            setNewExercise('');
        }
    };

    const handleDeleteExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleExerciseChange = (index, field, value) => {
        setExercises(exercises.map((exercise, i) => (
            i === index ? { ...exercise, [field]: value } : exercise
        )));
    };

    const handleAddSet = (index) => {
        setExercises(exercises.map((exercise, i) => (
            i === index ? { ...exercise, sets: [...exercise.sets, { weight: '', reps: '' }] } : exercise
        )));
    };

    const handleDeleteSet = (exerciseIndex, setIndex) => {
        setExercises(exercises.map((exercise, i) => (
            i === exerciseIndex ? {
                ...exercise,
                sets: exercise.sets.filter((_, j) => j !== setIndex)
            } : exercise
        )));
    };

    const handleSetChange = (exerciseIndex, setIndex, field, value) => {
        setExercises(exercises.map((exercise, i) => (
            i === exerciseIndex ? {
                ...exercise,
                sets: exercise.sets.map((set, j) => (
                    j === setIndex ? { ...set, [field]: value } : set
                ))
            } : exercise
        )));
    };

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
