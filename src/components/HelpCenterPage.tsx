import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Bot, 
  ShieldCheck, 
  LifeBuoy, 
  Send,
  FileQuestion,
  Headphones
} from 'lucide-react';
import { HELP_FAQS_DATA } from '../data/travelData';
import { SupportTicket } from '../types';

interface HelpCenterPageProps {
  onOpenAssistant: () => void;
  onExploreHotels: () => void;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({
  onOpenAssistant,
  onExploreHotels
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Support ticket form state
  const [ticketCategory, setTicketCategory] = useState('Booking Inquiry');
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketBookingId, setTicketBookingId] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  const categories = ['All', 'Bookings & Confirmation', 'Cancellations & Refunds', 'Check-in & Hotel Policies', 'Project & Engineering Architecture'];

  const allFaqs = HELP_FAQS_DATA.flatMap((cat) => 
    cat.questions.map((q) => ({ ...q, category: cat.category }))
  );

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketMessage) return;

    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
      category: ticketCategory,
      name: ticketName,
      email: ticketEmail,
      bookingId: ticketBookingId || undefined,
      subject: ticketSubject || `${ticketCategory} Request`,
      message: ticketMessage,
      status: 'Open',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    setSubmittedTicket(newTicket);
    // Reset form
    setTicketSubject('');
    setTicketMessage('');
    setTicketBookingId('');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Help Hero */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 mb-4">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>24/7 Guest Care & Support Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Can We Assist Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Travel & Booking Needs?
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Find instant answers to questions regarding reservations, free cancellations, check-in documentation, and platform architecture.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies, refunds, check-in, or payment methods..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-2xl shadow-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Support Channels Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* AI Assistant Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">AI Travel Concierge</h3>
              <p className="text-xs text-slate-500 mt-1">
                Instant interactive assistance for hotel recommendations, itinerary advice, and trip questions.
              </p>
            </div>
            <button
              onClick={onOpenAssistant}
              className="mt-4 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Chat with Assistant</span>
            </button>
          </div>

          {/* 24/7 Telephone Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Priority Helpline</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct front-desk reservation support for immediate check-in or airport transport assistance.
              </p>
            </div>
            <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-black text-slate-800 text-center">
              +91 (0135) 2770-BOH / 1800-419-STAY
            </div>
          </div>

          {/* Email Concierge */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Email Support Desk</h3>
              <p className="text-xs text-slate-500 mt-1">
                Official inquiries, academic reviews, corporate group bookings, and verified billing queries.
              </p>
            </div>
            <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-semibold text-slate-800 text-center truncate">
              support@bookourhotels.com
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordions List */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-black text-slate-900 mb-2">
              Frequently Asked Inquiries ({filteredFaqs.length})
            </h3>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
                <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No matching questions found</p>
                <p className="text-xs text-slate-400 mt-1">Try searching with other terms or submit a ticket below.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = expandedFaq === `faq-${idx}`;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : `faq-${idx}`)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Submit Support Ticket Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Headphones className="w-4 h-4" />
              <span>Need Direct Human Help?</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Create a Support Ticket
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Submit your request and our concierge team will respond within 2 hours.
            </p>

            {submittedTicket ? (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-black text-slate-900">
                  Ticket #{submittedTicket.id} Created
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Thank you, <strong className="text-slate-800">{submittedTicket.name}</strong>. A confirmation has been logged.
                </p>
                <div className="mt-3 p-3 bg-white rounded-xl text-left text-[11px] text-slate-600 border border-emerald-100 space-y-1">
                  <div><strong>Category:</strong> {submittedTicket.category}</div>
                  <div><strong>Status:</strong> <span className="text-emerald-700 font-bold">Open & Assigned</span></div>
                  <div><strong>Response Time:</strong> ~2 Hours</div>
                </div>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="Booking Inquiry">Booking Inquiry & Modification</option>
                    <option value="Cancellation / Refund">Cancellation & Refund Status</option>
                    <option value="Hotel Policy / Late Check-in">Hotel Policy & Late Check-in</option>
                    <option value="Payment / Invoice">Payment Verification & Tax Invoice</option>
                    <option value="Developer Architecture Query">BCA Project & Tech Query (Ankit Kumar)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Booking Reference ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={ticketBookingId}
                    onChange={(e) => setTicketBookingId(e.target.value)}
                    placeholder="e.g. BOH-2026-9284"
                    className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Describe Your Request
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Please include details so our support team can resolve your issue swiftly..."
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
