import React from 'react';
import { Server, Globe, ShieldCheck, Zap, Plus, RefreshCw, Bell, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: 'websites' | 'pricing' | 'invoices' | 'server';
  setActiveTab: (tab: 'websites' | 'pricing' | 'invoices' | 'server') => void;
  onOpenAddModal: () => void;
  sitesCount: number;
  criticalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  sitesCount,
  criticalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & DC Badge */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                  ApexHost Cloud
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ZA Teraco JB1
                </span>
              </div>
              <p className="text-xs text-slate-400">South Africa Managed Web & DNS Infrastructure</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('websites')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'websites'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Hosted Websites</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === 'websites' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {sitesCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'pricing'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Yearly Plan (R1,345/yr)</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'invoices'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Billing & Invoices</span>
              {criticalCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-rose-500 text-white animate-pulse">
                  {criticalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('server')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'server'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Server Health</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
              <span className="text-slate-500 mr-1.5">Currency:</span>
              <span className="font-semibold text-emerald-400">ZAR (Rands)</span>
            </div>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-md shadow-indigo-600/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Host New Website</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
