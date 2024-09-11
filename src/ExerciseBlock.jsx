import { useState } from 'react';
import styles from './ExerciseBlock.css';

export default function ExerciseBlock({id, name, sets, reps, onDelete}) {
    return (
        <div className='container'>
            <h2>Exercise: {name}</h2>
            <p>Current Sets: {sets}</p>
            <p>Current Reps: {reps}</p>
            <button onClick={() => onDelete(id)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>Delete Exercise</button>
        </div>
    );
}

