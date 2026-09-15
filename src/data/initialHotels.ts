import { Hotel, Review, CurrencyConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.012 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0094 },
};

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Doon Valley Retreat',
    city: 'Dehradun',
    country: 'India',
    address: 'Rajpur Road, Near Malsi Deer Park, Dehradun, Uttarakhand 248009',
    pricePerNight: 4200,
    rating: 4.8,
    reviewCount: 342,
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled in the tranquil foothills of Dehradun, Doon Valley Retreat offers panoramic views of the Shivalik range, ambient natural forest trails, an all-season heated infinity pool, and authentic Garhwali & continental fine dining.',
    amenities: ['Heated Pool', 'Free Wi-Fi', 'Spa & Wellness', 'Mountain Views', 'Breakfast Included', 'Airport Shuttle', 'Valet Parking'],
    category: 'Resort',
    coordinates: {
      lat: 30.3855,
      lng: 78.0792
    },
    availableRooms: 12
  },
  {
    id: 'hotel-2',
    name: 'The Royal Palace Dehradun',
    city: 'Dehradun',
    country: 'India',
    address: 'Haridwar Bypass Road, Subhash Nagar, Dehradun, Uttarakhand 248001',
    pricePerNight: 5500,
    rating: 4.9,
    reviewCount: 512,
    featuredImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A stately heritage architectural masterpiece combining regal colonial charm with modern 5-star amenities. Features royal banquet suites, signature rooftop restaurant overlooking the valley, and world-class hospitality.',
    amenities: ['Free Wi-Fi', 'Royal Spa', 'Fine Dining', 'Banquet Hall', 'Concierge Service', 'Gym & Fitness'],
    category: 'Luxury',
    coordinates: {
      lat: 30.2982,
      lng: 78.0264
    },
    availableRooms: 8
  },
  {
    id: 'hotel-3',
    name: 'Burj Al Arab Luxury Haven',
    city: 'Dubai',
    country: 'UAE',
    address: 'Jumeirah Beach Road, Umm Suqeim 3, Dubai',
    pricePerNight: 38000,
    rating: 5.0,
    reviewCount: 1840,
    featuredImage: 'https://images.unsplash.com/photo-1512958789358-4dacac68a0a8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512958789358-4dacac68a0a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The icon of global luxury. Built on an artificial island, offering duplex suites, private butler service, underwater dining, and unprecedented luxury overlooking the Arabian Gulf.',
    amenities: ['Private Beach', 'Infinity Pool', 'Helipad', 'Michelin Star Dining', 'Luxury Spa', 'Chauffeur Rolls Royce'],
    category: 'Luxury',
    coordinates: {
      lat: 25.1413,
      lng: 55.1852
    },
    availableRooms: 5
  },
  {
    id: 'hotel-4',
    name: 'Himalayan Serenity Pines',
    city: 'Mussoorie',
    country: 'India',
    address: 'The Mall Road, Library Chowk, Mussoorie, Uttarakhand 248179',
    pricePerNight: 3900,
    rating: 4.7,
    reviewCount: 280,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched high on the ridge of Mussoorie, just 30 km from Dehradun. Wake up to misty mountain sunrise, pine forest breeze, warm fireplaces, and freshly brewed Nilgiri tea.',
    amenities: ['Great Views', 'Fireplace', 'Free Wi-Fi', 'Nature Trails', 'Trekking Desk', 'Restaurant'],
    category: 'Great Views',
    coordinates: {
      lat: 30.4598,
      lng: 78.0644
    },
    availableRooms: 9
  },
  {
    id: 'hotel-5',
    name: 'Sunset Palms Beachfront Resort',
    city: 'Goa',
    country: 'India',
    address: 'Candolim Beach Road, North Goa, Goa 403515',
    pricePerNight: 6200,
    rating: 4.8,
    reviewCount: 619,
    featuredImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Direct access to golden sands, tropical palm gardens, lagoon swimming pools with sunken swim-up bars, live acoustic evenings, and fresh Goan seafood feasts.',
    amenities: ['Beachfront', 'Pool', 'Free Wi-Fi', 'Water Sports', 'Live Music', 'Cocktail Bar'],
    category: 'Pool',
    coordinates: {
      lat: 15.5173,
      lng: 73.7628
    },
    availableRooms: 15
  },
  {
    id: 'hotel-6',
    name: 'Grand Horizon City Center',
    city: 'Mumbai',
    country: 'India',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
    pricePerNight: 7800,
    rating: 4.6,
    reviewCount: 420,
    featuredImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Modern glass architecture in the financial hub of Mumbai. Features high-speed fiber internet, executive lounge, state-of-the-art meeting pods, and tranquil sound-proof suites.',
    amenities: ['Free Wi-Fi', 'Business Center', 'Rooftop Pool', 'Fitness Club', '24/7 Room Service', 'Airport Pick-up'],
    category: 'Free Wi-Fi',
    coordinates: {
      lat: 19.0657,
      lng: 72.8687
    },
    availableRooms: 18
  },
  {
    id: 'hotel-7',
    name: 'Ganga Serenity Wellness Spa',
    city: 'Rishikesh',
    country: 'India',
    address: 'Tapovan, Near Laxman Jhula, Rishikesh, Uttarakhand 249192',
    pricePerNight: 4800,
    rating: 4.9,
    reviewCount: 490,
    featuredImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immerse in holistic Ayurveda and wellness by the sacred banks of the Ganges. Daily sunrise yoga sessions, organic farm-to-table cuisine, herbal oil therapies, and soothing river views.',
    amenities: ['Spa & Wellness', 'Yoga Deck', 'River View', 'Organic Food', 'Free Wi-Fi', 'Meditation Hall'],
    category: 'Spa',
    coordinates: {
      lat: 30.1345,
      lng: 78.3248
    },
    availableRooms: 11
  },
  {
    id: 'hotel-8',
    name: 'Alps Alpine Lodge',
    city: 'Interlaken',
    country: 'Switzerland',
    address: 'Höheweg 37, 3800 Interlaken, Switzerland',
    pricePerNight: 24500,
    rating: 4.9,
    reviewCount: 880,
    featuredImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Traditional Swiss timber lodge situated between Lake Thun and Lake Brienz. Spectacular views of the snowcapped Jungfrau peak, cozy fondue lounge, and ski-in ski-out access.',
    amenities: ['Great Views', 'Ski Storage', 'Sauna', 'Free Wi-Fi', 'Restaurant & Bar', 'Fireplace Lounge'],
    category: 'Great Views',
    coordinates: {
      lat: 46.6863,
      lng: 7.8632
    },
    availableRooms: 6
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    hotelId: 'hotel-1',
    userName: 'Kunal Khatri',
    rating: 5,
    comment: 'Exceptional stay in Dehradun! The mountain breeze and heated pool were phenomenal. Staff went above and beyond.',
    date: '2026-03-02'
  },
  {
    id: 'rev-2',
    hotelId: 'hotel-1',
    userName: 'Pooja Sharma',
    rating: 4.8,
    comment: 'Super clean rooms, fast Wi-Fi, and delicious breakfast buffet. Perfect weekend escape from Delhi.',
    date: '2026-02-18'
  },
  {
    id: 'rev-3',
    hotelId: 'hotel-2',
    userName: 'Vikram Mehta',
    rating: 5,
    comment: 'Felt like royalty. The heritage décor and luxury dining in Dehradun are unmatched.',
    date: '2026-02-27'
  }
];
