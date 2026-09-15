import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Hotel, CurrencyCode, User, Booking } from '../types';
import { formatPrice, calculateNights } from '../lib/formatters';

interface BookingPaymentModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  currentUser: User | null;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
  initialRoomType: string;
  onBookingSuccess: (newBooking: Booking) => void;
}

export const BookingPaymentModal: React.FC<BookingPaymentModalProps> = ({
  hotel,
  isOpen,
  onClose,
  currency,
  currentUser,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  initialRoomType,
  onBookingSuccess
}) => {
  if (!isOpen || !hotel) return null;

  // Form states
  const [cardName, setCardName] = useState(currentUser?.name || 'John Doe');
  const [cardPhone, setCardPhone] = useState(currentUser?.phone || '9876543210');
  const [userEmail, setUserEmail] = useState(currentUser?.email || 'traveler@gmail.com');
  const [cardNumber, setCardNumber] = useState('4532 8921 4432 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Timer: 5 minutes countdown as shown in report page 38
  const [timeLeft, setTimeLeft] = useState(300);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(300);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nights = calculateNights(initialCheckIn, initialCheckOut);
  const basePrice = hotel.pricePerNight * nights;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const taxes = Math.round((basePrice - discountAmount) * 0.12);
  const totalAmount = basePrice - discountAmount + taxes;

  // Format Card Number (space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      val = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    setCardExpiry(val);
  };

  // Apply promo code (support LUX10 or ANKIT15)
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUX10') {
      setDiscountPercent(10);
      setPromoMessage('10% Luxury discount applied successfully!');
    } else if (code === 'ANKIT15' || code === 'ANKIT') {
      setDiscountPercent(15);
      setPromoMessage('15% Developer VIP discount applied!');
    } else if (code === 'BOH20') {
      setDiscountPercent(20);
      setPromoMessage('20% Flash sale discount applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid coupon code. Try LUX10');
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic client-side validation
    if (cardNumber.replace(/\s/g, '').length < 15) {
      setErrorMsg('Please enter a valid 16-digit card number.');
      return;
    }
    if (cardPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    // Simulate safe instant processing
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      const newBooking: Booking = {
        id: `BOH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelCity: `${hotel.city}, ${hotel.country}`,
        hotelImage: hotel.featuredImage,
        userId: currentUser?.id || 'guest-1',
        userName: cardName,
        userEmail: userEmail,
        userPhone: cardPhone,
        checkIn: initialCheckIn,
        checkOut: initialCheckOut,
        nights,
        guests: initialGuests,
        roomName: initialRoomType,
        basePrice,
        discount: discountAmount,
        totalAmount,
        currency,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        promoApplied: discountPercent > 0 ? promoCode.toUpperCase() : undefined
      };

      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Dark Trip Summary (matching Project Report Page 38) */}
        <div className="md:w-5/12 bg-[#0B1120] text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800/60">
                Booking Step 2/2
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-6">
              Trip Summary
            </h2>

            {/* Hotel Mini Card */}
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 flex items-center gap-3.5 mb-6">
              <img
                src={hotel.featuredImage}
                alt={hotel.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white truncate">{hotel.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{hotel.city}, {hotel.country}</p>
                <p className="text-[11px] text-blue-400 font-semibold mt-1">{initialRoomType}</p>
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Check In
                </label>
                <p className="font-bold text-sm text-white">{initialCheckIn}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Check Out
                </label>
                <p className="font-bold text-sm text-white">{initialCheckOut}</p>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="mb-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Promo / Coupon Code
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. LUX10"
                  className="flex-grow bg-slate-800/80 border border-slate-700 text-xs sm:text-sm p-2.5 rounded-xl uppercase tracking-wider text-white placeholder-slate-500 outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  APPLY
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] mt-2 font-medium flex items-center gap-1 ${
                  discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>{promoMessage}</span>
                </p>
              )}
            </div>
          </div>

          {/* Breakdown & Total */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>{nights} {nights === 1 ? 'night' : 'nights'} stay</span>
              <span className="text-white font-medium">{formatPrice(basePrice, currency)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span>-{formatPrice(discountAmount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes & Service Fees (12%)</span>
              <span className="text-white font-medium">{formatPrice(taxes, currency)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800/80 text-white">
              <span className="font-bold text-base">Total Due</span>
              <span className="font-black text-2xl text-white">
                {formatPrice(totalAmount, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Details Form */}
        <div className="md:w-7/12 bg-white p-6 sm:p-8 flex flex-col justify-between relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center justify-between mb-6 pr-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Payment Details
                </h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit SSL encrypted secure checkout</span>
                </p>
              </div>

              {/* 05:00 countdown timer badge */}
              <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Cardholder Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ankit Kumar"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={cardPhone}
                    onChange={(e) => setCardPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    placeholder="9876543210"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Guest Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirmation Email Address
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="ankit@example.com"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                  <CreditCard className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Expiry & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full p-3 text-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    placeholder="123"
                    className="w-full p-3 text-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono tracking-widest outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Simulation mode: No actual bank charges will be levied. Test cards accepted.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Reservation...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatPrice(totalAmount, currency)} Now</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
