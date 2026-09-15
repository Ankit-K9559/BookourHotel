import React from 'react';
import { X, Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Hotel, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface SavedHotelsModalProps {
  savedHotels: Hotel[];
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onRemoveSaved: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
}

export const SavedHotelsModal: React.FC<SavedHotelsModalProps> = ({
  savedHotels,
  isOpen,
  onClose,
  currency,
  onRemoveSaved,
  onSelectHotel
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Saved Properties</h3>
              <p className="text-xs text-slate-500 font-medium">{savedHotels.length} places on your wishlist</p>
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
        <div className="p-6 overflow-y-auto space-y-3">
          {savedHotels.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Tap the heart icon on any hotel card to bookmark stays for your upcoming dream vacations.
              </p>
            </div>
          ) : (
            savedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition flex items-center justify-between gap-4"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectHotel(hotel);
                  }}
                  className="flex items-center gap-3.5 cursor-pointer min-w-0 flex-1"
                >
                  <img
                    src={hotel.featuredImage}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate hover:text-blue-600 transition">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{hotel.city}, {hotel.country}</span>
                    </p>
                    <p className="text-xs font-bold text-blue-600 mt-1">
                      {formatPrice(hotel.pricePerNight, currency)} <span className="text-[10px] text-slate-400 font-normal">/night</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHotel(hotel);
                    }}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold rounded-xl text-xs transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onRemoveSaved(hotel.id)}
                    title="Remove from wishlist"
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
