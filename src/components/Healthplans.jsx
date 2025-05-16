import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function HealthPlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    // Load all plans
    axios.get('http://localhost:4000/api/health-plans')
      .then(res => setPlans(res.data))
      .catch(err => toast.error('Failed to fetch plans'));

    // Load user selected plan
    if (userData?._id) {
      axios.get(`http://localhost:4000/api/user/health-plan/${userData._id}`)
        .then(res => {
          if (res.data?.planId) {
            setSelectedPlanId(res.data.planId);
          }
        })
        .catch(err => console.log('No plan selected yet'));
    }
  }, [userData]);

  const handleSelect = async (planId) => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/health-plan/select', {
        userId: userData._id,
        planId
      });
      if (res.data.success) {
        toast.success('Plan selected!');
        setSelectedPlanId(planId);
      }
    } catch (err) {
      toast.error('Failed to select plan');
    }
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-green-800 mb-4">🌿 Personalized Health Plans</h2>
      <div className="grid gap-4">
        {plans.map(plan => (
          <div key={plan.id} className={`border rounded p-4 shadow ${selectedPlanId === plan.id ? 'border-green-500 bg-green-100' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{plan.title}</h3>
              <input
                type="checkbox"
                checked={selectedPlanId === plan.id}
                onChange={() => handleSelect(plan.id)}
              />
            </div>
            <p><strong>Goal:</strong> {plan.goal}</p>
            <p><strong>Duration:</strong> {plan.duration}</p>
            <p className="font-medium mt-2">Daily Tasks:</p>
            <ul className="list-disc ml-6 text-sm text-gray-800">
              {plan.daily.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
            <p className="font-medium mt-2">Weekly Tasks:</p>
            <ul className="list-disc ml-6 text-sm text-gray-800">
              {plan.weekly.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
