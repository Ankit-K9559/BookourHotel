import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Utensils, 
  Car, 
  Compass,
  CheckCircle2,
  X
} from 'lucide-react';
import { TravelPackage, CurrencyCode } from '../types';
import { TRAVEL_PACKAGES_DATA } from '../data/travelData';
import { formatPrice } from '../lib/formatters';

interface PackagesPageProps {
  currency: CurrencyCode;
  onBookCustomPackage: (pkg: TravelPackage, travelers: number, totalPrice: number) => void;
  onExploreHotels: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  currency,
  onBookCustomPackage,
  onExploreHotels
}) => {
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>('pkg-doon-himalayas');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    'pkg-doon-himalayas': 2,
    'pkg-rishikesh-wellness': 2,
    'pkg-dubai-skyline': 2,
    'pkg-goa-beach': 2,
    'pkg-swiss-alps': 2
  });

  const [bookingSuccessModal, setBookingSuccessModal] = useState<{
    pkg: TravelPackage;
    travelers: number;
    totalAmount: number;
  } | null>(null);

  const categories = ['All', 'Mountain Escape', 'Luxury & Skyline', 'Beach & Coastal', 'Spiritual Wellness', 'Alpine Adventure'];

  const filteredPackages = TRAVEL_PACKAGES_DATA.filter((pkg) => {
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  const handleTravelerChange = (pkgId: string, delta: number) => {
    setTravelerCounts((prev) => {
      const current = prev[pkgId] || 2;
      const next = Math.max(1, Math.min(8, current + delta));
      return { ...prev, [pkgId]: next };
    });
  };

  const handleReserve = (pkg: TravelPackage) => {
    const travelers = travelerCounts[pkg.id] || 2;
    const total = pkg.basePriceINR * travelers;
    setBookingSuccessModal({
      pkg,
      travelers,
      totalAmount: total
    });
    onBookCustomPackage(pkg, travelers, total);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80"
            alt="Travel packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>All-Inclusive Curated Itineraries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Seamless Vacation Packages <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Stay, Meals, & Sightseeing Included
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminate trip planning stress with handpicked travel bundles. Every package features certified 4 & 5-star hotel accommodations, daily breakfast, private chauffeur airport transfers, and guided local landmark tours.
          </p>

          {/* Category Filter Chips */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="space-y-8">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            const travelers = travelerCounts[pkg.id] || 2;
            const packageTotal = pkg.basePriceINR * travelers;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Package Photo */}
                  <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-900">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-md">
                        {pkg.category}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black shadow-md flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{pkg.duration}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({pkg.reviewsCount} travelers)</span>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{pkg.destination}</span>
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        {pkg.title}
                      </h3>

                      {/* Package Inclusions Grid */}
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                          What is Included in This Package:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {pkg.inclusions.map((inc, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {pkg.highlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100/60"
                          >
                            ★ {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Itinerary Accordion Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setExpandedPkgId(isExpanded ? null : pkg.id)}
                        className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-blue-600" />
                          <span>{isExpanded ? 'Hide Day-by-Day Itinerary' : `View Full ${pkg.days}-Day Itinerary Schedule`}</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Expandable Itinerary Drawer */}
                      {isExpanded && (
                        <div className="mt-4 space-y-3 p-4 bg-slate-50/60 rounded-2xl border border-slate-200/80 animate-in fade-in duration-200">
                          {pkg.itinerary.map((day) => (
                            <div key={day.day} className="flex gap-3 text-xs">
                              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-[11px]">
                                D{day.day}
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900">{day.title}</h5>
                                <p className="text-slate-500 mt-0.5 leading-relaxed">{day.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pricing, Travelers, and Booking Trigger */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Price Per Person */}
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-slate-900">
                            {formatPrice(pkg.basePriceINR, currency)}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ person</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Total: <strong className="text-blue-600 font-bold">{formatPrice(packageTotal, currency)}</strong> for {travelers} {travelers === 1 ? 'Guest' : 'Guests'}
                        </p>
                      </div>

                      {/* Traveler Counter & Reserve CTA */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Traveler count controller */}
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                          <button
                            type="button"
                            onClick={() => handleTravelerChange(pkg.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-2xs hover:bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-slate-800">
                            {travelers} {travelers === 1 ? 'Guest' : 'Guests'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleTravelerChange(pkg.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white shadow-2xs hover:bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleReserve(pkg)}
                          className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Reserve Package</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Package Reservation Confirmation Pop-up */}
      {bookingSuccessModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setBookingSuccessModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Package Reservation Registered
            </span>

            <h3 className="text-xl font-black text-slate-900 mt-3">
              {bookingSuccessModal.pkg.title}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              Your inquiry for <strong className="text-slate-800">{bookingSuccessModal.travelers} Guests</strong> ({formatPrice(bookingSuccessModal.totalAmount, currency)}) has been saved in your travel ledger. Our Dehradun travel concierge will follow up with itinerary passes.
            </p>

            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl text-left text-xs border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{bookingSuccessModal.pkg.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-bold text-slate-800">{bookingSuccessModal.pkg.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Travel Package ID:</span>
                <span className="font-mono font-bold text-blue-600">PKG-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>

            <button
              onClick={() => setBookingSuccessModal(null)}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
