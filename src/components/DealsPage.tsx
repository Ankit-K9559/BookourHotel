import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  Clock, 
  Percent, 
  Sparkles, 
  Gift, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  Building2,
  BadgeCheck
} from 'lucide-react';
import { PromoDeal, Hotel, CurrencyCode } from '../types';
import { PROMO_DEALS_DATA } from '../data/travelData';
import { formatPrice } from '../lib/formatters';

interface DealsPageProps {
  hotels: Hotel[];
  currency: CurrencyCode;
  onBookWithPromo: (hotel: Hotel, promoCode: string) => void;
  onExploreHotels: () => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  hotels,
  currency,
  onBookWithPromo,
  onExploreHotels
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Real-time ticking countdown timer (14 hours, 32 minutes, 15 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSelectDeal = (deal: PromoDeal) => {
    // Find an appropriate hotel for this deal
    let matchedHotel = hotels[0];
    if (deal.applicableCities.includes('Dehradun')) {
      matchedHotel = hotels.find((h) => h.city === 'Dehradun') || hotels[0];
    } else if (deal.applicableCities.includes('Dubai')) {
      matchedHotel = hotels.find((h) => h.city === 'Dubai') || hotels[0];
    } else if (deal.applicableCities.includes('Goa')) {
      matchedHotel = hotels.find((h) => h.city === 'Goa') || hotels[0];
    }
    onBookWithPromo(matchedHotel, deal.code);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Header with Countdown */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-4 animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>Limited-Time Flash Deals & Coupons</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Unlock Verified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-300">
              Discounts Up to 20%
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Apply member coupon codes at checkout to save on mountain retreats in Dehradun, beachside villas in Goa, or luxury duplex suites in Dubai.
          </p>

          {/* Flash Sale Countdown Clock */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Flash Offers Reset In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-black text-white">
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMO_DEALS_DATA.map((deal) => {
            const isAnkit = deal.code === 'ANKIT15';
            return (
              <div
                key={deal.id}
                className={`bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden ${
                  isAnkit 
                    ? 'border-blue-400 ring-2 ring-blue-500/20 shadow-lg' 
                    : 'border-slate-200/90 shadow-xs'
                }`}
              >
                {/* Decorative Top Accent */}
                {isAnkit && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                    ★ Developer VIP Discount
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200/80">
                      {deal.tag}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Valid for next {deal.expiresInHours}h
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {deal.title}
                  </h3>
                  
                  <div className="mt-2 text-2xl font-black text-blue-600">
                    {deal.discountDescription}
                  </div>

                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    {deal.description}
                  </p>

                  {/* Applicable Destinations */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Applicable in:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {deal.applicableCities.map((city, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Promo Code Box & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span className="font-mono font-black text-sm tracking-wider text-slate-900">
                        {deal.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(deal.code)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      {copiedCode === deal.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleSelectDeal(deal)}
                    className="w-full py-3 bg-slate-900 hover:bg-blue-600 active:scale-95 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Book with {deal.code}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                Are you a Student or University Faculty Member?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                Code <strong className="text-slate-800 font-mono">ANKIT15</strong> applies an unconditional 15% discount for academic stays across Dehradun, Rishikesh, and partner hotels, courtesy of Uttaranchal University BCA project sponsorship.
              </p>
            </div>
          </div>

          <button
            onClick={onExploreHotels}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shrink-0 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Browse All Accommodations
          </button>
        </div>
      </section>
    </div>
  );
};
