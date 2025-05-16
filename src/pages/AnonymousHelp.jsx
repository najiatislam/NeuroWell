import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const AnonymousHelp = () => {
  const navigate = useNavigate();
  const [showResources, setShowResources] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Anonymous Help Banner */}
      <div className="bg-blue-100 p-4 mb-8 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-600">
            <span className="font-semibold">Your privacy is protected.</span> All interactions on this page are anonymous and confidential.
          </p>
        </div>
      </div>

      {/* Main heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Anonymous Support</h1>
      
      {/* Description */}
      <p className="text-gray-600 mb-8">
        We understand that seeking help can be difficult. This anonymous platform allows you to access resources 
        and support without sharing your personal information. Your wellbeing matters, and help is available 
        whenever you're ready.
      </p>

      {/* Anonymous Chat Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Anonymous Chat Support</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <p className="text-gray-600 mb-4">
            Connect with a trained counselor who can provide immediate support without requiring your personal details.
            Our counselors are available 24/7 and conversations are never recorded or tracked back to you.
          </p>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors duration-200"
            onClick={() => setShowChatBot(true)}
          >
            Start Anonymous Chat Session
          </button>
        </div>
      </div>

      {/* ChatBot Component */}
      <ChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />

      {/* Crisis Text Line */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Anonymous Text Support</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            If you prefer texting, you can reach out to the Crisis Text Line. This service is completely anonymous 
            and provides support for any type of crisis.
          </p>
          <div className="bg-blue-600 text-white p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-blue-500 p-2 rounded-full">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Text HOME to 741741</h2>
                <p className="text-white/80">Crisis Text Line - Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anonymous Resources Button */}
      <div className="mb-8">
        <button 
          onClick={() => setShowResources(!showResources)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-lg text-lg font-semibold transition-colors duration-200 flex justify-between items-center"
        >
          <span>View Anonymous Self-Help Resources</span>
          <svg 
            className={`h-6 w-6 transform transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showResources && (
          <div className="mt-4 bg-white rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Anonymous Online Support Groups</h3>
              <p className="text-gray-600">Join moderated forums where you can share experiences and receive support without revealing your identity.</p>
              <a 
                href="https://www.7cups.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                Visit 7 Cups
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">Self-Assessment Tools</h3>
              <p className="text-gray-600">Take anonymous mental health screenings to better understand what you're experiencing.</p>
              <a 
                href="https://screening.mhanational.org/screening-tools/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                Mental Health Screenings
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">Meditation Resources</h3>
              <p className="text-gray-600">Access free guided meditations to help manage stress and anxiety.</p>
              <a 
                href="https://www.calm.com/breathe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                Calm Breathing Exercise
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Grounding Exercise Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Anonymous Grounding Exercise</h2>
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">5-4-3-2-1 Technique</h3>
          <p className="text-gray-600">
            This exercise helps bring your attention to the present moment when feeling overwhelmed
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-3">
            <li><strong>5:</strong> Acknowledge FIVE things you see around you</li>
            <li><strong>4:</strong> Acknowledge FOUR things you can touch around you</li>
            <li><strong>3:</strong> Acknowledge THREE things you hear</li>
            <li><strong>2:</strong> Acknowledge TWO things you can smell</li>
            <li><strong>1:</strong> Acknowledge ONE thing you can taste</li>
          </ol>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 italic">
            "Taking a moment to ground yourself can help restore a sense of calm and control."
          </p>
        </div>
      </div>

      {/* Return to Home */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default AnonymousHelp;
