import { useState } from 'react'
import './App.css'

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
    {exercise: 'Bench', sets: '3', reps: '10'}
  ]);

  //function to give the addExercise button functionality
  const handleAddExercise = () => {
    const exerciseName = prompt('Enter the name of the exercise');

    if(exerciseName) {
        //we are specifying the setExercises function here
        //prevExercises refers to the current state
        //"..." creates a new array with the old state (prevExercises) + the new exercise (exercise: ...)
        setExercises((prevExercises) => 
            [...prevExercises, {exercise: exerciseName, sets: '', reps: ''}]);
    }
  }

  return (
    <div className="App">
      {exercises.map((exercise, index) => (
        <ExerciseBlock
        key={index}
        exercise={exercise.exercise}
        sets={exercise.sets}
        reps={exercise.reps} />
      ))};
      <button onClick={handleAddExercise}>Add Exercise</button>
    </div>
  )
}

export default App
