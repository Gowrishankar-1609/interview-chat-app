// src/pages/InterviewPage.jsx
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import SessionHeader from '../components/SessionHeader';

const InterviewPage = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'text',
      content: 'Welcome to your interview session! Please introduce yourself.',
      sender: 'interviewer',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ]);

  const [sessionStartTime] = useState(new Date());
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Sample interviewer responses
  const interviewerResponses = [
    "That's interesting. Can you tell me more about your experience with that?",
    "Great! How did you handle challenges in your previous role?",
    "I see. What would you say is your biggest strength?",
    "Can you walk me through a project you're particularly proud of?",
    "How do you stay updated with the latest technologies?",
    "What motivates you in your work?",
    "Tell me about a time when you had to work under pressure.",
    "How do you approach problem-solving?",
    "What are your career goals for the next few years?",
    "Do you have any questions about our company or this role?"
  ];

  const generateInterviewerResponse = () => {
    if (isInterviewerSpeaking) return;
    
    setIsInterviewerSpeaking(true);
    
    // Get random response
    const randomResponse = interviewerResponses[Math.floor(Math.random() * interviewerResponses.length)];
    
    // Add text message
    const responseMessage = {
      id: Date.now().toString(),
      type: 'text',
      content: randomResponse,
      sender: 'interviewer',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, responseMessage]);
    
    // Convert text to speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomResponse);
      
      // Configure speech settings
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Try to use a professional-sounding voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.lang.startsWith('en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        setIsInterviewerSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsInterviewerSpeaking(false);
        console.error('Speech synthesis error');
      };
      
      // Small delay before speaking
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 500);
    } else {
      setIsInterviewerSpeaking(false);
      console.warn('Speech synthesis not supported');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <SessionHeader startTime={sessionStartTime} />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-4">
        <ChatInterface 
          messages={messages} 
          onAddMessage={addMessage}
          onInterviewerResponse={generateInterviewerResponse}
        />
      </div>
      
      {/* Speaking indicator */}
      {isInterviewerSpeaking && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm">Interviewer speaking...</span>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
