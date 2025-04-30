import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExercisesList = ({ goalType }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!goalType) return;
    axios
      .get(`http://localhost:4000/api/exercises/${goalType}`)
      .then((res) => {
        setExercises(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load exercises');
        setLoading(false);
      });
  }, [goalType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {exercises.length > 0 ? (
        <ul className="space-y-4">
          {exercises.map((exercise) => (
            <li key={exercise._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p>{exercise.description}</p>
              <ul className="list-disc ml-5 mt-2">
                {exercise.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises found.</p>
      )}
    </div>
  );
};

export default ExercisesList;
