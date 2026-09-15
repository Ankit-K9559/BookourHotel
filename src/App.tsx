import React, { useState, useEffect, useMemo } from 'react';
import { 
  Hotel, 
  Booking, 
  User, 
  CurrencyCode, 
  SearchFilters,
  PageTab,
  Review,
  TravelPackage
} from './types';
import { INITIAL_HOTELS, INITIAL_REVIEWS } from './data/initialHotels';
import { getToday, getNextDay } from './lib/formatters';
import { isSupabaseConfigured } from './lib/supabase';

// Components
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { HotelCard } from './components/HotelCard';
import { HotelDetailModal } from './components/HotelDetailModal';
import { BookingPaymentModal } from './components/BookingPaymentModal';
import { ReceiptModal } from './components/ReceiptModal';
import { MyTripsModal } from './components/MyTripsModal';
import { SavedHotelsModal } from './components/SavedHotelsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { InteractiveMap } from './components/InteractiveMap';
import { TravelAssistantChat } from './components/TravelAssistantChat';
import { AuthModal } from './components/AuthModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { Footer } from './components/Footer';

// New Feature Pages & Comparison Modal
import { DestinationsPage } from './components/DestinationsPage';
import { DealsPage } from './components/DealsPage';
import { PackagesPage } from './components/PackagesPage';
import { RewardsPage } from './components/RewardsPage';
import { HelpCenterPage } from './components/HelpCenterPage';
import { HotelCompareModal } from './components/HotelCompareModal';

// Icons for category filters
import { 
  Sparkles, 
  Waves, 
  Flower2, 
  Wifi, 
  Mountain, 
  Crown, 
  Palmtree,
  ArrowUpDown,
  SearchX,
  Layers,
  X
} from 'lucide-react';

export default function App() {
  // Persistence Initialization
  const [hotels, setHotels] = useState<Hotel[]>(() => {
    try {
      const saved = localStorage.getItem('boh_hotels');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_HOTELS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('boh_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed with 1 realistic initial confirmed booking
    return [
      {
        id: 'BOH-2026-4421',
        hotelId: 'hotel-1',
        hotelName: 'Doon Valley Retreat',
        hotelCity: 'Dehradun, India',
        hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        userId: 'usr-kunal',
        userName: 'Kunal Khatri',
        userEmail: 'kunal@gmail.com',
        userPhone: '9876543210',
        checkIn: '2026-03-24',
        checkOut: '2026-03-27',
        nights: 3,
        guests: 2,
        roomName: 'Deluxe King Suite',
        basePrice: 12600,
        discount: 1260,
        totalAmount: 12700,
        currency: 'INR',
        status: 'confirmed',
        createdAt: '2026-03-01T10:00:00Z',
        promoApplied: 'LUX10'
      }
    ];
  });

  const [savedHotelIds, setSavedHotelIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('boh_saved_ids');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['hotel-1', 'hotel-3'];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('boh_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      id: 'usr-kunal',
      name: 'Kunal Khatri',
      email: 'kunal@gmail.com',
      role: 'user',
      phone: '9876543210'
    };
  });

  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [activeView, setActiveView] = useState<'grid' | 'map'>('grid');
  const [activeTab, setActiveTab] = useState<PageTab>('stays');

  // Reviews state with persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('boh_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Hotel Comparison State
  const [compareHotels, setCompareHotels] = useState<Hotel[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Search and Filter State
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: getToday(),
    checkOut: getNextDay(),
    guests: 2,
    maxPrice: 50000,
    selectedCategory: 'All Stays',
    sortBy: 'recommended'
  });

  // Modal States
  const [detailHotel, setDetailHotel] = useState<Hotel | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [bookingParams, setBookingParams] = useState({
    checkIn: getToday(),
    checkOut: getNextDay(),
    guests: 2,
    roomType: 'Deluxe King Suite'
  });
  const [receiptBooking, setReceiptBooking] = useState<Booking | null>(null);
  const [isTripsOpen, setIsTripsOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('boh_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('boh_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('boh_saved_ids', JSON.stringify(savedHotelIds));
  }, [savedHotelIds]);

  useEffect(() => {
    localStorage.setItem('boh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('boh_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('boh_user');
    }
  }, [currentUser]);

  // Handle Wishlist toggling
  const handleToggleSave = (hotelId: string) => {
    setSavedHotelIds((prev) => 
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  // Handle Comparison toggling
  const handleToggleCompare = (hotel: Hotel) => {
    setCompareHotels((prev) => {
      const exists = prev.some((h) => h.id === hotel.id);
      if (exists) {
        return prev.filter((h) => h.id !== hotel.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), hotel];
      }
      return [...prev, hotel];
    });
  };

  const handleRemoveCompare = (hotelId: string) => {
    setCompareHotels((prev) => prev.filter((h) => h.id !== hotelId));
  };

  const handleClearCompare = () => {
    setCompareHotels([]);
  };

  // Handle adding new guest review
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setHotels((prev) =>
      prev.map((h) => {
        if (h.id === newReview.hotelId) {
          const newCount = h.reviewCount + 1;
          const newRating = Number(((h.rating * h.reviewCount + newReview.rating) / newCount).toFixed(1));
          return { ...h, reviewCount: newCount, rating: newRating };
        }
        return h;
      })
    );
  };

  // Cross-page navigation handlers
  const handleSelectDestination = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      location: city
    }));
    setActiveTab('stays');
    setTimeout(() => {
      const el = document.getElementById('hotels-listing-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleClaimDeal = () => {
    setActiveTab('stays');
    setTimeout(() => {
      const el = document.getElementById('hotels-listing-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleBookPackage = (pkg: TravelPackage) => {
    const matchedHotel = hotels.find((h) => 
      h.city.toLowerCase().includes(pkg.destination.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(h.city.toLowerCase())
    ) || hotels[0];

    setBookingParams({
      checkIn: getToday(),
      checkOut: getNextDay(),
      guests: 2,
      roomType: `${pkg.title} - ${pkg.duration}`
    });
    setBookingHotel(matchedHotel);
  };

  // Handle quick booking directly from card
  const handleQuickBook = (hotel: Hotel) => {
    setBookingParams({
      checkIn: filters.checkIn || getToday(),
      checkOut: filters.checkOut || getNextDay(),
      guests: filters.guests || 2,
      roomType: 'Deluxe King Suite'
    });
    setBookingHotel(hotel);
  };

  // Handle detail modal proceed to booking
  const handleProceedFromDetail = (
    hotel: Hotel, 
    checkIn: string, 
    checkOut: string, 
    guests: number, 
    roomType: string
  ) => {
    setDetailHotel(null);
    setBookingParams({ checkIn, checkOut, guests, roomType });
    setBookingHotel(hotel);
  };

  // Handle successful reservation
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingHotel(null);
    setReceiptBooking(newBooking);
  };

  // Handle cancellation
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Admin actions
  const handleAddHotel = (newHotelData: Omit<Hotel, 'id'>) => {
    const newHotel: Hotel = {
      ...newHotelData,
      id: `hotel-${Date.now()}`
    };
    setHotels((prev) => [newHotel, ...prev]);
  };

  const handleDeleteHotel = (hotelId: string) => {
    setHotels((prev) => prev.filter((h) => h.id !== hotelId));
  };

  const handleUpdateBookingStatus = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  // Categories definition
  const categories = [
    { id: 'All Stays', label: 'All Stays', icon: Sparkles },
    { id: 'Pool', label: 'Pool', icon: Waves },
    { id: 'Spa', label: 'Spa & Wellness', icon: Flower2 },
    { id: 'Free Wi-Fi', label: 'Free Wi-Fi', icon: Wifi },
    { id: 'Great Views', label: 'Great Views', icon: Mountain },
    { id: 'Luxury', label: 'Luxury Haven', icon: Crown },
    { id: 'Resort', label: 'Resorts', icon: Palmtree },
  ];

  // Filter and Sort Logic
  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Location search
        if (filters.location.trim()) {
          const loc = filters.location.toLowerCase();
          const matchesLoc = 
            hotel.city.toLowerCase().includes(loc) ||
            hotel.country.toLowerCase().includes(loc) ||
            hotel.name.toLowerCase().includes(loc) ||
            hotel.address.toLowerCase().includes(loc);
          if (!matchesLoc) return false;
        }

        // Category filter
        if (filters.selectedCategory !== 'All Stays') {
          if (hotel.category !== filters.selectedCategory && !hotel.amenities.includes(filters.selectedCategory)) {
            return false;
          }
        }

        // Max price filter
        if (hotel.pricePerNight > filters.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
        if (filters.sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
        if (filters.sortBy === 'rating_desc') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount; // recommended
      });
  }, [hotels, filters]);

  const savedHotelsList = useMemo(() => {
    return hotels.filter((h) => savedHotelIds.includes(h.id));
  }, [hotels, savedHotelIds]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Primary Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        savedCount={savedHotelIds.length}
        tripsCount={bookings.filter((b) => b.status === 'confirmed').length}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMyTrips={() => setIsTripsOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSupabaseConfig={() => setIsSupabaseOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onNavigateHome={() => {
          setFilters({
            location: '',
            checkIn: getToday(),
            checkOut: getNextDay(),
            guests: 2,
            maxPrice: 50000,
            selectedCategory: 'All Stays',
            sortBy: 'recommended'
          });
          setActiveTab('stays');
          setActiveView('grid');
        }}
        isAdmin={currentUser?.role === 'admin'}
        isSupabaseConnected={isSupabaseConfigured}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area - Multi-Page Routing */}
      <main className="flex-1">
        {activeTab === 'stays' && (
          <>
            <HeroSearch
              filters={filters}
              onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              currency={currency}
              activeView={activeView}
              onViewChange={setActiveView}
              onSearchSubmit={() => {
                const el = document.getElementById('hotels-listing-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Categories Bar & Results Header */}
            <section id="hotels-listing-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
              {/* Category Pills Slider */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200/80 mb-8">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = filters.selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilters((prev) => ({ ...prev, selectedCategory: cat.id }))}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Results Counter & Sort Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {filters.location ? `Stays in "${filters.location}"` : 'Handpicked Accommodations'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {filteredHotels.length} of {hotels.length} luxury & boutique properties
                  </p>
                </div>

                {/* Sorting Dropdown */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                  <select
                    id="sort-hotels-select"
                    value={filters.sortBy}
                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Highest Guest Rating</option>
                  </select>
                </div>
              </div>

              {/* View Container: Grid or Map */}
              {activeView === 'grid' ? (
                <div>
                  {filteredHotels.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                        <SearchX className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">No properties matched your criteria</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Try adjusting your filters, increasing the price range, or searching for broader destinations like Dehradun or Dubai.
                      </p>
                      <button
                        onClick={() => setFilters({
                          location: '',
                          checkIn: getToday(),
                          checkOut: getNextDay(),
                          guests: 2,
                          maxPrice: 50000,
                          selectedCategory: 'All Stays',
                          sortBy: 'recommended'
                        })}
                        className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div 
                      id="hotelGrid"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                      {filteredHotels.map((hotel) => (
                        <HotelCard
                          key={hotel.id}
                          hotel={hotel}
                          currency={currency}
                          isSaved={savedHotelIds.includes(hotel.id)}
                          onToggleSave={handleToggleSave}
                          onSelectHotel={(h) => setDetailHotel(h)}
                          onQuickBook={handleQuickBook}
                          isCompared={compareHotels.some((h) => h.id === hotel.id)}
                          onToggleCompare={handleToggleCompare}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <InteractiveMap
                  hotels={filteredHotels}
                  currency={currency}
                  onSelectHotel={(h) => setDetailHotel(h)}
                  onQuickBook={handleQuickBook}
                />
              )}
            </section>
          </>
        )}

        {/* Top Destinations City Guides Page */}
        {activeTab === 'destinations' && (
          <DestinationsPage
            currency={currency}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {/* Flash Deals & Promo Codes Page */}
        {activeTab === 'deals' && (
          <DealsPage
            currency={currency}
            onClaimDeal={handleClaimDeal}
          />
        )}

        {/* All-Inclusive Tour Packages Page */}
        {activeTab === 'packages' && (
          <PackagesPage
            currency={currency}
            onBookPackage={handleBookPackage}
          />
        )}

        {/* VIP Loyalty Rewards Page */}
        {activeTab === 'rewards' && (
          <RewardsPage
            onExploreHotels={() => {
              setActiveTab('stays');
              setTimeout(() => {
                const el = document.getElementById('hotels-listing-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 80);
            }}
          />
        )}

        {/* Help Center & Support Tickets Page */}
        {activeTab === 'help' && (
          <HelpCenterPage
            onContactChat={() => {
              // Smoothly scrolls to travel assistant chat
              const chatEl = document.getElementById('travel-assistant-btn');
              chatEl?.click();
            }}
          />
        )}
      </main>

      {/* Floating Bottom Comparison Dock (When hotels are selected) */}
      {compareHotels.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {compareHotels.map((h) => (
                <img
                  key={h.id}
                  src={h.featuredImage}
                  alt={h.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-900 border border-white/20"
                />
              ))}
            </div>
            <div className="text-xs font-semibold">
              <span className="font-black text-blue-400">{compareHotels.length}/3</span> Selected
            </div>
          </div>

          <div className="h-5 w-px bg-slate-700" />

          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare Now</span>
          </button>

          <button
            onClick={handleClearCompare}
            title="Clear comparison list"
            className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hotel Comparison Side-by-Side Modal */}
      <HotelCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareHotels={compareHotels}
        onRemoveHotel={handleRemoveCompare}
        onClearAll={handleClearCompare}
        currency={currency}
        onQuickBook={(hotel) => {
          setIsCompareOpen(false);
          handleQuickBook(hotel);
        }}
      />

      {/* Hotel Detail View Modal with Reviews & Submission */}
      <HotelDetailModal
        hotel={detailHotel}
        isOpen={Boolean(detailHotel)}
        onClose={() => setDetailHotel(null)}
        currency={currency}
        isSaved={detailHotel ? savedHotelIds.includes(detailHotel.id) : false}
        onToggleSave={handleToggleSave}
        onProceedToBooking={handleProceedFromDetail}
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      <BookingPaymentModal
        hotel={bookingHotel}
        isOpen={Boolean(bookingHotel)}
        onClose={() => setBookingHotel(null)}
        currency={currency}
        currentUser={currentUser}
        initialCheckIn={bookingParams.checkIn}
        initialCheckOut={bookingParams.checkOut}
        initialGuests={bookingParams.guests}
        initialRoomType={bookingParams.roomType}
        onBookingSuccess={handleBookingSuccess}
      />

      <ReceiptModal
        booking={receiptBooking}
        isOpen={Boolean(receiptBooking)}
        onClose={() => setReceiptBooking(null)}
        currency={currency}
      />

      <MyTripsModal
        bookings={bookings}
        isOpen={isTripsOpen}
        onClose={() => setIsTripsOpen(false)}
        currency={currency}
        onCancelBooking={handleCancelBooking}
        onViewReceipt={(b) => setReceiptBooking(b)}
        onExploreHotels={() => {
          setIsTripsOpen(false);
          setActiveTab('stays');
          const el = document.getElementById('hotels-listing-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <SavedHotelsModal
        savedHotels={savedHotelsList}
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        currency={currency}
        onRemoveSaved={handleToggleSave}
        onSelectHotel={(h) => setDetailHotel(h)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        hotels={hotels}
        bookings={bookings}
        currency={currency}
        onAddHotel={handleAddHotel}
        onDeleteHotel={handleDeleteHotel}
        onUpdateBookingStatus={handleUpdateBookingStatus}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />

      {/* Floating Travel Assistant Chatbot */}
      <TravelAssistantChat />

      {/* Footer with Attribution & Project Credentials */}
      <Footer
        onExploreHotels={() => {
          setActiveTab('stays');
          const el = document.getElementById('hotels-listing-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
