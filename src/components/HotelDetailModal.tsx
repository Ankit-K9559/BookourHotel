import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Check, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Share2, 
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Hotel, CurrencyCode, Review } from '../types';
import { formatPrice, calculateNights, getToday, getNextDay } from '../lib/formatters';

interface HotelDetailModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (hotelId: string) => void;
  onProceedToBooking: (hotel: Hotel, checkIn: string, checkOut: string, guests: number, roomType: string) => void;
  reviews: Review[];
  onAddReview?: (review: Review) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  isOpen,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onProceedToBooking,
  reviews,
  onAddReview
}) => {
  if (!isOpen || !hotel) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(getToday());
  const [checkOut, setCheckOut] = useState(getNextDay());
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState('Deluxe King Suite');
  const [roomMultiplier, setRoomMultiplier] = useState(1.0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review form state
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const nights = calculateNights(checkIn, checkOut);
  const baseTotal = hotel.pricePerNight * nights * roomMultiplier;
  const taxes = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + taxes;

  const roomOptions = [
    { name: 'Standard Comfort Room', desc: '1 Queen Bed • City/Courtyard View • 28 m²', multiplier: 0.85 },
    { name: 'Deluxe King Suite', desc: '1 King Bed • Valley / Pool View • Balcony • 42 m²', multiplier: 1.0 },
    { name: 'Royal Executive Villa', desc: 'Private Terrace • Jacuzzi • Butler Service • 65 m²', multiplier: 1.4 }
  ];

  const hotelReviews = reviews.filter((r) => r.hotelId === hotel.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              {hotel.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold ml-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({hotel.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share hotel"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow-sm">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={() => onToggleSave(hotel.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Gallery */}
          <div>
            <div className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={hotel.gallery[activeImageIndex] || hotel.featuredImage}
                alt={hotel.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {hotel.gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {hotel.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Location */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {hotel.name}
              </h2>
              <div className="flex items-center gap-1.5 text-slate-600 text-sm mt-1.5 font-medium">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{hotel.address}</span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-slate-400 font-semibold block uppercase">Nightly Rate</span>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-2xl sm:text-3xl font-black text-blue-600">
                  {formatPrice(hotel.pricePerNight * roomMultiplier, currency)}
                </span>
                <span className="text-xs text-slate-500 font-medium">/night</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
              About this property
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Included Amenities & Perks
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((amenity, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs font-semibold"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Selection */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Select Room Type
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roomOptions.map((opt) => (
                <div
                  key={opt.name}
                  onClick={() => {
                    setSelectedRoom(opt.name);
                    setRoomMultiplier(opt.multiplier);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedRoom === opt.name
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{opt.name}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                  <p className="text-xs font-extrabold text-blue-600 mt-3">
                    {formatPrice(hotel.pricePerNight * opt.multiplier, currency)} /night
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4">
              Select Dates & Reserve
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={getToday()}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-white text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{formatPrice(hotel.pricePerNight * roomMultiplier, currency)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span className="font-semibold text-slate-800">{formatPrice(baseTotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>State Hospitality Taxes & Service Fees (12%)</span>
                <span className="font-semibold text-slate-800">{formatPrice(taxes, currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Estimated</span>
                <span className="text-blue-600 text-base">{formatPrice(grandTotal, currency)}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToBooking(hotel, checkIn, checkOut, guests, selectedRoom)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-between"
            >
              <span>Proceed to Instant Booking</span>
              <div className="flex items-center gap-1.5">
                <span>{formatPrice(grandTotal, currency)}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Guest Reviews Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Verified Guest Reviews ({hotelReviews.length})
              </h4>
              {onAddReview && (
                <button
                  type="button"
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {isWritingReview ? 'Cancel Review' : '+ Write a Review'}
                </button>
              )}
            </div>

            {/* Write a Review Box */}
            {isWritingReview && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newReviewName || !newReviewComment || !onAddReview) return;
                  onAddReview({
                    id: `rev-${Date.now()}`,
                    hotelId: hotel.id,
                    userName: newReviewName,
                    rating: newReviewRating,
                    comment: newReviewComment,
                    date: new Date().toISOString().split('T')[0]
                  });
                  setIsWritingReview(false);
                  setNewReviewName('');
                  setNewReviewComment('');
                }}
                className="mb-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Share Your Experience</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="Your Name (e.g. Ankit Kumar)"
                    className="bg-white text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    disabled
                    value={`${newReviewRating} / 5 Stars Selected`}
                    className="bg-white/60 text-xs px-3 py-2 rounded-xl border border-slate-200 text-slate-500 font-bold"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Tell other travelers about the rooms, hospitality, cleanliness, and views..."
                  className="w-full bg-white text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 resize-none"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

            {hotelReviews.length > 0 ? (
              <div className="space-y-3">
                {hotelReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block mt-2">{rev.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No reviews yet. Be the first guest to share a review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
