// components/PersonalizedHealthPlan.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; // Assuming AppContext provides backendUrl
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications

const PersonalizedHealthPlan = ({ userId }) => {
  const [medicalHistory, setMedicalHistory] = useState('');
  const [goals, setGoals] = useState('');
  const [plan, setPlan] = useState(null);

  // Get backendUrl from AppContext
  const { backendUrl } = useContext(AppContext);

  // Optional: Create an axios instance with a base URL if needed
  // const api = axios.create({
  //     baseURL: backendUrl ? `${backendUrl}/api/healthplans` : '/api/healthplans',
  // });


  // Effect to fetch existing plan when component mounts or userId/backendUrl changes
  useEffect(() => {
    const fetchPlan = async () => {
      // Ensure userId and backendUrl are available before fetching
      if (!userId || !backendUrl) {
          // Optionally handle case where userId or backendUrl is missing initially
          console.log("UserId or backendUrl not available to fetch plan.");
          return;
      }
      try {
        // Use axios directly with full URL or rely on proxy
        const res = await axios.get(`${backendUrl}/api/healthplans/${userId}`);
        if (res.data.success && res.data.plan) {
          // When fetching, convert arrays from backend back to comma-separated strings for inputs
          // Ensure they are arrays before joining
          const fetchedMedicalHistory = Array.isArray(res.data.plan.medicalHistory) ? res.data.plan.medicalHistory : [];
          const fetchedGoals = Array.isArray(res.data.plan.goals) ? res.data.plan.goals : [];

          setMedicalHistory(fetchedMedicalHistory.join(', ')); // Join with space for readability
          setGoals(fetchedGoals.join(', ')); // Join with space for readability
          setPlan(res.data.plan.recommendedPlan);
        } else if (res.data.success === false && res.data.message === 'No health plan found') {
            // Explicitly handle 404 case - clear inputs and plan display
             setMedicalHistory('');
             setGoals('');
             setPlan(null); // Clear the plan display
        }
      } catch (err) {
        console.error('Error fetching health plan:', err);
         // Handle errors, potentially clear plan if fetch fails
         setMedicalHistory('');
         setGoals('');
         setPlan(null); // Clear the plan display on fetch error
        // Optionally show a toast error: toast.error("Failed to fetch existing plan.");
      }
    };

    fetchPlan();
  }, [userId, backendUrl]); // Depend on userId and backendUrl

  // Handler for form submission (Generate Plan button click)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form page reload

    // Ensure userId and backendUrl are available before submitting
     if (!userId || !backendUrl) {
         toast.error("User data or backend URL is missing.");
         return;
     }

    try {
      // Prepare data to send to the backend
      const dataToSend = {
        userId,
        // Split input strings into arrays and trim whitespace before sending
        medicalHistory: medicalHistory.split(',').map(s => s.trim()).filter(item => item !== ''), // Filter out empty strings
        goals: goals.split(',').map(s => s.trim()).filter(item => item !== ''), // Filter out empty strings
      };

      // Make the POST request to the backend API
      // Use axios directly with the full URL
      const res = await axios.post(`${backendUrl}/api/healthplans/create`, dataToSend);

      // Check if the request was successful
      if (res.data.success) {
          setPlan(res.data.plan.recommendedPlan); // Update state with the generated plan
          toast.success("Health plan generated successfully!"); // Show success message
      } else {
          // Handle backend reported errors (e.g., missing fields, though backend does this)
          toast.error(res.data.message || "Failed to generate plan.");
      }

    } catch (err) {
      console.error('Error generating plan:', err); // Log the error
      toast.error("An error occurred while generating the plan."); // Show error message to user
       setPlan(null); // Clear the plan display on generation error
    }
  };

  return (
    // The JSX structure for the health plan section
    <div className="bg-white p-4 mt-6 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Personalized Health Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Medical History (comma-separated):</label>
          <input
            type="text"
            className="w-full border p-2"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="e.g., anxiety, depression"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Goals (comma-separated):</label>
          <input
            type="text"
            className="w-full border p-2"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
             placeholder="e.g., stress relief, better focus"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Generate Plan
        </button>
      </form>

      {/* Conditionally render the plan display area */}
      {plan && (
        <div className="mt-4 p-3 border bg-gray-50 rounded">
          <h3 className="font-semibold mb-1">Recommended Plan:</h3>
          {/* Using <pre> to preserve line breaks from the generated plan string */}
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{plan}</pre>
        </div>
      )}

       {/* Optional: Message if no plan is currently displayed */}
       {!plan && (
           <div className="mt-4 p-3 text-gray-600 text-sm italic">
               Enter your medical history and goals above to generate your personalized plan.
           </div>
       )}
    </div>
  );
};

export default PersonalizedHealthPlan;