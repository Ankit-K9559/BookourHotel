import React, { useState } from 'react';
import { X, User as UserIcon, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('kunal@gmail.com');
  const [password, setPassword] = useState('1234');
  const [name, setName] = useState('Kunal Khatri');
  const [role, setRole] = useState<UserRole>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: `usr-${Date.now()}`,
      name: mode === 'register' ? name : (email.includes('admin') ? 'System Admin' : (email.split('@')[0] || 'Kunal Khatri')),
      email: email,
      role: email.includes('admin') ? 'admin' : role,
      phone: '9876543210'
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickLogin = (demoRole: 'user' | 'admin') => {
    if (demoRole === 'admin') {
      onLoginSuccess({
        id: 'admin-01',
        name: 'Administrator',
        email: 'admin@bookourhotels.com',
        role: 'admin',
        phone: '9876543210'
      });
    } else {
      onLoginSuccess({
        id: 'user-01',
        name: 'Kunal Khatri',
        email: 'kunal@gmail.com',
        role: 'user',
        phone: '9876543210'
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Access your saved stays & reservations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Instant 1-Click Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="py-2 px-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold text-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <UserIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Kunal (User)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-2 px-3 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-bold text-indigo-700 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ankit Kumar"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kunal@gmail.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold outline-none focus:border-blue-600"
              >
                <option value="user">Traveler (Regular User)</option>
                <option value="admin">Hotel Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md shadow-blue-500/25"
          >
            {mode === 'login' ? 'Submit' : 'Create Account'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs">
          {mode === 'login' ? (
            <p className="text-slate-600">
              New here?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-blue-600 hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-blue-600 hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
