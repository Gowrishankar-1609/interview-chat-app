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

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <SessionHeader startTime={sessionStartTime} />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-4">
        <ChatInterface messages={messages} onAddMessage={addMessage} />
      </div>
    </div>
  );
};

export default InterviewPage;
