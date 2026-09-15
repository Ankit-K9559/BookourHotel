import React, { useState } from 'react';
import { Building2, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PageTab } from '../types';

interface FooterProps {
  onExploreHotels: () => void;
  onOpenAdmin: () => void;
  onTabChange?: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExploreHotels,
  onOpenAdmin,
  onTabChange
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          {/* Brand & Project Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Book<span className="text-blue-600">Ours</span>Hotels
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An online travel and accommodation reservation platform engineered with React, Tailwind CSS, and Supabase database integration. Delivering seamless hotel searches, instant booking verification, and transparent administrative control.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified BCA Major Project (2025–2026)</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-bold text-slate-900 text-sm">Explore Pages</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('stays') : onExploreHotels()} 
                  className="hover:text-blue-600 transition cursor-pointer"
                >
                  Hotels & Stays
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('destinations') : onExploreHotels()} 
                  className="hover:text-blue-600 transition cursor-pointer"
                >
                  Top Destinations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('deals') : onExploreHotels()} 
                  className="hover:text-blue-600 transition cursor-pointer"
                >
                  Flash Deals & Coupons
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('packages') : onExploreHotels()} 
                  className="hover:text-blue-600 transition cursor-pointer"
                >
                  Tour Packages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('rewards') : onExploreHotels()} 
                  className="hover:text-blue-600 transition cursor-pointer"
                >
                  Club Rewards
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-blue-600 transition cursor-pointer font-semibold text-slate-700">
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-bold text-slate-900 text-sm">Support & Legal</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('help') : null} 
                  className="hover:text-blue-600 transition cursor-pointer text-left"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange ? onTabChange('help') : null} 
                  className="hover:text-blue-600 transition cursor-pointer text-left"
                >
                  Submit Support Ticket
                </button>
              </li>
              <li>
                <span className="hover:text-blue-600 cursor-pointer">Cancellation Policy</span>
              </li>
              <li>
                <span className="hover:text-blue-600 cursor-pointer">Terms & Conditions</span>
              </li>
              <li>
                <span className="hover:text-blue-600 cursor-pointer">Privacy Notice</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (Page 35 in project report) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-slate-900 text-sm">
              Get exclusive inspiration for your next stay
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subscribe to our private newsletter for member-only flash discounts and secret destination guides.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  id="newsEmail"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-blue-600 focus:bg-white text-slate-800 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </div>

              {subscribed && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you! You are subscribed to BookOurHotels updates.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Developer Attribution & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-center md:text-left">
            <p className="font-semibold text-slate-800">
              Build by Full Web Dev - Ankit Kumar
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Enrollment No: UU2409000044 • BCA-IV-F • Uttaranchal School of Computing Sciences
            </p>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <p>© 2026 BookOurHotels. All rights reserved.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Designed with React, Tailwind CSS, & Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
