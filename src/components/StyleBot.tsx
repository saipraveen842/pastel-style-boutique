
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StyleBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: 'Hi there! 👋 I\'m your personal style assistant. I can help you find the perfect outfit based on your preferences. What style or colors are you looking for today?'}
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, {type: 'user', text: input}]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'll help you find items that match your style! Let me show you some options based on your preferences.";
      setMessages(prev => [...prev, {type: 'bot', text: botResponse}]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 bg-pastel-pink text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary transition-colors duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 h-96 bg-white rounded-xl pastel-shadow z-50 flex flex-col">
          {/* Header */}
          <div className="bg-pastel-pink text-primary-foreground p-4 rounded-t-xl">
            <h3 className="font-semibold">Style Assistant</h3>
            <p className="text-xs opacity-80">Ask me for fashion recommendations</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-pastel-pink text-primary-foreground' 
                      : 'bg-pastel-gray text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-pastel-pink/20">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about styles or colors..."
                className="flex-1 p-2 rounded-l-lg border border-pastel-pink/30 focus:outline-none focus:border-primary"
              />
              <Button 
                type="submit" 
                className="rounded-l-none rounded-r-lg bg-pastel-pink text-primary-foreground"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StyleBot;
