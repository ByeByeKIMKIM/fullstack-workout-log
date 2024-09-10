import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import ExerciseBlock from './ExerciseBlock'

function App() {
  //use a state to store all the exercises
  //when a new exercise is created, add it to the state variable
  //update the view using the state variable because it contains all the informaion
  //"exercises" is the current state
  //"setExercises" is a state-updater function
  //the "[]" indicates that our state is an array
  //remember that JS is is a dynamic language, so types aren't specifies
  const [exercises, setExercises] = useState([
    {name: 'Bench', sets: '3', reps: '10'}
  ]);

  // Fetch exercises from the database when the component mounts
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:3001/exercises');
        setExercises(response.data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  // Function to handle adding a new exercise
  const handleAddExercise = async () => {
    const exerciseName = prompt('Enter the name of the exercise');

    if (exerciseName) {
      try {
        // Send POST request to add a new exercise
        const response = await axios.post('http://localhost:3001/exercises', {
          name: exerciseName,
          sets: 0,
          reps: 0
        });

        // Add the new exercise to the state
        setExercises((prevExercises) => [
          ...prevExercises,
          { name: exerciseName, sets: 0, reps: 0, id: response.data.exerciseId }
        ]);
      } catch (error) {
        console.error('Failed to add exercise:', error);
      }
    }
  };

  const handleDeleteExercise = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exercise?');

    if (confirmDelete) {
      try {
        //send a delete request to delete an exercise
        await axios.delete(`http://localhost:3001/exercises/${id}`);
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise.id !== id)
        );
      } catch (error) {
        console.error('Failed to delete exercise:', error);
      }
    }
  };

  return (
    <div className="App">
      {exercises.map((exercise) => (
        <ExerciseBlock
          key={exercise.id} // Use unique ID from database
          name={exercise.name}
          sets={exercise.sets}
          reps={exercise.reps}
          onDelete = {() => handleDeleteExercise(exercise.id)}
        />
      ))}
      <button onClick={handleAddExercise}>Add Exercise</button>
    </div>
  );
}

export default App;
