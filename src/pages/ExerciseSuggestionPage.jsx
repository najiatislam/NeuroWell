import React, { useState, useEffect } from 'react';
import axios from 'axios';

const goals = [
  { label: 'Weight Loss', value: 'weight_loss' },
  { label: 'Stress Relief', value: 'stress' },
  { label: 'Anger Management', value: 'anger_management' },
  { label: 'Increased Flexibility', value: 'increased_flexibility' },
];

const ExerciseSuggestionPage = () => {
  const [selectedGoal, setSelectedGoal] = useState('weight_loss');
  const [exercises, setExercises] = useState([]);

  // 🔥 This is the critical block — it always includes the selectedGoal in the URL
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/exercises/${selectedGoal}`)
      .then((response) => setExercises(response.data))
      .catch((err) => {
        console.error('Error fetching exercises', err);
        setExercises([]);
      });
  }, [selectedGoal]);  // Re-run whenever selectedGoal changes

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Exercise Suggestions</h1>

      {/* Dropdown to select health goal */}
      <select
        className="p-2 border rounded w-full md:w-1/2"
        value={selectedGoal}
        onChange={(e) => setSelectedGoal(e.target.value)}
      >
        {goals.map((goal) => (
          <option key={goal.value} value={goal.value}>
            {goal.label}
          </option>
        ))}
      </select>

      {/* Display fetched exercises */}
      <div className="space-y-4">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div key={exercise._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p>{exercise.description}</p>
              <ul className="list-disc ml-5 mt-2">
                {exercise.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No exercises found for this goal.</p>
        )}
      </div>
    </div>
  );
};

export default ExerciseSuggestionPage;