import React, { useState } from 'react';
import { 
  Award, 
  Crown, 
  Sparkles, 
  Gift, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  Coffee, 
  Clock, 
  ArrowUpRight,
  Plane,
  BadgeCheck,
  Zap,
  Info
} from 'lucide-react';
import { User, Booking, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface RewardsPageProps {
  currentUser: User | null;
  bookings: Booking[];
  currency: CurrencyCode;
  onOpenAuth: () => void;
  onExploreHotels: () => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({
  currentUser,
  bookings,
  currency,
  onOpenAuth,
  onExploreHotels
}) => {
  // Calculate dynamic points: 100 points for every ₹1,000 spent on confirmed bookings
  // Default base 450 points for demo user if no bookings yet
  const totalSpentINR = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const basePoints = currentUser ? 450 : 0;
  const earnedPoints = Math.round(totalSpentINR / 10); // 10% in points
  const currentPoints = basePoints + earnedPoints;

  // Determine tier
  let tier: 'Silver Traveler' | 'Gold Elite' | 'Platinum Royal' = 'Silver Traveler';
  let nextTierPoints = 1200;
  let progressPercent = Math.min(100, Math.round((currentPoints / 1200) * 100));

  if (currentPoints >= 3000) {
    tier = 'Platinum Royal';
    nextTierPoints = 5000;
    progressPercent = Math.min(100, Math.round(((currentPoints - 3000) / 2000) * 100));
  } else if (currentPoints >= 1200) {
    tier = 'Gold Elite';
    nextTierPoints = 3000;
    progressPercent = Math.min(100, Math.round(((currentPoints - 1200) / 1800) * 100));
  }

  // State for redeemed rewards
  const [redeemedCode, setRedeemedCode] = useState<{ title: string; code: string } | null>(null);

  const rewardVouchers = [
    {
      id: 'rw-credit-500',
      title: '₹500 Instant Stay Credit',
      pointsCost: 400,
      description: 'Deducted directly from any domestic booking in Dehradun, Rishikesh, or Mussoorie.',
      code: 'REWARD500'
    },
    {
      id: 'rw-transfer',
      title: 'Free Airport Chauffeur Transfer',
      pointsCost: 650,
      description: 'Complimentary one-way pickup or drop to Jolly Grant Airport Dehradun or Dubai DXB.',
      code: 'AIRPORTFREE'
    },
    {
      id: 'rw-dinner',
      title: 'Gourmet Valley Dinner for Two',
      pointsCost: 950,
      description: 'Enjoy a 3-course chef dinner at any partner resort fine-dining restaurant.',
      code: 'CHEFDINNER'
    },
    {
      id: 'rw-spa',
      title: 'Ayurvedic Spa & Wellness Session',
      pointsCost: 1100,
      description: '60-minute relaxing Ayurvedic massage at Ganga Serenity or Doon Valley Retreat.',
      code: 'SPAPASSVIP'
    }
  ];

  const handleRedeem = (voucher: typeof rewardVouchers[0]) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (currentPoints < voucher.pointsCost) {
      alert(`You need ${voucher.pointsCost - currentPoints} more points to redeem this reward! Keep booking stays to earn more points.`);
      return;
    }
    setRedeemedCode({ title: voucher.title, code: voucher.code });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Rewards Hero */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-4">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>BookOurHotels Club Loyalty Program</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Elevate Your Journeys with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-300">
              VIP Member Privileges
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Earn 100 Reward Points for every ₹1,000 spent across verified stays. Enjoy room upgrades, complimentary breakfasts, late checkout, and luxury transfer credits.
          </p>

          {!currentUser && (
            <div className="mt-8">
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-blue-500/30 cursor-pointer"
              >
                Sign In to Unlock Member Tier & Points
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Rewards Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Tier & Points Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* User Profile / Status */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Current Member Status
              </span>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                  <Crown className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {tier}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {currentUser ? currentUser.name : 'Guest Traveler'}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Points Balance */}
            <div className="md:border-x border-slate-100 md:px-6">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Club Points Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-600 font-mono">
                  {currentPoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Points
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Value: ~₹{(currentPoints * 1.2).toFixed(0)} in travel credits
              </p>
            </div>

            {/* Progress to Next Tier */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">Next Tier Progress</span>
                <span className="text-blue-600">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Earn <strong className="text-slate-700 font-bold">{Math.max(0, nextTierPoints - currentPoints)}</strong> more points to reach next tier.
              </p>
            </div>
          </div>
        </div>

        {/* Tier Benefits Comparison Matrix */}
        <div className="mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Membership Tiers & Exclusive Privileges
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Unlock progressive hospitality privileges as you explore more destinations with BookOurHotels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver Tier */}
            <div className={`bg-white rounded-3xl p-6 border transition-all ${tier === 'Silver Traveler' ? 'border-blue-400 ring-2 ring-blue-500/10 shadow-md' : 'border-slate-200'}`}>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Silver Traveler</h3>
              <p className="text-xs text-slate-500 mt-0.5">0 – 1,199 Points</p>
              
              <div className="mt-5 space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5% Member Rate Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant Booking Confirmation Voucher</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>✕ Late Check-out privilege</span>
                </div>
              </div>
            </div>

            {/* Gold Tier */}
            <div className={`bg-white rounded-3xl p-6 border transition-all ${tier === 'Gold Elite' ? 'border-amber-400 ring-2 ring-amber-500/20 shadow-lg' : 'border-slate-200'}`}>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
                <Crown className="w-5 h-5 fill-amber-400" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Gold Elite</h3>
                <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">1,200 – 2,999 Points</p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>10% Member Rate Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary Daily Breakfast Buffet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Late Check-out until 2:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Early Check-in priority</span>
                </div>
              </div>
            </div>

            {/* Platinum Royal Tier */}
            <div className={`bg-white rounded-3xl p-6 border transition-all ${tier === 'Platinum Royal' ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-lg' : 'border-slate-200'}`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Platinum Royal</h3>
              <p className="text-xs text-slate-500 mt-0.5">3,000+ Points</p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>15% Flat VIP Discount on All Stays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary Suite Room Upgrade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Airport Transfers (Jolly Grant / DXB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Cancellation Fees Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Redemption Store */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Redeem Your Points for Travel Credits
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Convert your accumulated points into instant discount vouchers and complimentary experiences.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">Available Balance: </span>
              <span className="text-base font-black text-blue-600">{currentPoints} Points</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardVouchers.map((voucher) => {
              const canAfford = currentPoints >= voucher.pointsCost;
              return (
                <div
                  key={voucher.id}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        {voucher.pointsCost} Pts
                      </span>
                      <Gift className="w-4 h-4 text-slate-400" />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {voucher.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {voucher.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeem(voucher)}
                    className={`mt-4 w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                      canAfford
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                  >
                    <span>{canAfford ? 'Redeem Voucher' : `Need ${voucher.pointsCost - currentPoints} more pts`}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redemption Code Pop-up */}
      {redeemedCode && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setRedeemedCode(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Voucher Claimed!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {redeemedCode.title} is now ready to apply at checkout.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl font-mono text-sm font-black text-blue-600 select-all">
              {redeemedCode.code}
            </div>

            <button
              onClick={() => {
                setRedeemedCode(null);
                onExploreHotels();
              }}
              className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Apply to Hotel Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
