import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Compass, 
  Tag, 
  Clock 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const TravelAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! I am your BookOurHotels Travel Assistant. How can I assist with your stay reservation or journey today?',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent contextual response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';

      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply = 'Hello! Ready to plan your next getaway? You can explore our featured destinations in Dehradun, Dubai, Goa, Mumbai, and the Swiss Alps!';
      } else if (lower.includes('cancel') || lower.includes('refund')) {
        reply = "To cancel a booking, open 'My Trips' from the top navigation and click 'Cancel' on any confirmed reservation. Cancellations within 24h of check-in are 100% free!";
      } else if (lower.includes('promo') || lower.includes('coupon') || lower.includes('discount') || lower.includes('code')) {
        reply = "Use exclusive promo code 'LUX10' for an instant 10% discount on any booking, or 'ANKIT15' for 15% student & developer discount!";
      } else if (lower.includes('dehradun') || lower.includes('valley') || lower.includes('uttaranchal')) {
        reply = "For Dehradun stays, we recommend 'Doon Valley Retreat' on Rajpur Road (heated pool, mountain views) or 'The Royal Palace' in Subhash Nagar!";
      } else if (lower.includes('payment') || lower.includes('card') || lower.includes('upi')) {
        reply = 'We support all major payment methods in simulated mode, including Credit/Debit cards and auto-generated booking vouchers with downloadable receipts!';
      } else if (lower.includes('creator') || lower.includes('who built') || lower.includes('developer') || lower.includes('ankit')) {
        reply = 'This BookOurHotels platform was engineered by Full Web Dev - Ankit Kumar (BCA IV SEM, Uttaranchal School of Computing Sciences, Uttaranchal University).';
      } else {
        reply = "I'd be glad to assist with that! You can filter hotels by price, amenities, or view hotel locations on the interactive map.";
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const quickPills = [
    'Promo codes?',
    'Stays in Dehradun',
    'How to cancel?',
    'Who built this?'
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        id="travel-assistant-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Travel Assistant"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center z-40 transition-all cursor-pointer group"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          id="chatWindow"
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 max-h-[540px]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight leading-tight">Travel Assistant</h4>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Instant Answers 24/7</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex gap-1.5 overflow-x-auto">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSend(pill)}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-full text-[11px] font-semibold shrink-0 transition"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs min-h-[260px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              id="chatInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about hotels, discounts..."
              className="flex-1 bg-slate-100 text-xs p-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white outline-none"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
