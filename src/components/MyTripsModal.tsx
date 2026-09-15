import React, { useState } from 'react';
import { 
  X, 
  Luggage, 
  Calendar, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Ban,
  ArrowRight
} from 'lucide-react';
import { Booking, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface MyTripsModalProps {
  bookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onCancelBooking: (bookingId: string) => void;
  onViewReceipt: (booking: Booking) => void;
  onExploreHotels: () => void;
}

export const MyTripsModal: React.FC<MyTripsModalProps> = ({
  bookings,
  isOpen,
  onClose,
  currency,
  onCancelBooking,
  onViewReceipt,
  onExploreHotels
}) => {
  if (!isOpen) return null;

  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancelConfirmId(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">My Trips & Bookings</h3>
              <p className="text-xs text-slate-500 font-medium">{bookings.length} reservations recorded</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Luggage className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No bookings found yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Ready for your next getaway? Explore luxurious resorts and boutique retreats worldwide.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreHotels();
                }}
                className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs inline-flex items-center gap-2"
              >
                <span>Explore Stays</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={booking.hotelImage}
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {booking.id}
                      </span>
                      {booking.status === 'confirmed' ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confirmed</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-rose-200">
                          <Ban className="w-3 h-3" />
                          <span>Cancelled</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{booking.hotelName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{booking.hotelCity}</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{booking.checkIn} to {booking.checkOut} ({booking.nights} nights)</span>
                    </p>
                  </div>
                </div>

                {/* Right price & controls */}
                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Paid</span>
                    <span className="text-base font-black text-slate-900">
                      {formatPrice(booking.totalAmount, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewReceipt(booking)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>

                    {booking.status === 'confirmed' && (
                      <>
                        {cancelConfirmId === booking.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleConfirmCancel(booking.id)}
                              className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition"
                            >
                              Yes, Cancel
                            </button>
                            <button
                              onClick={() => setCancelConfirmId(null)}
                              className="px-2 py-1.5 text-slate-500 hover:bg-slate-100 rounded-xl text-xs"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancelConfirmId(booking.id)}
                            className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-bold rounded-xl text-xs transition"
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
