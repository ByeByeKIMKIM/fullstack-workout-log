import { useState } from 'react';
import styles from './ExerciseBlock.css';

export default function ExerciseBlock({exercise, sets, reps}) {

    //open up a graph popup when clicked
    function handleClick() {
        alert("clicked");
    }

    return (
        <div className='container' onClick={handleClick}>
            <h2>Exercise: {exercise}</h2>
            <p>Current Sets: {sets}</p>
            <p>Current Reps: {reps}</p>
        </div>
    );
}

