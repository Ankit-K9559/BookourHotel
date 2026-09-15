import React, { useState } from 'react';
import { 
  MapPin, 
  Sun, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Plane, 
  Thermometer, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Destination, CurrencyCode } from '../types';
import { DESTINATIONS_DATA } from '../data/travelData';
import { formatPrice } from '../lib/formatters';

interface DestinationsPageProps {
  currency: CurrencyCode;
  onSelectDestination: (cityName: string) => void;
  onExploreHotels: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  currency,
  onSelectDestination,
  onExploreHotels
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Uttarakhand' | 'International' | 'Metro'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterByRegion = (dest: Destination) => {
    if (selectedRegion === 'Uttarakhand') {
      return dest.name === 'Dehradun' || dest.name === 'Mussoorie' || dest.name === 'Rishikesh';
    }
    if (selectedRegion === 'International') {
      return dest.name === 'Dubai' || dest.name.includes('Interlaken') || dest.name === 'Goa';
    }
    if (selectedRegion === 'Metro') {
      return dest.name === 'Mumbai' || dest.name === 'Dubai';
    }
    return true;
  };

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesRegion = filterByRegion(dest);
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.stateCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80"
            alt="Travel destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Destination Guides</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Explore Inspiring <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                World-Class Getaways
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              From the tranquil pine foothills of Dehradun and the sacred waters of Rishikesh to the futuristic towers of Dubai and snowy Swiss peaks — discover insider highlights, ideal travel seasons, and luxury stays.
            </p>

            {/* Quick Search & Region Filters */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, country, or mountain range..."
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm px-4 py-3 rounded-xl outline-none focus:border-blue-400 focus:bg-white/15"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {(['All', 'Uttarakhand', 'International', 'Metro'] as const).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      selectedRegion === region
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {region === 'Uttarakhand' ? 'Himalayas & Doon' : region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-md mb-12">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">7 Handpicked Cities</p>
              <p className="text-[11px] text-slate-500">Verified luxury resorts</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Live Weather Insight</p>
              <p className="text-[11px] text-slate-500">Season-optimized advice</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Best Rate Guarantee</p>
              <p className="text-[11px] text-slate-500">Zero booking fee policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Seamless Transfers</p>
              <p className="text-[11px] text-slate-500">Jolly Grant & Dubai DXB</p>
            </div>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="space-y-8">
          {filteredDestinations.map((dest, idx) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group"
            >
              {/* Media Thumbnail */}
              <div className="lg:w-2/5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                
                {/* Weather Pill */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{dest.temperature} • {dest.weather}</span>
                </div>

                {/* Stays Count Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  {dest.hotelsCount} Verified {dest.hotelsCount === 1 ? 'Stay' : 'Stays'}
                </div>
              </div>

              {/* Information Body */}
              <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.stateCountry}</span>
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Best: {dest.bestSeason}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-3">
                    {dest.description}
                  </p>

                  {/* Top Attractions */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Highlights & Landmarks:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.topAttractions.map((attr, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium"
                        >
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Insider Travel Tip */}
                  <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100/80 text-xs text-blue-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Insider Travel Tip: </span>
                      <span className="text-slate-700">{dest.travelTip}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Average accommodation rate
                    </span>
                    <span className="text-base font-black text-slate-900">
                      ~{formatPrice(dest.avgPriceINR, currency)} <span className="text-xs text-slate-500 font-normal">/ night</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectDestination(dest.name)}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Stays in {dest.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
