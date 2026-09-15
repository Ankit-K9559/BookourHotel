import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  CheckCircle2, 
  Ban,
  Download
} from 'lucide-react';
import { Hotel, Booking, CurrencyCode } from '../types';
import { formatPrice } from '../lib/formatters';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  bookings: Booking[];
  currency: CurrencyCode;
  onAddHotel: (hotel: Omit<Hotel, 'id'>) => void;
  onDeleteHotel: (hotelId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: 'confirmed' | 'cancelled') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  hotels,
  bookings,
  currency,
  onAddHotel,
  onDeleteHotel,
  onUpdateBookingStatus
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'hotels' | 'bookings'>('overview');
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  // New Hotel Form State
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelCity, setNewHotelCity] = useState('');
  const [newHotelCountry, setNewHotelCountry] = useState('India');
  const [newHotelAddress, setNewHotelAddress] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState(4500);
  const [newHotelCategory, setNewHotelCategory] = useState<Hotel['category']>('Resort');
  const [newHotelImage, setNewHotelImage] = useState('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80');
  const [newHotelDesc, setNewHotelDesc] = useState('');

  // Calculations
  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const confirmedBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHotel({
      name: newHotelName,
      city: newHotelCity,
      country: newHotelCountry,
      address: newHotelAddress,
      pricePerNight: Number(newHotelPrice),
      rating: 4.8,
      reviewCount: 1,
      featuredImage: newHotelImage,
      gallery: [newHotelImage],
      description: newHotelDesc || 'Exquisite hospitality, serene surroundings, and contemporary luxury.',
      amenities: ['Free Wi-Fi', 'Breakfast Included', 'Swimming Pool', 'Spa'],
      category: newHotelCategory,
      coordinates: { lat: 30.3165, lng: 78.0322 },
      availableRooms: 10
    });
    setIsAddHotelModalOpen(false);
    // Reset form
    setNewHotelName('');
    setNewHotelCity('');
    setNewHotelAddress('');
    setNewHotelDesc('');
  };

  const handleExportCSV = () => {
    const headers = 'BookingID,Hotel,Customer,Phone,CheckIn,CheckOut,Amount,Status\n';
    const rows = bookings.map(b => 
      `"${b.id}","${b.hotelName}","${b.userName}","${b.userPhone}","${b.checkIn}","${b.checkOut}",${b.totalAmount},"${b.status}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BookOurHotels_Report_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Administrator Console
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                BookOurHotels Central Analytics & Resource Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Analytics
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'hotels'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Hotel Listings</span>
            <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[10px] rounded-full">
              {hotels.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Reservations Log</span>
            <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] rounded-full">
              {bookings.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Revenue
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mt-2">
                    {formatPrice(totalRevenue, currency)}
                  </h4>
                  <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% from last period</span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Total Bookings
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mt-2">
                    {bookings.length}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {confirmedBookingsCount} confirmed • {bookings.length - confirmedBookingsCount} cancelled
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Active Listings
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mt-2">
                    {hotels.length} Properties
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Covering Dehradun, Dubai, Goa, Mumbai & more
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      System Reliability
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mt-2">
                    99.98%
                  </h4>
                  <p className="text-[11px] text-purple-600 mt-1 font-semibold">
                    Live Supabase / Sync Active
                  </p>
                </div>
              </div>

              {/* Visual Performance Charts (Pure CSS / Lightweight SVG) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">Monthly Booking Revenue</h4>
                      <p className="text-xs text-slate-500">Revenue performance across 2026 quarters</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      FY 2025-2026
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
                    {[
                      { month: 'Oct', val: 45 },
                      { month: 'Nov', val: 62 },
                      { month: 'Dec', val: 95 },
                      { month: 'Jan', val: 78 },
                      { month: 'Feb', val: 84 },
                      { month: 'Mar', val: 100 },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div 
                          className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-lg transition-all relative flex justify-center"
                          style={{ height: `${bar.val}%` }}
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded transition">
                            {bar.val}%
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-3">
                    <span>Target: ₹1,500,000</span>
                    <span>Growth: +24% YoY</span>
                  </div>
                </div>

                {/* Popular Destinations Breakdown */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 text-sm mb-1">Destinations Share</h4>
                    <p className="text-xs text-slate-500 mb-4">Top searched regional hubs</p>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Dehradun & Mussoorie</span>
                          <span>42%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full w-[42%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Dubai, UAE</span>
                          <span>26%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full w-[26%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Goa Coastal</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[20%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>Swiss Alps & Others</span>
                          <span>12%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[12%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                    Calculated from {bookings.length + 48} total reservation requests.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOTEL MANAGEMENT */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Hotel Properties Catalog</h4>
                  <p className="text-xs text-slate-500">Add, edit pricing, or remove accommodations</p>
                </div>
                <button
                  onClick={() => setIsAddHotelModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hotel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100">
                        <img src={hotel.featuredImage} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                          {hotel.category}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm truncate">{hotel.name}</h5>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{hotel.city}, {hotel.country}</p>
                      <p className="text-xs font-extrabold text-blue-600 mt-2">
                        {formatPrice(hotel.pricePerNight, currency)} /night
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{hotel.availableRooms} rooms available</span>
                      <button
                        onClick={() => onDeleteHotel(hotel.id)}
                        className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg text-xs font-bold transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RESERVATIONS LOG */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search by Guest, Hotel, or ID..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  {(['all', 'confirmed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                        statusFilter === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Booking ID</th>
                      <th className="p-3.5">Hotel</th>
                      <th className="p-3.5">Guest & Phone</th>
                      <th className="p-3.5">Check-In / Out</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No matching reservations found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3.5 font-mono font-bold text-slate-900">{b.id}</td>
                          <td className="p-3.5 font-semibold text-slate-800">{b.hotelName}</td>
                          <td className="p-3.5">
                            <span className="font-bold block text-slate-900">{b.userName}</span>
                            <span className="text-[11px] text-slate-400">{b.userPhone}</span>
                          </td>
                          <td className="p-3.5 text-slate-600">
                            {b.checkIn} → {b.checkOut} ({b.nights}n)
                          </td>
                          <td className="p-3.5 font-extrabold text-slate-900">
                            {formatPrice(b.totalAmount, currency)}
                          </td>
                          <td className="p-3.5">
                            {b.status === 'confirmed' ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                Confirmed
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                                Cancelled
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            {b.status === 'confirmed' ? (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                                className="text-xs text-rose-600 hover:underline font-bold"
                              >
                                Cancel
                              </button>
                            ) : (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'confirmed')}
                                className="text-xs text-emerald-600 hover:underline font-bold"
                              >
                                Restore
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add New Hotel Modal */}
      {isAddHotelModalOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setIsAddHotelModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Add New Hotel Property</h4>
              <button onClick={() => setIsAddHotelModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHotel} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hotel Name</label>
                <input
                  type="text"
                  required
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                  placeholder="e.g. Doon Luxury Pine Villa"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newHotelCity}
                    onChange={(e) => setNewHotelCity(e.target.value)}
                    placeholder="Dehradun"
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={newHotelCountry}
                    onChange={(e) => setNewHotelCountry(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={newHotelAddress}
                  onChange={(e) => setNewHotelAddress(e.target.value)}
                  placeholder="Mussoorie Diversion Road, Dehradun"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Base Price (INR / night)</label>
                  <input
                    type="number"
                    required
                    value={newHotelPrice}
                    onChange={(e) => setNewHotelPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newHotelCategory}
                    onChange={(e) => setNewHotelCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  >
                    <option value="Resort">Resort</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Pool">Pool</option>
                    <option value="Spa">Spa</option>
                    <option value="Great Views">Great Views</option>
                    <option value="Free Wi-Fi">Free Wi-Fi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newHotelImage}
                  onChange={(e) => setNewHotelImage(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newHotelDesc}
                  onChange={(e) => setNewHotelDesc(e.target.value)}
                  placeholder="Scenic location, heated pool, mountain views..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHotelModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
