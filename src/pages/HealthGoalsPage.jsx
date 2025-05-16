import React, { useState } from 'react';
import HealthGoals from '../components/HealthGoals';

const HealthGoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Weight Loss',
      target: '75kg',
      current: '82kg',
      progress: 40,
      category: 'fitness',
      notes: 'Need to exercise 3 times a week',
    },
    {
      id: 2,
      title: 'Quit Smoking',
      target: '0/day',
      current: '3/day',
      progress: 70,
      category: 'habits',
      notes: 'Using nicotine patches as aid',
    },
  ]);

  return (
    <div className="p-6">
      <HealthGoals goals={goals} setGoals={setGoals} />
    </div>
  );
};

export default HealthGoalsPage;