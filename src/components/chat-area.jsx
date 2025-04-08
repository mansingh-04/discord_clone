"use client"

import React, { useState, useRef, useEffect } from "react";
import "../style.css";

// Create a fixed avatar for the current user to avoid it changing on re-renders
const currentUserAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser`;

const initialMessages = [
  {
    id: 1,
    user: { id: "user1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
    content: "Hey everyone! How's it going?",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    user: { id: "user2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
    content: "Great! Just joined the server. Excited to be here!",
    timestamp: "10:32 AM"
  }
];

const ChatArea = ({ channel }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: { 
          id: "currentUser", 
          name: "You", 
          avatar: currentUserAvatar // Use the fixed avatar
        },
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h2>#{channel?.name || 'general'}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <div className="message-avatar">
              <img src={msg.user.avatar} alt={msg.user.name} />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author">{msg.user.name}</span>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <form onSubmit={handleSendMessage} className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder={`Message #${channel?.name || 'general'}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
