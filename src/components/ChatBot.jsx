import React, { useState, useRef, useEffect } from 'react';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello, I'm here to listen and support you. How are you feeling today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto responses based on keywords
  const responses = [
    { keywords: ['sad', 'depressed', 'unhappy', 'down'], 
      response: "I'm sorry to hear you're feeling this way. It's important to acknowledge these feelings. Would you like to talk more about what's causing you to feel sad?" },
    { keywords: ['anxious', 'worried', 'nervous', 'stress', 'stressed'], 
      response: "Anxiety can be really challenging. Taking slow, deep breaths might help in the moment. Would you like to share what's making you feel anxious?" },
    { keywords: ['angry', 'mad', 'frustrated'], 
      response: "It sounds like you're feeling frustrated. Sometimes expressing these feelings can help process them. What triggered these emotions?" },
    { keywords: ['help', 'suicide', 'hurt', 'die', 'kill'], 
      response: "I'm concerned about what you're sharing. Please remember that immediate help is available. Would you like me to provide resources for immediate support? You can also call the National Suicide Prevention Lifeline at 988 or 1-800-273-8255." },
    { keywords: ['thank', 'thanks', 'helpful'], 
      response: "You're welcome. I'm here to support you whenever you need to talk." },
    { keywords: ['bye', 'goodbye', 'exit', 'quit'], 
      response: "Take care of yourself. Remember, you can return to this chat anytime you need support." },
  ];

  // Default responses when no keywords match
  const defaultResponses = [
    "Can you tell me more about that?",
    "How long have you been feeling this way?",
    "What do you think might help you feel better right now?",
    "That sounds difficult. Would you like to explore some coping strategies together?",
    "I'm here to listen. Please feel free to share whatever is on your mind.",
    "Your feelings are valid. Would you like to talk about what might be causing them?"
  ];

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input) => {
    // Convert input to lowercase for easier matching
    const lowercaseInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const item of responses) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // If no keywords match, return a random default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md h-[600px] flex flex-col">
        {/* Chat header */}
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold">Anonymous Support Chat</h2>
              <p className="text-xs text-blue-100">Confidential & Secure</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 text-gray-800 rounded-lg rounded-tl-none px-4 py-2">
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
        
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        
        {/* Disclaimer */}
        <div className="px-4 py-2 bg-gray-100 text-xs text-gray-500 text-center rounded-b-xl">
          This is an AI assistant for support purposes only. For emergencies, please call 911 or your local emergency number.
        </div>
      </div>
    </div>
  );
};

export default ChatBot;



