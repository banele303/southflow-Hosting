import React, { useState } from 'react';
import { 
  Globe, Search, CheckCircle2, AlertCircle, Clock, 
  ShieldCheck, RefreshCw, Plus, ExternalLink, ArrowRight, 
  Sparkles, Check, Lock, Zap 
} from 'lucide-react';
import { RegisteredDomain, DomainPricingTier } from '../types/hosting';
import { DOMAIN_PRICING } from '../data/mockWebsites';

interface DomainsViewProps {
  domains: RegisteredDomain[];
  onRenewDomain: (domain: RegisteredDomain) => void;
  onRegisterDomain: (domainName: string, tld: string, priceZAR: number) => void;
}

export const DomainsView: React.FC<DomainsViewProps> = ({
  domains,
  onRenewDomain,
  onRegisterDomain,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{
    available: boolean;
    name: string;
    tld: string;
    priceZAR: number;
    note?: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    const clean = searchTerm.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    setTimeout(() => {
      setIsSearching(false);
      let tld = '.com';
      let price = 232;
      let note = 'Standard .com Global Rate (R232 / year)';

      if (clean.endsWith('.org')) {
        tld = '.org';
        price = 356;
        note = 'Elijah Church Official Tier (R356 / year)';
      } else if (clean.endsWith('.co.za')) {
        tld = '.co.za';
        price = 99;
        note = 'FREE with Annual R1,345 Hosting (or R99 standalone)';
      } else if (clean.endsWith('.africa')) {
        tld = '.africa';
        price = 295;
        note = 'Pan-African Continental Domain (R295 / year)';
      }

      setSearchResult({
        available: !domains.some(d => d.domain === clean),
        name: clean.includes('.') ? clean : `${clean}.com`,
        tld: clean.includes('.') ? `.${clean.split('.').pop()}` : '.com',
        priceZAR: clean.includes('.org') ? 356 : clean.includes('.com') ? 232 : price,
        note,
      });
    }, 400);
  };

  const elijahOrgDomain = domains.find(d => d.domain === 'elijahchurch.org');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Vercel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222227]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-white" />
            <span>Domains & DNS Management</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            ICANN & ZACR Accredited South African Domain Registrar • Anycast DNSSEC Included
          </p>
        </div>

        {/* Pricing Badges Highlights */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#111114] border border-[#222227] rounded-lg px-3 py-1.5 text-xs font-mono flex items-center gap-1.5">
            <span className="text-zinc-500">.com Domain:</span>
            <span className="text-white font-bold">R232</span>
            <span className="text-zinc-500 text-[10px]">/yr</span>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-xs font-mono flex items-center gap-1.5">
            <span className="text-indigo-300">elijahchurch.org:</span>
            <span className="text-indigo-200 font-bold">R356</span>
            <span className="text-indigo-400 text-[10px]">/yr plan</span>
          </div>
        </div>
      </div>

      {/* Featured Alert: ElijahChurch.org Due Notice */}
      {elijahOrgDomain && elijahOrgDomain.status === 'pending_renewal' && (
        <div className="p-4 rounded-xl bg-[#0f0c07] border border-amber-600/70 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  DOMAIN DUE: 1 OCTOBER 2026
                </span>
                <span className="text-[10px] font-mono text-zinc-400">3 Days Remaining</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                Elijah Church International Domain: <span className="font-mono text-amber-300">elijahchurch.org</span>
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                Official yearly domain registration plan is <strong className="text-white">R356/year</strong>. Renew now to maintain global domain ownership and SSL encryption.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-mono">ANNUAL FEE</div>
              <div className="text-lg font-bold font-mono text-white">R356<span className="text-[10px] text-zinc-500 font-normal">/yr</span></div>
            </div>
            <button
              onClick={() => onRenewDomain(elijahOrgDomain)}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-all active:scale-95 whitespace-nowrap shadow-sm"
            >
              Renew elijahchurch.org (R356)
            </button>
          </div>
        </div>
      )}

      {/* Domain Lookup & Registration Tool */}
      <div className="p-5 rounded-xl bg-[#0c0c0e] border border-[#1e1e24] space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-400" />
            <span>Register a New Domain or Check Availability</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Search top-level domains. Instant lookup with fixed yearly pricing (.com @ R232/yr, .org @ R356/yr).
          </p>
        </div>

        <form onSubmit={handleDomainSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your domain name (e.g. elijahchurch.org, mybrand.com)..."
              className="w-full bg-[#111114] border border-[#222227] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
          >
            {isSearching ? 'Searching Registry...' : 'Search Domain'}
          </button>
        </form>

        {/* Instant Search Result Card */}
        {searchResult && (
          <div className={`p-3.5 rounded-lg border flex items-center justify-between text-xs animate-in fade-in ${
            searchResult.available
              ? 'bg-[#0f1712] border-emerald-500/40 text-emerald-200'
              : 'bg-[#181112] border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2.5">
              {searchResult.available ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              )}
              <div>
                <span className="font-mono font-bold text-white text-sm">{searchResult.name}</span>
                <span className="ml-2 font-mono text-[11px] text-zinc-400">
                  {searchResult.available ? 'is available!' : 'is already registered.'}
                </span>
                <div className="text-[10.5px] text-zinc-400 mt-0.5">{searchResult.note}</div>
              </div>
            </div>

            {searchResult.available ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400 text-sm">R{searchResult.priceZAR}</span>
                  <span className="text-[10px] text-zinc-500 block font-mono">/ year</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRegisterDomain(searchResult.name, searchResult.tld, searchResult.priceZAR)}
                  className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Register Now
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onRegisterDomain(searchResult.name, searchResult.tld, searchResult.priceZAR)}
                className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
              >
                Transfer In
              </button>
            )}
          </div>
        )}
      </div>

      {/* Domain Registry Price Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DOMAIN_PRICING.slice(0, 4).map((tier) => (
          <div 
            key={tier.tld}
            className={`p-3.5 rounded-xl border transition-all ${
              tier.tld === '.org' 
                ? 'bg-[#0f0e14] border-indigo-500/50 shadow-sm'
                : tier.tld === '.com'
                ? 'bg-[#0c0c0e] border-[#2e2e38]'
                : 'bg-[#0c0c0e] border-[#1e1e24]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-white text-base">{tier.tld}</span>
              {tier.tld === '.org' && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  ELIJAH PLAN
                </span>
              )}
              {tier.tld === '.com' && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                  GLOBAL
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold font-mono text-white">
                R{tier.yearlyPriceZAR}
                <span className="text-[10px] text-zinc-500 font-normal"> /yr</span>
              </div>
              <p className="text-[10.5px] text-zinc-400 mt-1 line-clamp-1">{tier.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Registered Domains Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight">Active Registered Domains ({domains.length})</h3>
          <span className="text-xs text-zinc-500 font-mono">Anycast DNS • TLS 1.3 Active</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#1e1e24] bg-[#0c0c0e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] text-zinc-400 font-mono border-b border-[#1e1e24] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Domain Name</th>
                <th className="py-3 px-3">Linked Website</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Yearly Rate</th>
                <th className="py-3 px-3">Renewal Date</th>
                <th className="py-3 px-3">DNSSEC & Privacy</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e24] text-zinc-300">
              {domains.map((dom) => {
                const isPending = dom.status === 'pending_renewal';
                const isGrace = dom.status === 'grace_period';

                return (
                  <tr 
                    key={dom.id} 
                    className={`transition-colors ${
                      isGrace 
                        ? 'bg-rose-950/20 hover:bg-rose-950/30' 
                        : isPending 
                        ? 'bg-amber-950/20 hover:bg-amber-950/30' 
                        : 'hover:bg-zinc-900/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-white flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{dom.domain}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-zinc-200 font-medium">{dom.linkedWebsite || 'Standalone Domain'}</span>
                      <span className="text-[10px] text-zinc-500 block">{dom.category}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {isGrace ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 w-fit animate-pulse">
                          <AlertCircle className="w-3 h-3 text-rose-400" />
                          Grace: 4d Left
                        </span>
                      ) : isPending ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Due 1 Oct (3d)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-white whitespace-nowrap">
                      R{dom.annualPriceZAR}
                      <span className="text-[10px] text-zinc-500 font-normal"> /yr</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] whitespace-nowrap">
                      <span className={isGrace ? 'text-rose-400 font-bold' : isPending ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                        {dom.renewalDate}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {isGrace ? 'Expired 27 Sep' : isPending ? 'Due in 3 days' : `In ${dom.daysRemaining} days`}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-[11px] font-mono text-emerald-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>DNSSEC + Privacy</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onRenewDomain(dom)}
                          className={`px-3 py-1.5 rounded-md font-bold text-xs transition-all active:scale-95 ${
                            isGrace
                              ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                              : isPending
                              ? 'bg-amber-600 hover:bg-amber-500 text-white'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                          }`}
                        >
                          <RefreshCw className="w-3 h-3 inline mr-1" />
                          <span>Renew (R{dom.annualPriceZAR})</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
