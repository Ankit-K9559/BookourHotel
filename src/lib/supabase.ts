import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Hotel, Booking, User, Review } from '../types';

// Environment credentials (optional)
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey !== 'your-anon-key'
);

// Real Supabase client instance (or placeholder if credentials pending)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage keys for resilient persistence
const STORAGE_KEYS = {
  HOTELS: 'bookourhotels_hotels_v1',
  BOOKINGS: 'bookourhotels_bookings_v1',
  SAVED: 'bookourhotels_saved_v1',
  USER: 'bookourhotels_current_user_v1',
  REVIEWS: 'bookourhotels_reviews_v1',
  SETTINGS: 'bookourhotels_custom_supabase_creds'
};

export const getSupabaseConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return {
    url: supabaseUrl,
    key: supabaseAnonKey,
    isConnected: isSupabaseConfigured
  };
};

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ url, key, isConnected: Boolean(url && key) }));
};

// Database Schema DDL for Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- BookOurHotels Database Schema (Supabase / PostgreSQL)
-- Created for BCA Major Project - Uttaranchal University
-- Developer: Ankit Kumar (Full Web Dev)
-- ==========================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 4.5,
    review_count INT DEFAULT 0,
    featured_image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    description TEXT,
    amenities TEXT[] DEFAULT '{}',
    category VARCHAR(100) DEFAULT 'All Stays',
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    available_rooms INT DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    hotel_id TEXT REFERENCES hotels(id) ON DELETE CASCADE,
    hotel_name VARCHAR(255) NOT NULL,
    hotel_city VARCHAR(100) NOT NULL,
    hotel_image TEXT,
    user_id TEXT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    guests INT DEFAULT 2,
    room_name VARCHAR(100) NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 5. Open Read Policies for Hotel Search
CREATE POLICY "Public hotels are viewable by everyone" ON hotels FOR SELECT USING (true);
CREATE POLICY "Bookings viewable by booking user or admin" ON bookings FOR ALL USING (true);
`;
