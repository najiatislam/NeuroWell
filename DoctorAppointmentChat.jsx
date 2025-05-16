import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorAppointmentChat = () => {
  const { doctorId, appointmentId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // Auto responses for doctor
  const doctorResponses = [
    { keywords: ['hello', 'hi', 'hey', 'greetings'], 
      response: "Hello! How are you feeling today?" },
    { keywords: ['sad', 'depressed', 'unhappy', 'down'], 
      response: "I'm sorry to hear you're feeling this way. Can you tell me more about what's been going on?" },
    { keywords: ['anxious', 'worried', 'nervous', 'stress', 'stressed'], 
      response: "Anxiety can be really challenging. What specific symptoms have you been experiencing?" },
    { keywords: ['medication', 'medicine', 'pills', 'prescription'], 
      response: "Regarding your medication, it's important to take it as prescribed. Have you been experiencing any side effects?" },
    { keywords: ['sleep', 'insomnia', 'tired', 'fatigue'], 
      response: "Sleep issues can significantly impact your mental health. How many hours are you sleeping on average?" },
    { keywords: ['thank', 'thanks', 'helpful'], 
      response: "You're welcome. I'm here to support you throughout your treatment journey." },
    { keywords: ['appointment', 'session', 'visit', 'meet'], 
      response: "I'm looking forward to our next appointment. Is there anything specific you'd like to discuss then?" },
  ];

  // Default responses when no keywords match
  const defaultDoctorResponses = [
    "Could you elaborate on that a bit more?",
    "How has this been affecting your daily activities?",
    "Have you noticed any patterns or triggers related to this?",
    "That's important information. How have you been coping with this?",
    "I understand. Have you tried any strategies to manage these feelings?",
    "Thank you for sharing that with me. How long have you been experiencing this?"
  ];
  
  // Fetch doctor and appointment info
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get appointment details
        const appointmentResponse = await axios.get(
          `${backendUrl}/api/user/appointment/${appointmentId}`,
          { headers: { token } }
        );
        
        if (appointmentResponse.data.success) {
          setAppointmentInfo(appointmentResponse.data.appointment);
          setDoctorInfo(appointmentResponse.data.appointment.docData);
          
          // Add initial welcome message if no messages exist
          setMessages([{
            _id: 'welcome',
            sender: 'doctor',
            content: `Hello! I'm Dr. ${appointmentResponse.data.appointment.docData.name}. How can I help you today?`,
            timestamp: new Date()
          }]);
        } else {
          toast.error('Failed to load appointment details');
          navigate('/my-appointments');
        }
        
        // Get chat history (commented out for now since we're simulating)
        /*
        const chatResponse = await axios.get(
          `${backendUrl}/api/user/chat-history/${appointmentId}`,
          { headers: { token } }
        );
        
        if (chatResponse.data.success) {
          setMessages(chatResponse.data.messages || []);
        }
        */
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Something went wrong. Please try again.');
        setLoading(false);
      }
    };
    
    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [appointmentId, doctorId, backendUrl, token, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Generate doctor response
  const generateDoctorResponse = (input) => {
    // Convert input to lowercase for easier matching
    const lowercaseInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const item of doctorResponses) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // If no keywords match, return a random default response
    return defaultDoctorResponses[Math.floor(Math.random() * defaultDoctorResponses.length)];
  };
  
  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      // Add user message
      const userMessage = {
        _id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate doctor typing
      setIsTyping(true);
      
      // Generate doctor response after a delay
      setTimeout(() => {
        const doctorResponse = generateDoctorResponse(newMessage);
        setMessages(prev => [...prev, {
          _id: Date.now().toString() + '-response',
          sender: 'doctor',
          content: doctorResponse,
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 2000);
      
      // Commented out actual API call since we're simulating
      /*
      // Send to server
      const response = await axios.post(
        `${backendUrl}/api/user/send-message`,
        {
          appointmentId,
          doctorId,
          content: newMessage
        },
        { headers: { token } }
      );
      
      if (response.data.success) {
        // Replace temp message with actual message from server
        setMessages(prev => 
          prev.filter(msg => !msg.isTemp).concat(response.data.message)
        );
      } else {
        toast.error('Failed to send message');
        // Remove temp message if failed
        setMessages(prev => prev.filter(msg => !msg.isTemp));
      }
      */
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-700"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto mt-8 mb-16">
      {/* Header */}
      <div className="bg-white shadow rounded-lg mb-4">
        <div className="p-4 border-b flex items-center">
          <button 
            onClick={() => navigate('/my-appointments')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          {doctorInfo && (
            <div className="flex items-center">
              <img 
                src={doctorInfo.image} 
                alt={doctorInfo.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{doctorInfo.name}</h2>
                <p className="text-sm text-gray-600">{doctorInfo.speciality}</p>
              </div>
            </div>
          )}
        </div>
        
        {appointmentInfo && (
          <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50">
            <p>
              Appointment: {new Date(appointmentInfo.date).toLocaleDateString()} | 
              {appointmentInfo.slotTime}
            </p>
          </div>
        )}
      </div>
      
      {/* Chat area */}
      <div className="bg-white shadow rounded-lg flex flex-col h-[calc(100vh-250px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div 
              key={message._id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-slate-700 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce"></div>
                  <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="bg-gray-500 rounded-full h-2 w-2 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <form onSubmit={sendMessage} className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button 
            type="submit"
            className="bg-slate-700 text-white rounded-full p-2 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorAppointmentChat;
