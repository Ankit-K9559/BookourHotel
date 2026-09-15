import React from 'react';
import { 
  X, 
  Check, 
  Star, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Building2,
  Trash2
} from 'lucide-react';
import { Hotel, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface HotelCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareHotels: Hotel[];
  onRemoveHotel: (hotelId: string) => void;
  onClearAll: () => void;
  currency: CurrencyCode;
  onQuickBook: (hotel: Hotel) => void;
}

export const HotelCompareModal: React.FC<HotelCompareModalProps> = ({
  isOpen,
  onClose,
  compareHotels,
  onRemoveHotel,
  onClearAll,
  currency,
  onQuickBook
}) => {
  if (!isOpen) return null;

  const allAmenitiesList = [
    'Free Wi-Fi',
    'Heated Pool',
    'Spa & Wellness',
    'Mountain Views',
    'Breakfast Included',
    'Airport Shuttle',
    'Valet Parking',
    'Beachfront',
    'Rooftop Pool',
    'Fine Dining'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Compare Accommodations
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Comparing {compareHotels.length} {compareHotels.length === 1 ? 'Property' : 'Properties'} side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareHotels.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto flex-1">
          {compareHotels.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">No hotels selected for comparison</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Click the "Compare" checkbox on any hotel card to benchmark rates, ratings, and luxury amenities side-by-side.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition cursor-pointer"
              >
                Browse Hotels
              </button>
            </div>
          ) : (
            <div className="min-w-[620px]">
              {/* Hotel Columns Grid */}
              <div className={`grid grid-cols-${compareHotels.length + 1} gap-4 pb-6 border-b border-slate-100`}>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider self-end pb-2">
                  Properties
                </div>

                {compareHotels.map((hotel) => (
                  <div key={hotel.id} className="relative group">
                    <button
                      onClick={() => onRemoveHotel(hotel.id)}
                      title="Remove from comparison"
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 text-slate-600 hover:text-red-600 hover:bg-white shadow-xs flex items-center justify-center transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/80">
                      <img
                        src={hotel.featuredImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {hotel.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="truncate">{hotel.city}, {hotel.country}</span>
                    </p>

                    <div className="mt-2 text-base font-black text-slate-900">
                      {formatPrice(hotel.pricePerNight, currency)}
                      <span className="text-xs text-slate-500 font-normal"> / night</span>
                    </div>

                    <button
                      onClick={() => onQuickBook(hotel)}
                      className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Rows Comparison */}
              <div className="divide-y divide-slate-100 text-xs">
                {/* Rating row */}
                <div className={`grid grid-cols-${compareHotels.length + 1} gap-4 py-3 items-center`}>
                  <div className="font-bold text-slate-500">Guest Rating</div>
                  {compareHotels.map((h) => (
                    <div key={h.id} className="flex items-center gap-1 text-slate-900 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{h.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal text-[11px]">({h.reviewCount})</span>
                    </div>
                  ))}
                </div>

                {/* Category row */}
                <div className={`grid grid-cols-${compareHotels.length + 1} gap-4 py-3 items-center`}>
                  <div className="font-bold text-slate-500">Category</div>
                  {compareHotels.map((h) => (
                    <div key={h.id} className="text-slate-800 font-medium">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {h.category}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Available Rooms */}
                <div className={`grid grid-cols-${compareHotels.length + 1} gap-4 py-3 items-center`}>
                  <div className="font-bold text-slate-500">Live Availability</div>
                  {compareHotels.map((h) => (
                    <div key={h.id} className="text-slate-800 font-semibold">
                      <span className="text-emerald-600 font-bold">{h.availableRooms} Suites</span> remaining
                    </div>
                  ))}
                </div>

                {/* Cancellation Policy */}
                <div className={`grid grid-cols-${compareHotels.length + 1} gap-4 py-3 items-center`}>
                  <div className="font-bold text-slate-500">Cancellation Policy</div>
                  {compareHotels.map((h) => (
                    <div key={h.id} className="text-slate-700 text-[11px]">
                      100% Free cancellation up to 24h before 2 PM check-in
                    </div>
                  ))}
                </div>

                {/* Amenities Rows */}
                {allAmenitiesList.map((amenity) => (
                  <div key={amenity} className={`grid grid-cols-${compareHotels.length + 1} gap-4 py-2.5 items-center`}>
                    <div className="text-slate-600">{amenity}</div>
                    {compareHotels.map((h) => {
                      const hasAmenity = h.amenities.some(
                        (a) => a.toLowerCase().includes(amenity.toLowerCase()) || amenity.toLowerCase().includes(a.toLowerCase())
                      );
                      return (
                        <div key={h.id}>
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                              <Check className="w-4 h-4" />
                              <span>Yes</span>
                            </span>
                          ) : (
                            <span className="text-slate-300 font-medium text-xs">
                              —
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
