import React from 'react';
import { Heart, Star, MapPin, ArrowRight, Layers } from 'lucide-react';
import { Hotel, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface HotelCardProps {
  hotel: Hotel;
  currency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (hotelId: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onQuickBook: (hotel: Hotel) => void;
  isCompared?: boolean;
  onToggleCompare?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  currency,
  isSaved,
  onToggleSave,
  onSelectHotel,
  onQuickBook,
  isCompared = false,
  onToggleCompare
}) => {
  return (
    <div 
      id={`hotel-card-${hotel.id}`}
      className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
        isCompared 
          ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
          : 'border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300'
      }`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={hotel.featuredImage}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Heart Button */}
        <button
          type="button"
          aria-label="Save hotel"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(hotel.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-600 transition shadow-sm hover:scale-110 active:scale-95 z-10 cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Compare Toggle Pill */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(hotel);
            }}
            title={isCompared ? 'Remove from comparison' : 'Compare this hotel'}
            className={`absolute top-3 right-14 px-2 py-1 rounded-lg backdrop-blur-md text-[11px] font-bold flex items-center gap-1 transition shadow-sm cursor-pointer z-10 ${
              isCompared
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-bold tracking-wide">
          {hotel.category}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{hotel.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({hotel.reviewCount})</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{hotel.city}, {hotel.country}</span>
          </div>

          {/* Hotel Name */}
          <h3 
            onClick={() => onSelectHotel(hotel)}
            className="text-base font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer line-clamp-1"
          >
            {hotel.name}
          </h3>

          {/* Description Excerpt */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[11px] font-medium">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer: Pricing & Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">
                {formatPrice(hotel.pricePerNight, currency)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectHotel(hotel)}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => onQuickBook(hotel)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-xs flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
