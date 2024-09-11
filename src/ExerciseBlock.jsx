import { useState } from 'react';
import styles from './ExerciseBlock.css';

export default function ExerciseBlock({id, name, sets, reps, onDelete}) {
    return (
        <div className='container'>
            <button className='exerciseBlockButton' onClick={() => onDelete(id)}>X</button>
            <h2>Exercise: {name}</h2>
            <p>Current Sets: {sets}</p>
            <p>Current Reps: {reps}</p>
        </div>
    );
}

