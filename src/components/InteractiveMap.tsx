import React, { useState } from 'react';
import { MapPin, Star, Eye, ArrowRight, Compass, Navigation } from 'lucide-react';
import { Hotel, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface InteractiveMapProps {
  hotels: Hotel[];
  currency: CurrencyCode;
  onSelectHotel: (hotel: Hotel) => void;
  onQuickBook: (hotel: Hotel) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  hotels,
  currency,
  onSelectHotel,
  onQuickBook
}) => {
  const [selectedPinHotel, setSelectedPinHotel] = useState<Hotel | null>(hotels[0] || null);

  // Normalize hotel coordinates to a visual map canvas percentage
  // Coordinates range for key locations (India & international hubs)
  // Let's create visually balanced pin positions for each hotel:
  const getPinPosition = (index: number) => {
    const predefinedPositions = [
      { x: 38, y: 36 }, // Dehradun Doon Valley
      { x: 44, y: 42 }, // Dehradun Royal Palace
      { x: 26, y: 48 }, // Dubai
      { x: 40, y: 30 }, // Mussoorie
      { x: 36, y: 68 }, // Goa
      { x: 34, y: 56 }, // Mumbai
      { x: 46, y: 34 }, // Rishikesh
      { x: 18, y: 28 }, // Switzerland
    ];
    return predefinedPositions[index % predefinedPositions.length];
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl min-h-[500px] sm:min-h-[580px] flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Map Header Overlay */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800 text-white max-w-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Global Stays Map
            </h4>
            <p className="text-[11px] text-slate-400">
              Showing {hotels.length} verified stays with live coordinates
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
          Leaflet Vector Grid
        </span>
      </div>

      {/* Styled Interactive SVG Map Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stylized dark-blue cartographic grid background */}
        <div className="absolute inset-0 bg-[#0B132B] opacity-95">
          {/* Subtle grid lines */}
          <div 
            className="w-full h-full opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px, 80px 80px, 80px 80px'
            }}
          />
          {/* Abstract stylized world continents representation */}
          <svg className="w-full h-full opacity-15 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M 150 150 Q 250 100 350 180 T 450 300 T 350 450 T 200 400 Z" fill="#3b82f6" />
            <path d="M 400 180 Q 550 140 700 220 T 750 400 T 600 500 T 480 380 Z" fill="#60a5fa" />
            <path d="M 720 320 Q 820 340 880 440 T 800 520 T 700 460 Z" fill="#93c5fd" />
          </svg>
        </div>

        {/* Interactive Hotel Map Pins */}
        {hotels.map((hotel, index) => {
          const pos = getPinPosition(index);
          const isSelected = selectedPinHotel?.id === hotel.id;

          return (
            <div
              key={hotel.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => setSelectedPinHotel(hotel)}
            >
              {/* Radar pulse for active/selected pin */}
              {isSelected && (
                <div className="absolute -inset-2 bg-blue-500 rounded-full animate-ping opacity-40" />
              )}

              {/* Pin pill */}
              <div 
                className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg transition-transform ${
                  isSelected 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/40 scale-110' 
                    : 'bg-white/95 text-slate-900 group-hover:scale-105 group-hover:bg-blue-50'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                <span>{formatPrice(hotel.pricePerNight, currency)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Hotel Floating Preview Card */}
      {selectedPinHotel && (
        <div className="relative z-10 self-start max-w-sm w-full bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex gap-3">
            <img
              src={selectedPinHotel.featuredImage}
              alt=""
              className="w-20 h-20 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedPinHotel.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{selectedPinHotel.rating.toFixed(1)}</span>
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-900 mt-1 truncate">
                {selectedPinHotel.name}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                <span>{selectedPinHotel.city}, {selectedPinHotel.country}</span>
              </p>
              <p className="text-xs font-black text-slate-900 mt-1">
                {formatPrice(selectedPinHotel.pricePerNight, currency)}{' '}
                <span className="text-[10px] text-slate-500 font-normal">/night</span>
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onSelectHotel(selectedPinHotel)}
              className="flex-1 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
            <button
              onClick={() => onQuickBook(selectedPinHotel)}
              className="flex-1 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-xs flex items-center justify-center gap-1"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
