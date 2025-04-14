
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StyleBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: 'Hi there! 👋 I\'m your personal style assistant. I can help you find the perfect outfit based on your preferences. Ask me about colors, sizes, fits, trends, or styling advice!'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response based on user query
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = getBotResponse(userQuestion);
      setMessages(prev => [...prev, {type: 'bot', text: botResponse}]);
    }, 1000);
  };

  // Function to generate contextual responses based on user queries
  const getBotResponse = (query: string): string => {
    // Size-related queries
    if (query.includes('size') || query.includes('fit') || query.includes('measurement')) {
      if (query.includes('chart') || query.includes('guide')) {
        return "Our size chart can be found on each product page. For tops, XS (0-2), S (4-6), M (8-10), L (12-14), XL (16-18). For bottoms, we recommend measuring your waist and hips. Most of our pants include stretch for comfort. Would you like me to help you find your perfect size in a specific item?";
      }
      if (query.includes('run') || query.includes('small') || query.includes('large')) {
        return "Our dresses and tops tend to run true to size, while some of our premium denim may run slightly small as they're designed to stretch with wear. Our loungewear collections are cut more generously for comfort. If you're between sizes, I usually recommend sizing up for a more comfortable fit. Would you like sizing advice for a specific item?";
      }
      return "Our clothing sizes range from XS to XXL. For most accurate sizing, please refer to the size chart on each product page. Generally, our items have a standard fit, but some collections offer relaxed or slim fits as specified in the product description. If you're between sizes, I typically recommend sizing up for a more comfortable fit. Do you need help with a specific garment type?";
    }
    
    // Color-related queries
    else if (query.includes('color') || query.includes('colours') || query.includes('palette')) {
      if (query.includes('season') || query.includes('spring') || query.includes('summer') || query.includes('fall') || query.includes('winter')) {
        return "Our Spring/Summer collection features pastel colors like pink, lavender, mint, and soft yellows. For Fall/Winter, we have rich jewel tones like burgundy, forest green, navy, and plum. For the current season, our bestselling colors are sage green, dusty pink, and sky blue. Would you like to see pieces in a specific color?";
      }
      if (query.includes('trend') || query.includes('popular')) {
        return "This season's trending colors include sage green, lavender, butter yellow, and soft coral. Our most popular neutrals are always ivory, camel, and black. For special occasions, metallic accents and sequins in champagne and rose gold are very popular. Would you like recommendations for pieces in any of these colors?";
      }
      return "Our current collection features pastel colors like pink, lavender, and mint for Spring/Summer. For Fall/Winter, we offer rich tones like burgundy, forest green, and navy. If you're looking for versatile pieces, our neutral colors like black, white, beige, and gray are available year-round. Would you like recommendations for a specific color palette or occasion?";
    }
    
    // Style-related queries
    else if (query.includes('style') || query.includes('outfit') || query.includes('wear with') || query.includes('match') || query.includes('pair')) {
      if (query.includes('casual') || query.includes('everyday') || query.includes('weekend')) {
        return "For casual styling, our bestselling wide-leg pants pair beautifully with a simple tucked-in tee or tank top. Add our oversized cardigan for cooler days. For weekend outfits, try our straight-leg jeans with a chunky knit sweater and ankle boots. Would you like more casual outfit ideas?";
      }
      if (query.includes('work') || query.includes('office') || query.includes('professional')) {
        return "For office wear, our tailored trousers with a silk blouse create a polished look. Add a fitted blazer for important meetings. Our wrap dresses are also perfect for professional settings - just add low heels and minimal jewelry. Would you like me to suggest specific work-appropriate pieces from our collection?";
      }
      if (query.includes('date') || query.includes('night out') || query.includes('special')) {
        return "For date nights, our slip dresses in satin or silk create an elegant silhouette. Pair with strappy heels and delicate jewelry. For a special occasion, consider our midi dress with a statement clutch and classic pumps. Would you like more recommendations for evening looks?";
      }
      return "For styling advice, I'd need to know the specific piece or occasion you're interested in. Our pink pastel tops pair wonderfully with neutral bottoms like white jeans or a black skirt. Layer with a denim jacket for casual outings or a blazer for more formal settings. Would you like specific recommendations for a particular item or event?";
    }
    
    // Material-related queries
    else if (query.includes('material') || query.includes('fabric') || query.includes('quality')) {
      if (query.includes('sustainable') || query.includes('eco') || query.includes('ethical')) {
        return "We're committed to sustainability! Our Eco Collection features organic cotton, recycled polyester, and Tencel™ lyocell from responsibly harvested wood. All our denim is now produced using water-saving techniques, and we're transitioning to low-impact dyes across all collections. Would you like to explore our sustainable pieces?";
      }
      if (query.includes('care') || query.includes('wash') || query.includes('maintain')) {
        return "For most of our cotton items, machine washing on cold with similar colors and air drying is recommended. Our cashmere and wool pieces should be hand washed or dry cleaned. Silk and satin items typically require gentle hand washing or professional care. Each product page includes specific care instructions for that item. Can I help with care instructions for a specific material?";
      }
      return "We use premium materials in our clothing. Our summer items feature breathable cotton, linen, and rayon blends. Winter collections include wool, cashmere, and sustainable synthetic blends. Our activewear uses moisture-wicking performance fabrics, and our formal pieces often include silk and satin. Each product page specifies the exact material composition and care instructions. What type of material are you interested in?";
    }
    
    // Sale or price queries
    else if (query.includes('sale') || query.includes('discount') || query.includes('offer') || query.includes('price') || query.includes('deal')) {
      if (query.includes('when') || query.includes('next')) {
        return "Our next major sale will begin at the end of the current season. However, we offer exclusive discounts to our newsletter subscribers year-round. We also have a special sale section on our website with items discounted up to 50% off! Would you like me to direct you to our current sale items?";
      }
      if (query.includes('code') || query.includes('coupon')) {
        return "You can try code WELCOME10 for 10% off your first order! For our loyal customers, we periodically send exclusive coupon codes via email. Make sure you're subscribed to our newsletter to receive these special offers. Would you like to know about any current promotions?";
      }
      return "We currently have a sale section with items discounted up to 50% off! Our end-of-season sales typically offer the deepest discounts, but we also have special promotions for holidays and events. Sign up for our newsletter to get notified about upcoming sales and receive exclusive offers. Would you like me to recommend some great items from our current sale?";
    }
    
    // Trending items or new arrivals
    else if (query.includes('trend') || query.includes('popular') || query.includes('new') || query.includes('arrival')) {
      if (query.includes('accessory') || query.includes('accessories') || query.includes('jewelry')) {
        return "Our trending accessories this season include chunky chain necklaces, hoop earrings in various sizes, and crossbody bags in bright colors. For a subtle trend, try our delicate layered necklaces or pearl-accented pieces. Would you like to see our bestselling accessories?";
      }
      if (query.includes('outerwear') || query.includes('jacket') || query.includes('coat')) {
        return "This season's most popular outerwear includes our oversized wool coat, cropped leather jacket, and the ultra-versatile trench coat. For a more casual look, our quilted puffer jackets and shackets (shirt jackets) are flying off the shelves. Would you like recommendations for any specific outerwear style?";
      }
      return "Currently trending items include our pastel oversized cardigan, high-waisted wide-leg pants, and minimalist jewelry pieces. Our newest arrivals feature floral print dresses, linen blend separates, and statement accessories. The most popular items tend to sell out quickly, so I recommend signing up for notifications if your size is unavailable. Would you like to browse our new arrivals?";
    }
    
    // Shipping or delivery queries
    else if (query.includes('deliver') || query.includes('shipping') || query.includes('arrive') || query.includes('order')) {
      if (query.includes('international') || query.includes('worldwide') || query.includes('global')) {
        return "Yes, we ship internationally to over 100 countries! International shipping typically takes 7-14 business days, and customs fees may apply depending on your location. You can view the exact shipping rates to your country during checkout. Would you like information about shipping to a specific country?";
      }
      if (query.includes('track') || query.includes('status')) {
        return "You can track your order by clicking the tracking link in your shipping confirmation email or by logging into your account on our website. If you haven't received a shipping confirmation within 2 business days, please contact our customer service team who will be happy to assist you.";
      }
      if (query.includes('free')) {
        return "We offer free standard shipping on all orders over $75! This applies to domestic orders only. International orders and expedited shipping options have additional fees that are calculated at checkout based on your location and selected shipping method.";
      }
      return "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days). Free standard shipping is available on orders over $75. You'll receive tracking information via email once your order ships. Is there something specific about our shipping policy you'd like to know?";
    }
    
    // Return policy
    else if (query.includes('return') || query.includes('exchange') || query.includes('refund')) {
      if (query.includes('how') || query.includes('process')) {
        return "To initiate a return, log into your account, go to your order history, and select 'Return Items.' Follow the prompts to generate a return label. Pack your items in their original condition with tags attached, affix the return label, and drop off at any shipping location. Refunds are typically processed within 10-14 days of receiving your return.";
      }
      if (query.includes('time') || query.includes('long') || query.includes('days')) {
        return "You have 30 days from the delivery date to return most items. Sale items marked as 'Final Sale' cannot be returned. Gift returns are eligible for store credit only. Special occasion dresses have a 14-day return window and must be unworn with tags attached.";
      }
      return "Our return policy allows returns within 30 days of purchase. Items must be unworn with original tags attached. Exchanges are processed free of charge, while returns are subject to a small restocking fee. Sale items marked as 'Final Sale' are not eligible for return. Would you like more specific information about our return process?";
    }
    
    // Generic product questions
    else if (query.includes('dress') || query.includes('top') || query.includes('jeans') || query.includes('pants') || query.includes('skirt')) {
      return "We have a wonderful selection of that item! Our dresses range from casual day styles to elegant evening options. Our tops include everything from basic tees to statement blouses. For bottoms, we offer various fits from skinny to wide-leg. Could you tell me more about what style, occasion, or color you're looking for so I can make better recommendations?";
    }
    
    // Default response for other queries
    else {
      return "I'd be happy to help with your fashion needs! I can provide information about our sizes, colors, materials, styling advice, current trends, sales, shipping policies, and return process. What specific information are you looking for today? Feel free to ask about any product or service we offer.";
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
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-pastel-gray text-foreground rounded-lg px-4 py-2 max-w-[80%]">
                  <span className="flex space-x-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-75">.</span>
                    <span className="animate-bounce delay-150">.</span>
                  </span>
                </div>
              </div>
            )}
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
