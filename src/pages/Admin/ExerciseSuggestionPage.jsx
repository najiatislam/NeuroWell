import React, { useState, useEffect } from 'react';
import axios from 'axios';

const goals = [
  { label: 'Weight Loss', value: 'weight_loss' },
  { label: 'Stress Relief', value: 'stress' },
  { label: 'Anger Management', value: 'anger_management' },
  { label: 'Increased Flexibility', value: 'increased_flexibility' },
];

export default function ExerciseSuggestionPage() {
  const [selectedGoal, setSelectedGoal] = useState('weight_loss');
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises whenever the selected goal changes
    axios
      .get(`http://localhost:4000/api/exercises/${selectedGoal}`)
      .then((res) => setExercises(res.data))
      .catch((err) => {
        console.error('Error fetching exercises:', err);
        setExercises([]);
      });
  }, [selectedGoal]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Exercise Suggestions</h1>

      {/* Goal Selector */}
      <div>
        <label htmlFor="goalSelect" className="block mb-2 font-medium">
          Select Your Health Goal:
        </label>
        <select
          id="goalSelect"
          value={selectedGoal}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {goals.map((goal) => (
            <option key={goal.value} value={goal.value}>
              {goal.label}
            </option>
          ))}
        </select>
      </div>

      {/* Exercises List */}
      <div>
        {exercises.length > 0 ? (
          <ul className="space-y-4">
            {exercises.map((ex) => (
              <li key={ex._id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{ex.name}</h2>
                {ex.description && <p className="mt-1 italic">{ex.description}</p>}
                {ex.steps && ex.steps.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {ex.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No exercises found for this goal.</p>
        )}
      </div>
    </div>
);
}