import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Download, 
  Building2, 
  Calendar, 
  User, 
  MapPin, 
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { Booking, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface ReceiptModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  booking,
  isOpen,
  onClose,
  currency
}) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text/json receipt download
    const receiptContent = `==============================================
BOOKOURSHOTELS - OFFICIAL STAY CONFIRMATION
BCA Major Project • Uttaranchal University
Lead Developer: Ankit Kumar (Full Web Dev)
==============================================
Booking Reference: ${booking.id}
Date Generated: ${new Date().toLocaleDateString()}
Status: ${booking.status.toUpperCase()}

PROPERTY DETAILS:
Hotel: ${booking.hotelName}
Location: ${booking.hotelCity}
Room: ${booking.roomName}

GUEST DETAILS:
Primary Guest: ${booking.userName}
Phone: ${booking.userPhone}
Email: ${booking.userEmail}
Guests: ${booking.guests}

STAY ITINERARY:
Check-in: ${booking.checkIn} (From 2:00 PM)
Check-out: ${booking.checkOut} (Until 11:00 AM)
Duration: ${booking.nights} Night(s)

PAYMENT SUMMARY:
Base Rate: ${formatPrice(booking.basePrice, currency)}
Discount: -${formatPrice(booking.discount, currency)}
Total Paid: ${formatPrice(booking.totalAmount, currency)}
Payment Method: Online Card (Simulated)
Promo Applied: ${booking.promoApplied || 'None'}
==============================================
Thank you for booking with BookOurHotels!
24/7 Support Hotline: 1800-BOOK-STAY
`;
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Booking_Voucher_${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Official Booking Receipt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              title="Download text voucher"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              title="Print Voucher"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div id="printableReceipt" className="p-6 sm:p-8 space-y-6">
          {/* Success Banner */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Booking Confirmed!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your reservation has been securely recorded. Confirmation has been dispatched.
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-lg border border-blue-200">
              Ref ID: {booking.id}
            </div>
          </div>

          {/* Hotel Details Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5">
            <img
              src={booking.hotelImage}
              alt=""
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate">{booking.hotelName}</h4>
              <p className="text-xs text-slate-500 mt-0.5 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" />
                <span>{booking.hotelCity}</span>
              </p>
              <span className="text-[11px] font-semibold text-blue-600 mt-1 block">
                {booking.roomName}
              </span>
            </div>
          </div>

          {/* Itinerary Matrix */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Check-in</span>
              <p className="font-bold text-slate-800">{booking.checkIn}</p>
              <span className="text-[10px] text-slate-500">From 2:00 PM</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Check-out</span>
              <p className="font-bold text-slate-800">{booking.checkOut}</p>
              <span className="text-[10px] text-slate-500">Until 11:00 AM</span>
            </div>
          </div>

          {/* Guest Info */}
          <div className="p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Lead Guest:</span>
              <span className="font-bold text-slate-900">{booking.userName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Phone:</span>
              <span className="font-medium text-slate-800">{booking.userPhone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-medium text-slate-800 truncate">{booking.userEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Guests:</span>
              <span className="font-medium text-slate-800">{booking.guests} Guest(s)</span>
            </div>
          </div>

          {/* Payment & Breakdown */}
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Nights Stayed:</span>
              <span className="font-medium text-slate-800">{booking.nights} Night(s)</span>
            </div>
            {booking.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Promo Discount ({booking.promoApplied}):</span>
                <span>-{formatPrice(booking.discount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-900 font-bold text-sm">
              <span>Amount Paid:</span>
              <span className="text-blue-600 text-base">{formatPrice(booking.totalAmount, currency)}</span>
            </div>
          </div>

          {/* Footer note & Creator tag */}
          <div className="text-center pt-3 border-t border-slate-100 text-[10px] text-slate-400">
            <p>BookOurHotels platform • Verified reservation</p>
            <p className="mt-0.5 font-medium text-slate-500">
              Build by Full Web Dev - Ankit Kumar
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
