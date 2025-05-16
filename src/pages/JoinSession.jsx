import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const JoinSession = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Instead of fetching appointment details, we'll just use the ID
  const [showMeeting, setShowMeeting] = useState(false);

  // Check if user is logged in
  React.useEffect(() => {
    if (!token) {
      toast.error('Please login to join the session');
      navigate('/login');
    }
  }, [token, navigate]);

  // Generate a meeting room based on appointment ID
  const getMeetingUrl = () => {
    return `https://meet.jit.si/HealthApp-Appointment-${id}`;
  };

  const handleJoinVideoCall = () => {
    window.open(getMeetingUrl(), '_blank');
    setShowMeeting(true);
  };

  const handleJoinAudioCall = () => {
    toast.info('Joining audio-only. Please turn off your camera when joining.');
    window.open(getMeetingUrl(), '_blank');
    setShowMeeting(true);
  };

  const handleJoinChat = () => {
    toast.info('Chat feature coming soon!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-slate-300 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Join Appointment Session</h1>
        
        <div className="mb-4 text-center">
          <p className="font-medium">Appointment ID: {id}</p>
          <p className="text-sm text-gray-600 mt-2">
            You're about to join a virtual appointment session.
          </p>
        </div>
        
        {showMeeting ? (
          <div className="mb-4 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-green-700 font-medium">Meeting joined successfully!</p>
            <p className="text-sm mt-2">
              If your meeting didn't open automatically, 
              <button 
                onClick={() => window.open(getMeetingUrl(), '_blank')}
                className="text-blue-600 underline ml-1"
              >
                click here
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <button 
              onClick={handleJoinVideoCall}
              className="w-40 px-4 py-2 bg-blue-600 text-white shadow-lg rounded-lg hover:bg-blue-700"
            >
              Join via Video Call
            </button>
            <button 
              onClick={handleJoinAudioCall}
              className="w-40 px-4 py-2 bg-green-600 text-white shadow-lg rounded-lg hover:bg-green-700"
            >
              Join via Audio Call
            </button>
            <button 
              onClick={handleJoinChat}
              className="w-40 px-4 py-2 bg-slate-600 text-white shadow-lg rounded-lg hover:bg-gray-700"
            >
              Join via Chat
            </button>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/my-appointments')}
            className="text-blue-600 hover:underline"
          >
            Back to My Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinSession;
