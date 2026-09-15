import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  Luggage, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Database,
  ChevronDown
} from 'lucide-react';
import { User, CurrencyCode, PageTab } from '../types';
import { CURRENCIES } from '../data/initialHotels';
import { Compass, Tag, Briefcase, Crown, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  savedCount: number;
  tripsCount: number;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenAuth: () => void;
  onOpenMyTrips: () => void;
  onOpenSaved: () => void;
  onOpenAdmin: () => void;
  onOpenSupabaseConfig: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  isAdmin: boolean;
  isSupabaseConnected: boolean;
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  savedCount,
  tripsCount,
  currentCurrency,
  onCurrencyChange,
  onOpenAuth,
  onOpenMyTrips,
  onOpenSaved,
  onOpenAdmin,
  onOpenSupabaseConfig,
  onLogout,
  onNavigateHome,
  isAdmin,
  isSupabaseConnected,
  activeTab,
  onTabChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string; icon?: React.ReactNode }[] = [
    { tab: 'stays', label: 'Stays' },
    { tab: 'destinations', label: 'Destinations' },
    { tab: 'deals', label: 'Offers & Deals' },
    { tab: 'packages', label: 'Packages' },
    { tab: 'rewards', label: 'Rewards' },
    { tab: 'help', label: 'Help' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-all">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                Book<span className="text-blue-600">Ours</span>Hotels
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Premium Stays Worldwide
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                id={`nav-${item.tab}-btn`}
                onClick={() => onTabChange(item.tab)}
                className={`px-3 py-2 text-xs lg:text-sm rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === item.tab
                    ? 'text-blue-600 bg-blue-50/80 font-bold shadow-2xs'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-semibold'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <div className="h-5 w-px bg-slate-200 mx-1" />

            <button
              id="nav-saved-btn"
              onClick={onOpenSaved}
              className="relative px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              id="nav-trips-btn"
              onClick={onOpenMyTrips}
              className="relative px-3 py-2 text-xs lg:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Luggage className="w-4 h-4 text-blue-600" />
              <span>My Trips</span>
              {tripsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                  {tripsCount}
                </span>
              )}
            </button>
            {isAdmin && (
              <button
                id="nav-admin-btn"
                onClick={onOpenAdmin}
                className="px-3 py-2 text-xs lg:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center gap-1.5 border border-indigo-200 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls: Currency, Supabase Badge, Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Supabase connection badge */}
            <button
              id="supabase-status-badge"
              onClick={onOpenSupabaseConfig}
              title="Supabase Database Status & Schema"
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition ${
                isSupabaseConnected 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isSupabaseConnected ? 'Supabase Live' : 'Supabase Sync'}</span>
            </button>

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
              >
                <span>{CURRENCIES[currentCurrency].symbol} {currentCurrency}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsCurrencyDropdownOpen(false)}
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => onCurrencyChange(code)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition ${
                        currentCurrency === code ? 'text-blue-600 bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-slate-400 font-normal">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Account / Auth Section */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-slate-500 truncate text-[11px]">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={onOpenMyTrips}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <Luggage className="w-4 h-4 text-blue-600" />
                      <span>My Bookings ({tripsCount})</span>
                    </button>
                    <button
                      onClick={onOpenSaved}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Hotels ({savedCount})</span>
                    </button>
                    {isAdmin && (
                      <button
                        onClick={onOpenAdmin}
                        className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-indigo-700 flex items-center gap-2 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="navbar-signin-btn"
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Sign In
                </button>
                <button
                  id="navbar-register-btn"
                  onClick={onOpenAuth}
                  className="px-4.5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onCurrencyChange(currentCurrency === 'INR' ? 'USD' : currentCurrency === 'USD' ? 'EUR' : 'INR')}
              className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-700"
            >
              {CURRENCIES[currentCurrency].symbol} {currentCurrency}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={() => { onOpenSupabaseConfig(); setIsMobileMenuOpen(false); }}
              className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5"
            >
              <Database className="w-4 h-4" />
              <span>Supabase Status</span>
            </button>
            {currentUser && (
              <span className="text-xs font-medium text-slate-600">
                Hi, {currentUser.name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  onTabChange(item.tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 text-xs font-bold rounded-xl text-left transition ${
                  activeTab === item.tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onOpenSaved(); setIsMobileMenuOpen(false); }}
              className="p-2.5 text-xs font-bold text-slate-800 bg-slate-50 rounded-xl text-left flex items-center justify-between"
            >
              <span>Saved</span>
              <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full">{savedCount}</span>
            </button>
            <button
              onClick={() => { onOpenMyTrips(); setIsMobileMenuOpen(false); }}
              className="p-2.5 text-xs font-bold text-slate-800 bg-slate-50 rounded-xl text-left flex items-center justify-between"
            >
              <span>My Trips</span>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">{tripsCount}</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}
                className="col-span-2 p-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-xl text-left border border-indigo-200"
              >
                Admin Management Panel
              </button>
            )}
          </div>

          <div className="pt-2">
            {currentUser ? (
              <button
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 text-sm font-bold text-white bg-blue-600 rounded-xl text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
