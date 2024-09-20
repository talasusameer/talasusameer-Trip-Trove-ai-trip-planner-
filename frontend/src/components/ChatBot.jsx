import React, { useState, useEffect, useRef } from 'react';
import { getChatResponse } from "../lib/gemini/GenAI.js";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // State for typing effect
  const chatContainerRef = useRef(null); // Ref for the chat container

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Start typing effect

    try {
      const response = await getChatResponse(
        newMessages.map(message => ({
          role: message.role,
          parts: [{ text: message.text }]
        }))
      );
      setMessages([...newMessages, { role: "model", text: response }]);
    } catch (error) {
      console.error("Error during chatbot interaction:", error);
    } finally {
      setIsTyping(false); // End typing effect
    }
  };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        {isOpen ? 'Close Chat' : 'Chat'}
      </button>

      {isOpen && (
        <div className="bg-white w-80 h-96 p-4 rounded-lg shadow-lg mt-2 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <div className="flex-1 mt-4 overflow-y-auto" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <p className={message.role === 'user' ? 'bg-blue-100 p-2 rounded-lg inline-block' : 'bg-gray-100 p-2 rounded-lg inline-block'}>
                  {message.text}
                </p>
              </div>
            ))}
            {isTyping && ( // Show typing effect
              <div className="text-left mb-2">
                <p className="bg-gray-100 p-2 rounded-lg inline-block">Bot is typing...</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send message on Enter key press
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
