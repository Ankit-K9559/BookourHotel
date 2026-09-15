export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface RoomOption {
  id: string;
  name: string;
  bedType: string;
  capacity: number;
  priceMultiplier: number;
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  pricePerNight: number; // in base INR
  rating: number;
  reviewCount: number;
  featuredImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  category: 'All Stays' | 'Pool' | 'Spa' | 'Free Wi-Fi' | 'Great Views' | 'Luxury' | 'Resort';
  coordinates: {
    lat: number;
    lng: number;
  };
  availableRooms: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomName: string;
  basePrice: number;
  discount: number;
  totalAmount: number;
  currency: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  promoApplied?: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // 1 INR in target currency
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  maxPrice: number;
  selectedCategory: string;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'rating_desc';
}

export type PageTab = 'stays' | 'destinations' | 'deals' | 'packages' | 'rewards' | 'help';

export interface Destination {
  id: string;
  name: string;
  stateCountry: string;
  tagline: string;
  description: string;
  image: string;
  temperature: string;
  weather: string;
  bestSeason: string;
  avgPriceINR: number;
  hotelsCount: number;
  topAttractions: string[];
  travelTip: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  days: number;
  nights: number;
  basePriceINR: number;
  image: string;
  category: 'Mountain Escape' | 'Luxury & Skyline' | 'Beach & Coastal' | 'Spiritual Wellness' | 'Alpine Adventure';
  rating: number;
  reviewsCount: number;
  inclusions: string[];
  highlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

export interface PromoDeal {
  id: string;
  code: string;
  title: string;
  discountDescription: string;
  percentOff?: number;
  flatOffINR?: number;
  tag: string;
  expiresInHours: number;
  minBookingNights?: number;
  applicableCities: string[];
  description: string;
}

export interface SupportTicket {
  id: string;
  category: string;
  name: string;
  email: string;
  bookingId?: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}
