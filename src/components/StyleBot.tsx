
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StyleBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: 'Hi there! 👋 I\'m your personal style assistant. I can help you find the perfect outfit based on your preferences. Ask me about colors, sizes, fits, trends, or styling advice!'}
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
    
    // Process user input to generate a relevant response
    const userQuestion = input.toLowerCase();
    setInput('');
    
    // Simulate bot response based on user query
    setTimeout(() => {
      let botResponse = getBotResponse(userQuestion);
      setMessages(prev => [...prev, {type: 'bot', text: botResponse}]);
    }, 1000);
  };

  // Function to generate contextual responses based on user queries
  const getBotResponse = (query: string): string => {
    // Size-related queries
    if (query.includes('size') || query.includes('fit')) {
      return "Our clothing sizes range from XS to XXL. For most accurate sizing, please refer to the size chart on each product page. Generally, our items have a standard fit, but some collections offer relaxed or slim fits as specified in the product description. If you're between sizes, I typically recommend sizing up for a more comfortable fit.";
    }
    
    // Color-related queries
    else if (query.includes('color') || query.includes('colours')) {
      return "Our Spring/Summer collection features pastel colors like pink, lavender, and mint. For Fall/Winter, we offer rich tones like burgundy, forest green, and navy. If you're looking for versatile pieces, our neutral colors like black, white, beige, and gray are available year-round. What specific color palette are you interested in?";
    }
    
    // Model-related queries
    else if (query.includes('model') || query.includes('wear')) {
      return "Our models typically wear size S or M. Their measurements are listed on the product pages to help you compare. Remember that styling can affect how a garment appears - items may be pinned or styled for photography. If you share your measurements, I can help recommend the best size for you.";
    }
    
    // Material-related queries
    else if (query.includes('material') || query.includes('fabric')) {
      return "We use premium materials in our clothing. Our summer items feature breathable cotton, linen, and rayon blends. Winter collections include wool, cashmere, and sustainable synthetic blends. Each product page specifies the exact material composition and care instructions for the item.";
    }
    
    // Styling advice
    else if (query.includes('style') || query.includes('outfit') || query.includes('wear with')) {
      return "For styling advice, consider your occasion and comfort. Our pink pastel tops pair wonderfully with neutral bottoms like white jeans or a black skirt. Layer with a denim jacket for casual outings or a blazer for more formal settings. Would you like specific recommendations for a particular occasion?";
    }
    
    // Trending items
    else if (query.includes('trend') || query.includes('popular') || query.includes('new')) {
      return "Currently trending items include our pastel oversized cardigan, high-waisted wide-leg pants, and minimalist jewelry pieces. Our 'New Arrivals' section is updated weekly with the latest styles. The most popular items tend to sell out quickly, so I recommend signing up for notifications if your size is unavailable.";
    }
    
    // Delivery or shipping queries
    else if (query.includes('deliver') || query.includes('shipping') || query.includes('arrive')) {
      return "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days). Free shipping is available on orders over $75. You'll receive tracking information via email once your order ships.";
    }
    
    // Return policy
    else if (query.includes('return') || query.includes('exchange')) {
      return "Our return policy allows returns within 30 days of purchase. Items must be unworn with original tags attached. Exchanges are processed free of charge, while returns are subject to a small restocking fee. Would you like more specific information about our return process?";
    }
    
    // Default response for other queries
    else {
      return "I'd be happy to help with your fashion needs! I can provide information about our sizes, colors, materials, styling advice, and current trends. What specific information are you looking for today?";
    }
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
                placeholder="Ask about styles, sizes, or colors..."
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
