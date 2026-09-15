import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA, isSupabaseConfigured, getSupabaseConfig, saveSupabaseConfig } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url || '');
  const [anonKey, setAnonKey] = useState(currentConfig.key || '');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(url, anonKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-tight">
                Supabase Database & Integration
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                PostgreSQL schema, real-time persistence & sync configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Status Alert Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">
                Active Persistence Architecture
              </h4>
              <p className="text-emerald-800 mt-1 leading-relaxed">
                The application operates with full offline-resilient local sync. If you provide a Supabase project URL and anon key below, the app connects directly to your Supabase PostgreSQL instance.
              </p>
            </div>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveCredentials} className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Supabase Project Keys</h4>
            <div>
              <label className="font-bold text-slate-600 block mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-1">
                Public Anon Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOi..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Credentials saved securely in browser storage.
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-xs cursor-pointer"
              >
                Save Supabase Credentials
              </button>
            </div>

            {savedSuccess && (
              <p className="text-emerald-600 font-bold text-center">
                Settings updated!
              </p>
            )}
          </form>

          {/* Database Schema SQL Code Block (Page 26 Data Model) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">PostgreSQL / Supabase Table DDL</h4>
                <p className="text-slate-500 text-[11px]">
                  Corresponding to Database Design in Section 4.2 of project report
                </p>
              </div>
              <button
                onClick={handleCopySchema}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL DDL</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
