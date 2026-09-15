import { CURRENCIES } from '../data/initialHotels';
import { CurrencyCode } from '../types';

export const formatPrice = (amountInINR: number, currency: CurrencyCode = 'INR'): string => {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = Math.round(amountInINR * config.rate);
  
  if (currency === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`;
  }
  if (currency === 'USD') {
    return `$${converted.toLocaleString('en-US')}`;
  }
  if (currency === 'EUR') {
    return `€${converted.toLocaleString('de-DE')}`;
  }
  if (currency === 'GBP') {
    return `£${converted.toLocaleString('en-GB')}`;
  }
  return `${config.symbol}${converted}`;
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const getNextDay = (dateStr?: string): string => {
  const base = dateStr ? new Date(dateStr) : new Date();
  base.setDate(base.getDate() + 1);
  return base.toISOString().split('T')[0];
};

export const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};
