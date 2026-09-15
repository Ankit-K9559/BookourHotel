import { Destination, TravelPackage, PromoDeal } from '../types';

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'dest-dehradun',
    name: 'Dehradun',
    stateCountry: 'Uttarakhand, India',
    tagline: 'Capital of the Doon Valley & Gateway to the Himalayas',
    description: 'Surrounded by picturesque Shivalik ranges and sal forests, Dehradun blends premier educational heritage, peaceful colonial estates, natural sulfur springs at Sahastradhara, and premier hospitality.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    temperature: '22°C',
    weather: 'Pleasant & Crisp',
    bestSeason: 'March to June & Sept to Nov',
    avgPriceINR: 4200,
    hotelsCount: 2,
    topAttractions: ['Forest Research Institute (FRI)', 'Robber\'s Cave (Guchhupani)', 'Tapkeshwar Mahadev Temple', 'Sahastradhara Natural Springs', 'Malsi Deer Park'],
    travelTip: 'Take an evening stroll down Rajpur Road for quaint cafes, mountain bakery treats, and handloom woolens.'
  },
  {
    id: 'dest-mussoorie',
    name: 'Mussoorie',
    stateCountry: 'Uttarakhand, India',
    tagline: 'The Queen of Hill Stations overlooking Doon Valley',
    description: 'Perched 2,000 meters above sea level, Mussoorie offers sweeping vistas of snow-capped peaks, historic Mall Road promenades, tranquil pine forests, and misty winter-line sunsets.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    temperature: '16°C',
    weather: 'Misty Alpine',
    bestSeason: 'April to July & Oct to Feb',
    avgPriceINR: 3900,
    hotelsCount: 1,
    topAttractions: ['Kempty Falls', 'Gun Hill Ropeway', 'George Everest Peak', 'Camel\'s Back Road', 'Company Garden'],
    travelTip: 'Rent a mountain scooter from Dehradun or catch the scenic 45-minute hill climb up Rajpur for breathtaking vantage points.'
  },
  {
    id: 'dest-rishikesh',
    name: 'Rishikesh',
    stateCountry: 'Uttarakhand, India',
    tagline: 'Yoga Capital of the World on the Emerald Ganges',
    description: 'Where the sacred Ganges emerges from the Himalayas into the plains. Famed for transformational yoga ashrams, sunset Ganga Aarti at Triveni Ghat, world-class river rafting, and Ayurvedic wellness spas.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    temperature: '24°C',
    weather: 'Warm & Spiritual',
    bestSeason: 'September to May',
    avgPriceINR: 4800,
    hotelsCount: 1,
    topAttractions: ['Laxman Jhula & Ram Jhula', 'Parmarth Niketan Ganga Aarti', 'Beatles Ashram', 'Shivpuri White Water Rafting', 'Neer Garh Waterfall'],
    travelTip: 'Experience sunrise meditation on the Tapovan banks and sample organic Ayurvedic herbal tea at riverside cafes.'
  },
  {
    id: 'dest-dubai',
    name: 'Dubai',
    stateCountry: 'United Arab Emirates',
    tagline: 'City of Gold, Futuristic Skylines & Desert Wonders',
    description: 'A global metropolis where visionary modern architecture meets Arabian heritage. Home to the towering Burj Khalifa, Palm Jumeirah, desert dune safaris, and Michelin-starred culinary dining.',
    image: 'https://images.unsplash.com/photo-1512958789358-4dacac68a0a8?auto=format&fit=crop&w=1200&q=80',
    temperature: '29°C',
    weather: 'Sunny & Clear',
    bestSeason: 'November to March',
    avgPriceINR: 38000,
    hotelsCount: 1,
    topAttractions: ['Burj Khalifa Sky Deck', 'The Dubai Mall & Fountain Show', 'Palm Jumeirah & Atlantis', 'Dubai Marina Cruise', 'Arabian Desert 4x4 Safari'],
    travelTip: 'Book an evening dhow dinner cruise at Dubai Marina for panoramic skyline illuminations.'
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    stateCountry: 'India',
    tagline: 'Golden Sands, Portuguese Heritage & Tropical Sunshine',
    description: 'India\'s coastal paradise offering swaying coconut palms, pristine beaches from Candolim to Palolem, vibrant night markets, Portuguese colonial churches, and fresh seafood shacks.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    temperature: '28°C',
    weather: 'Tropical Breeze',
    bestSeason: 'October to April',
    avgPriceINR: 6200,
    hotelsCount: 1,
    topAttractions: ['Candolim & Baga Beaches', 'Aguada Fort & Lighthouse', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Anjuna Flea Market'],
    travelTip: 'Rent a motorcycle to explore the colorful lanes of Fontainhas, the Latin Quarter of Panaji.'
  },
  {
    id: 'dest-mumbai',
    name: 'Mumbai',
    stateCountry: 'Maharashtra, India',
    tagline: 'The Maximum City of Dreams & Coastal Splendor',
    description: 'The energetic financial and entertainment capital of India. Featuring the iconic Gateway of India, the Queen\'s Necklace at Marine Drive, heritage Art Deco architecture, and bustling seaside promenades.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    temperature: '30°C',
    weather: 'Humid & Vibrant',
    bestSeason: 'November to February',
    avgPriceINR: 7800,
    hotelsCount: 1,
    topAttractions: ['Gateway of India', 'Marine Drive Promenade', 'Bandra-Worli Sea Link', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus'],
    travelTip: 'Catch the sunset at Bandstand Bandra and sample iconic street culinary gems at Girgaon Chowpatty.'
  },
  {
    id: 'dest-interlaken',
    name: 'Interlaken & Swiss Alps',
    stateCountry: 'Switzerland',
    tagline: 'Alpine Wonder between Lakes Thun and Brienz',
    description: 'The adventure and scenic heart of the Bernese Oberland. Nestled amidst alpine meadows, crystal turquoise glacial lakes, and the majestic peaks of the Eiger, Mönch, and Jungfrau.',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    temperature: '12°C',
    weather: 'Crisp Mountain Air',
    bestSeason: 'May to September & Dec to March (Ski)',
    avgPriceINR: 24500,
    hotelsCount: 1,
    topAttractions: ['Jungfraujoch - Top of Europe', 'Harder Kulm Funicular Viewpoint', 'Lake Brienz Steamboat Cruise', 'Lauterbrunnen Valley of 72 Waterfalls', 'Grindelwald First Cliff Walk'],
    travelTip: 'Purchase the Swiss Travel Pass for unlimited boat, train, and mountain bus connections across the Oberland.'
  }
];

export const TRAVEL_PACKAGES_DATA: TravelPackage[] = [
  {
    id: 'pkg-doon-himalayas',
    title: 'The Royal Doon & Mussoorie Circuit',
    destination: 'Dehradun & Mussoorie, India',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    basePriceINR: 14900,
    category: 'Mountain Escape',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 168,
    inclusions: [
      '3 Nights 4-Star Mountain Resort Stay',
      'Daily Buffet Breakfast & Gourmet Dinners',
      'Private Chauffeur Sedan for Entire Trip',
      'Dehradun Airport (Jolly Grant) VIP Transfers',
      'Sightseeing: FRI, Robber\'s Cave, Kempty Falls, George Everest',
      '24/7 Dedicated Tour Concierge'
    ],
    highlights: [
      'Stay in Rajpur Road forest valley retreat',
      'Witness stunning Mussoorie winter-line sunset',
      'Explore colonial heritage at Forest Research Institute',
      'Complimentary Garhwali culinary tasting dinner'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Dehradun & Valley Check-in', desc: 'Pickup from Jolly Grant Airport or Dehradun Railway Station. Check-in to Doon Valley Retreat. Evening leisure with valley views and welcome dinner.' },
      { day: 2, title: 'Dehradun Heritage & Nature Trails', desc: 'Visit the grand Forest Research Institute campus, explore the subterranean waters of Robber\'s Cave, and enjoy local tea tasting on Rajpur Road.' },
      { day: 3, title: 'Scenic Hill Climb to Queen of Hills Mussoorie', desc: 'Drive to Mussoorie ridge. Ride the Gun Hill ropeway, visit Kempty Falls, stroll Mall Road, and witness sunset at George Everest Estate.' },
      { day: 4, title: 'Morning Spa & Departure', desc: 'Enjoy leisurely breakfast, heated pool relaxation, and private transfer back to the airport or railway station.' }
    ]
  },
  {
    id: 'pkg-rishikesh-wellness',
    title: 'Ganges Spiritual & Ayurvedic Healing Retreat',
    destination: 'Rishikesh, India',
    duration: '3 Days / 2 Nights',
    days: 3,
    nights: 2,
    basePriceINR: 11500,
    category: 'Spiritual Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 142,
    inclusions: [
      '2 Nights Luxury Tapovan River-View Suite',
      'All Pure-Vegetarian Organic Farm-to-Table Meals',
      'Daily Guided Sunrise & Sunset Yoga on Deck',
      'One 60-min Authentic Ayurvedic Abhyanga Massage',
      'VIP Reserved Ghat Seating for Parmarth Ganga Aarti',
      'Roundtrip Dehradun / Haridwar Transfers'
    ],
    highlights: [
      'Morning meditation with river sounds',
      'Private boat ride along the sacred Ganges',
      'Personalized pulse diagnostic with Ayurvedic doctor',
      'Scenic visit to Beatles Ashram'
    ],
    itinerary: [
      { day: 1, title: 'Ganges Arrival & Twilight Aarti', desc: 'Arrive at Tapovan wellness resort. Detox herbal beverage on arrival. Evening VIP reserved seating at Parmarth Niketan Ganga Aarti with floating lamps.' },
      { day: 2, title: 'Ayurveda Therapy & Yoga Immersion', desc: 'Sunrise Hatha yoga on open deck overlooking the river. 60-minute Ayurvedic warm herbal oil therapy. Afternoon visit to historic Beatles Ashram.' },
      { day: 3, title: 'Meditation & Farewell', desc: 'Pranayama breathing masterclass, organic breakfast, and private return transfer.' }
    ]
  },
  {
    id: 'pkg-dubai-skyline',
    title: 'Dubai Ultra-Luxury Skyline & Desert Wonder',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    basePriceINR: 89000,
    category: 'Luxury & Skyline',
    image: 'https://images.unsplash.com/photo-1512958789358-4dacac68a0a8?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewsCount: 310,
    inclusions: [
      '4 Nights Duplex Suite at 5-Star Haven',
      'Daily International Champagne Breakfast Buffet',
      'Private Rolls-Royce / Luxury Limousine Airport Transfers',
      'VIP At The Top Burj Khalifa (Levels 124 & 148)',
      'Desert 4x4 Dune Bashing with Falconry & 5-Star BBQ Banquet',
      'Marina Yacht Dinner Cruise with Live Violin'
    ],
    highlights: [
      'Duplex suite with panoramic Arabian Gulf view',
      'Sunset dune safari with private Bedouin camp tent',
      'Exclusive shopping concierge at Dubai Mall',
      'Michelin-starred dining credit included'
    ],
    itinerary: [
      { day: 1, title: 'Royal Welcome in Dubai', desc: 'Chauffeur airport pickup, private check-in, and welcome champagne reception overlooking the Marina.' },
      { day: 2, title: 'Burj Khalifa & Modern Marvels', desc: 'Fast-track VIP access to Burj Khalifa 148th floor sky lounge, fountain shows, and Dubai Mall.' },
      { day: 3, title: 'Red Sand Dunes & Desert Stargazing', desc: 'Thrilling 4x4 dune drive, camel riding, sandboarding, falcon photography, and gourmet BBQ banquet under stars.' },
      { day: 4, title: 'Luxury Yacht Cruise', desc: 'Leisurely day at private beach club followed by luxury sunset yacht cruise along Palm Jumeirah.' },
      { day: 5, title: 'Departure in Style', desc: 'Late checkout, souvenir gift basket, and luxury airport transfer.' }
    ]
  },
  {
    id: 'pkg-goa-beach',
    title: 'Goan Coastal Bliss & Tropical Escape',
    destination: 'Goa, India',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    basePriceINR: 17800,
    category: 'Beach & Coastal',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 224,
    inclusions: [
      '3 Nights Beachfront Pool Villa at Candolim',
      'Daily Coastal Breakfast & Seafood Dinner Voucher',
      'Airport Pickup & Drop (Mopa / Dabolim)',
      'Sunset Catamaran Sailing with Refreshments',
      'Heritage South Goa Tour (Old Goa Churches & Spice Plantation)',
      'Complimentary Resort Water Sports Pass'
    ],
    highlights: [
      'Direct beach access from private villa',
      'Traditional Goan buffet at organic spice farm',
      'Sunset cocktail cruise along Mandovi river',
      'Free scooter rental for 2 days'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Candolim Coast', desc: 'Airport welcome, check-in to beachfront resort, relax by lagoon pool and enjoy fresh coconut cocktails at sunset.' },
      { day: 2, title: 'Heritage Churches & Spice Plantation', desc: 'Tour UNESCO-listed Basilica of Bom Jesus, followed by guided tour of Sahakari Spice Farm with traditional lunch.' },
      { day: 3, title: 'Catamaran Sailing & Beach Vibes', desc: 'Morning water sports, afternoon relaxation, and golden hour catamaran cruise with acoustic music.' },
      { day: 4, title: 'Souvenir Markets & Farewell', desc: 'Shop cashew nuts and Goan handicrafts, followed by airport drop.' }
    ]
  },
  {
    id: 'pkg-swiss-alps',
    title: 'Swiss Alpine Panorama & Jungfrau Glacier Tour',
    destination: 'Interlaken, Switzerland',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    basePriceINR: 118000,
    category: 'Alpine Adventure',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 195,
    inclusions: [
      '5 Nights Traditional Timber Suite in Interlaken',
      'Daily Swiss Mountain Breakfast & Cheese Fondue Dinner',
      'Jungfraujoch - Top of Europe Cogwheel Train Pass',
      'Lake Brienz & Lake Thun Steamboat Excursion Pass',
      'Swiss First-Class Travel Train Railpass (Zurich - Interlaken)',
      'Guided Lauterbrunnen Waterfall Valley Tour'
    ],
    highlights: [
      'Walk inside the Jungfrau Ice Palace glacier caves',
      'Panoramic dinner with views of the Eiger north face',
      'Scenic steamboat cruise on turquoise Lake Brienz',
      'Private chocolate tasting masterclass in Interlaken'
    ],
    itinerary: [
      { day: 1, title: 'Zurich to Interlaken Scenic Rail', desc: 'First class train through Swiss lake country to Interlaken. Check-in and welcome Swiss hot cocoa.' },
      { day: 2, title: 'Jungfraujoch - Top of Europe', desc: 'Journey via Eiger Express cable car and cogwheel train to 3,454m altitude. Explore Sphinx observatory and Ice Palace.' },
      { day: 3, title: 'Lauterbrunnen Valley of 72 Waterfalls', desc: 'Scenic exploration of Trümmelbach glacial falls inside the mountain and fairy-tale chalet villages.' },
      { day: 4, title: 'Lake Brienz Cruise & Harder Kulm', desc: 'Historic steamboat cruise on turquoise waters, evening funicular to Harder Kulm for sunset dinner.' },
      { day: 5, title: 'Grindelwald First Cliff Walk', desc: 'Suspension bridge cliff walk and gentle alpine flower meadow hiking.' },
      { day: 6, title: 'Farewell Switzerland', desc: 'Swiss chocolate shopping and scenic first-class train back to Zurich Airport.' }
    ]
  }
];

export const PROMO_DEALS_DATA: PromoDeal[] = [
  {
    id: 'deal-ankit',
    code: 'ANKIT15',
    title: 'Academic & Developer VIP Privilege',
    discountDescription: '15% Instant Discount',
    percentOff: 15,
    tag: 'Developer Special',
    expiresInHours: 72,
    applicableCities: ['All Destinations', 'Dehradun', 'Mussoorie', 'Rishikesh'],
    description: 'Dedicated discount sponsored by Project Developer Ankit Kumar (BCA IV SEM, Uttaranchal University). Valid across all hotels and packages with no minimum spend.'
  },
  {
    id: 'deal-lux',
    code: 'LUX10',
    title: 'Luxury Suites & Villas Exclusive',
    discountDescription: '10% Off 5-Star Properties',
    percentOff: 10,
    tag: '5-Star Collection',
    expiresInHours: 24,
    minBookingNights: 2,
    applicableCities: ['Dubai', 'Mumbai', 'Interlaken', 'Dehradun'],
    description: 'Save 10% on executive suites, penthouses, and private villas. Includes complimentary welcome drink and priority early check-in.'
  },
  {
    id: 'deal-hill',
    code: 'HILL20',
    title: 'Uttarakhand Mountain Escape Deal',
    discountDescription: 'Flat 20% Off Mountain Stays',
    percentOff: 20,
    tag: 'Mountain Flash Sale',
    expiresInHours: 14,
    applicableCities: ['Dehradun', 'Mussoorie', 'Rishikesh'],
    description: 'Escape the heat and retreat into the cool pine air of Dehradun, Mussoorie, or holy Rishikesh with 20% instant price slash.'
  },
  {
    id: 'deal-flat1500',
    code: 'EARLYBIRD',
    title: 'Advance Early Bird Saver',
    discountDescription: 'Flat ₹1,500 Off Any Booking',
    flatOffINR: 1500,
    tag: 'Limited Time',
    expiresInHours: 48,
    minBookingNights: 3,
    applicableCities: ['All Destinations'],
    description: 'Plan your holiday at least 7 days in advance for 3+ nights and get flat ₹1,500 deduction straight off your reservation bill.'
  },
  {
    id: 'deal-weekend',
    code: 'WEEKENDSTAY',
    title: 'Goa Coastal Weekend Break',
    discountDescription: '12% Off Beachfront Resorts',
    percentOff: 12,
    tag: 'Weekend Deal',
    expiresInHours: 36,
    applicableCities: ['Goa'],
    description: 'Relax at sunset beachfront retreats in Goa with 12% off Friday-to-Monday getaways with complimentary buffet breakfast.'
  }
];

export const HELP_FAQS_DATA = [
  {
    category: 'Bookings & Confirmation',
    questions: [
      {
        q: 'How quickly is my hotel reservation confirmed?',
        a: 'All bookings made through BookOurHotels are confirmed instantly in real-time. Upon successful payment verification, you immediately receive a unique Booking Reference ID (e.g., BOH-2026-XXXX) and an official downloadable voucher.'
      },
      {
        q: 'Can I book a stay for someone else?',
        a: 'Yes! Simply enter the primary guest\'s full name, email, and phone number on the payment checkout screen. The official booking voucher will be issued under their name.'
      },
      {
        q: 'What is included in the room price?',
        a: 'The price per night clearly displays inclusions such as complimentary high-speed Wi-Fi, swimming pool access, and any room-specific perks. 12% state hospitality taxes and service charges are calculated transparently before payment.'
      }
    ]
  },
  {
    category: 'Cancellations & Refunds',
    questions: [
      {
        q: 'What is the cancellation policy on BookOurHotels?',
        a: 'Most properties offer 100% Free Cancellation up to 24 hours prior to standard check-in time (2:00 PM). You can cancel any confirmed trip in 1 click from your "My Trips" dashboard.'
      },
      {
        q: 'How long does a refund take to process?',
        a: 'In live banking mode, refunds are initiated immediately and credited to your original payment method within 3 to 5 business days. In our simulated project environment, your trip status updates to "Cancelled" immediately.'
      },
      {
        q: 'Can I modify my check-in or check-out dates?',
        a: 'Yes, you can reschedule dates by cancelling the existing reservation for free and re-booking with your preferred dates, or by reaching out to our 24/7 Travel Concierge.'
      }
    ]
  },
  {
    category: 'Check-in & Hotel Policies',
    questions: [
      {
        q: 'What are the standard check-in and check-out times?',
        a: 'Standard check-in begins at 2:00 PM local property time, and check-out is by 11:00 AM. Gold & Platinum Club members enjoy complimentary late check-out until 2:00 PM subject to availability.'
      },
      {
        q: 'What identification documents do I need to present at the front desk?',
        a: 'Government-issued photo identification (Aadhaar Card, Passport, Driver\'s License, or Voter ID) is required for all adult guests checking in.'
      },
      {
        q: 'Are children accommodated free of charge?',
        a: 'Children under 6 years of age stay free when sharing existing bedding with parents. Cribs and extra rollaway beds can be requested during check-in.'
      }
    ]
  },
  {
    category: 'Project & Engineering Architecture',
    questions: [
      {
        q: 'What technologies power the BookOurHotels platform?',
        a: 'BookOurHotels is developed with React 19, TypeScript, Tailwind CSS v4, Lucide vector icons, and an enterprise Supabase PostgreSQL backend integration with local storage caching for maximum offline reliability.'
      },
      {
        q: 'Who engineered this platform?',
        a: 'This major project was designed and engineered by Full Web Dev - Ankit Kumar (Enrollment No: UU2409000044, BCA IV SEM, Uttaranchal School of Computing Sciences, Uttaranchal University, Dehradun).'
      },
      {
        q: 'How does Supabase database persistence work?',
        a: 'The app includes ready-to-run PostgreSQL table DDL schemas (Users, Hotels, Bookings, Reviews). Clicking the "Supabase Live / Sync" button in the top navigation allows developers to paste their credentials or inspect the relational schema.'
      }
    ]
  }
];
