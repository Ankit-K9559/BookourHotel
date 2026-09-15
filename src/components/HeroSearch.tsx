import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  SlidersHorizontal, 
  LayoutGrid, 
  Map as MapIcon, 
  ShieldCheck, 
  RefreshCw, 
  Headphones 
} from 'lucide-react';
import { CurrencyCode, SearchFilters } from '../types';
import { formatPrice, getToday, getNextDay } from '../lib/formatters';

interface HeroSearchProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  currency: CurrencyCode;
  activeView: 'grid' | 'map';
  onViewChange: (view: 'grid' | 'map') => void;
  onSearchSubmit: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  currency,
  activeView,
  onViewChange,
  onSearchSubmit
}) => {
  const quickLocations = ['Dehradun', 'Dubai', 'Goa', 'Mumbai', 'Mussoorie', 'Switzerland'];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Background Decorative Ambient Circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-indigo-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Title and Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Paradise</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Experience the world’s best stays, tailored for you.
          </p>
        </div>

        {/* Primary Search Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-4 sm:p-6 transition-all">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          >
            {/* Location Input */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Location</span>
              </label>
              <div className="relative">
                <input
                  id="search-location-input"
                  type="text"
                  value={filters.location}
                  onChange={(e) => onFilterChange({ location: e.target.value })}
                  placeholder="City, Hotel, or landmark..."
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 font-medium text-sm px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            </div>

            {/* Dates (Check-in & Check-out) */}
            <div className="md:col-span-3 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>Check In</span>
                </label>
                <input
                  id="search-checkin-date"
                  type="date"
                  value={filters.checkIn || getToday()}
                  min={getToday()}
                  onChange={(e) => onFilterChange({ checkIn: e.target.value })}
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium px-2.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>Check Out</span>
                </label>
                <input
                  id="search-checkout-date"
                  type="date"
                  value={filters.checkOut || getNextDay()}
                  min={filters.checkIn || getToday()}
                  onChange={(e) => onFilterChange({ checkOut: e.target.value })}
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium px-2.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Guests & Max Price Slider */}
            <div className="md:col-span-3 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Guests</span>
                </label>
                <select
                  id="search-guests-select"
                  value={filters.guests}
                  onChange={(e) => onFilterChange({ guests: Number(e.target.value) })}
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium px-3 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3 text-blue-600" />
                    <span>Max Price</span>
                  </label>
                  <span className="text-xs font-bold text-blue-600">
                    {formatPrice(filters.maxPrice, currency)}
                  </span>
                </div>
                <input
                  id="search-price-range"
                  type="range"
                  min={2000}
                  max={50000}
                  step={1000}
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                />
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-2 flex items-end">
              <button
                id="search-submit-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Destination Chips & View Toggle (Grid / Map) */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-slate-500 font-medium">Popular:</span>
              {quickLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    onFilterChange({ location: loc });
                    onSearchSubmit();
                  }}
                  className={`px-2.5 py-1 rounded-lg transition font-semibold ${
                    filters.location.toLowerCase() === loc.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
              {filters.location && (
                <button
                  type="button"
                  onClick={() => onFilterChange({ location: '' })}
                  className="text-xs text-rose-500 hover:underline font-medium ml-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                id="toggle-grid-view-btn"
                onClick={() => onViewChange('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeView === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                id="toggle-map-view-btn"
                onClick={() => onViewChange('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeView === 'map'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Value Props - As documented in Project Report Page 32 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/80 p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Best Price Guarantee</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                We ensure you get the lowest rates. If you find a lower price online, we'll match it instantly.
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Flexible Bookings</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Plans change. That's why we offer free cancellation on 90% of our properties up to 24 hours prior.
              </p>
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">24/7 Global Support</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our travel experts are available around the clock to help you with your journey, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
