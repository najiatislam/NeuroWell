import React, { useState } from 'react';

const HealthGoals = ({ goals, setGoals }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    current: '',
    progress: 0,
    category: 'fitness',
    notes: '',
  });

  const goalCategories = [
    { value: 'fitness', label: 'Fitness' },
    { value: 'habits', label: 'Habits' },
    { value: 'mental', label: 'Mental Health' },
    { value: 'nutrition', label: 'Nutrition' },
  ];

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.current) {
      const newId = goals.length > 0 ? Math.max(...goals.map((g) => g.id)) + 1 : 1;
      setGoals([...goals, { ...newGoal, id: newId }]);
      setNewGoal({
        title: '',
        target: '',
        current: '',
        progress: 0,
        category: 'fitness',
        notes: '',
      });
      setShowAddGoal(false);
    }
  };

  const handleUpdateProgress = (id, newProgress) => {
    const clampedProgress = Math.min(100, Math.max(0, newProgress));
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: clampedProgress } : goal
      )
    );
  };

  const handleDeleteGoal = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full md:w-1/3 lg:w-96 bg-slate-50 p-6 rounded-lg shadow-md self-start">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-slate-800">Health Goals</h2>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="text-sm bg-slate-700 text-white px-3 py-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          {showAddGoal ? 'Cancel' : '+ Add Goal'}
        </button>
      </div>

      {/* Add New Goal Form */}
      {showAddGoal && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Goal Title"
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <select
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={newGoal.category}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
          >
            {goalCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Current Value"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newGoal.current}
              onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
            />
            <input
              type="text"
              placeholder="Target Value"
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddGoal}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors"
          >
            Add Goal
          </button>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-slate-800">{goal.title}</h3>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                  {goalCategories.find((cat) => cat.value === goal.category)?.label}
                </span>
              </div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Current: {goal.current}</span>
              <span>Target: {goal.target}</span>
            </div>
            {goal.notes && (
              <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded mb-2">
                {goal.notes}
              </div>
            )}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-slate-600">
                    {goal.progress}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateProgress(goal.id, goal.progress - 5)}
                    className="text-xs bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(goal.id, goal.progress + 5)}
                    className="text-xs bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex h-2 mb-4 overflow-hidden bg-slate-200 rounded">
                <div
                  style={{ width: `${goal.progress}%` }}
                  className={`flex flex-col justify-center ${getProgressColor(
                    goal.progress
                  )} rounded transition-all duration-300`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthGoals;