import React from 'react';
import { 
  Globe, Server, FileText, Zap, ShieldCheck, Plus, 
  ExternalLink, ChevronRight, Activity, Terminal, 
  Sliders, Bell, Layers, LogOut, CheckCircle2, AtSign 
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'websites' | 'domains' | 'pricing' | 'invoices' | 'server';
  setActiveTab: (tab: 'websites' | 'domains' | 'pricing' | 'invoices' | 'server') => void;
  onOpenAddModal: () => void;
  sitesCount: number;
  domainsCount: number;
  criticalCount: number;
  totalDiskGB: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  sitesCount,
  domainsCount,
  criticalCount,
  totalDiskGB,
}) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#000000] border-r border-[#1e1e24] flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      
      {/* Top Section: Brand & Workspace Switcher */}
      <div>
        {/* Vercel Geometric Triangle Logo & Brand */}
        <div className="p-4 border-b border-[#1e1e24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Vercel Style Triangle */}
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-lg shadow-sm font-bold">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight leading-tight flex items-center gap-1.5">
                  SouthFlow
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-800">
                    HOST
                  </span>
                </h1>
                <p className="text-[10.5px] text-zinc-500 font-mono">banele303 / za-fleet</p>
              </div>
            </div>

            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/10" title="All Systems Operational"></span>
          </div>

          {/* Quick Plan Badge */}
          <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-[#0c0c0e] border border-[#222227] flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 font-medium">Standard Cloud Plan</span>
            <span className="font-mono text-white font-bold bg-zinc-800/80 px-1.5 py-0.5 rounded text-[10px]">
              R1,345/yr
            </span>
          </div>
        </div>

        {/* Action Button: Deploy Website */}
        <div className="p-3">
          <button
            onClick={onOpenAddModal}
            className="w-full py-2 px-3 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deploy Website</span>
            <span className="ml-auto text-[10px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">R1,345</span>
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-2.5 py-2 space-y-1">
          <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Infrastructure
          </div>

          {/* Websites Tab */}
          <button
            onClick={() => setActiveTab('websites')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'websites'
                ? 'bg-zinc-800/90 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>Websites Fleet</span>
            </div>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'websites' ? 'bg-zinc-700 text-white' : 'bg-zinc-900 text-zinc-500'
            }`}>
              {sitesCount}
            </span>
          </button>

          {/* Domains & Registrar Tab */}
          <button
            onClick={() => setActiveTab('domains')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'domains'
                ? 'bg-zinc-800/90 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <AtSign className="w-4 h-4 text-zinc-400" />
              <span>Domains & DNS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-1 rounded border border-emerald-500/30">
                .com R232
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'domains' ? 'bg-zinc-700 text-white' : 'bg-zinc-900 text-zinc-500'
              }`}>
                {domainsCount}
              </span>
            </div>
          </button>

          {/* Pricing & Plan Tab */}
          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'pricing'
                ? 'bg-zinc-800/90 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Annual Plans & Pricing</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold">R1,345</span>
          </button>

          {/* Invoices & Billing Tab */}
          <button
            onClick={() => setActiveTab('invoices')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'invoices'
                ? 'bg-zinc-800/90 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Tax Invoices & Billing</span>
            </div>
            {criticalCount > 0 ? (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white animate-pulse">
                {criticalCount}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-zinc-500">VAT 15%</span>
            )}
          </button>

          {/* Server Health Tab */}
          <button
            onClick={() => setActiveTab('server')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'server'
                ? 'bg-zinc-800/90 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-zinc-400" />
              <span>Teraco Datacenters</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">99.98%</span>
          </button>

          <div className="pt-3 px-2.5 pb-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Configuration
          </div>

          <div className="px-3 py-1.5 text-xs text-zinc-400 flex items-center justify-between bg-zinc-950/40 rounded-lg border border-zinc-900">
            <span className="font-mono text-[11px] text-zinc-400">elijahchurch.org</span>
            <span className="text-[10px] font-mono font-bold text-indigo-300">R356/yr</span>
          </div>

          <div className="px-3 py-1.5 text-xs text-zinc-400 flex items-center justify-between bg-zinc-950/40 rounded-lg border border-zinc-900">
            <span className="font-mono text-[11px] text-zinc-400">*.com Domain</span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">R232/yr</span>
          </div>
        </nav>
      </div>

      {/* Bottom Section: Fleet Stats & Region */}
      <div className="p-3 border-t border-[#1e1e24] space-y-3">
        {/* Compact Fleet Meter */}
        <div className="p-2.5 rounded-lg bg-[#0c0c0e] border border-[#222227] space-y-2 text-[11px]">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="w-3 h-3 text-indigo-400" /> Fleet Storage
            </span>
            <span className="font-mono text-zinc-300 font-semibold">{totalDiskGB} / 600 GB</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '31%' }}></div>
          </div>
        </div>

        {/* Datacenter Ping & User Info */}
        <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-mono text-zinc-300">Teraco JB1</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 font-mono text-[10px]">3.8ms</span>
          </div>
          <span className="text-zinc-500 font-mono text-[10px]">ZAR (R)</span>
        </div>
      </div>

    </aside>
  );
};
