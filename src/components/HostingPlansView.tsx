import React, { useState } from 'react';
import { 
  Check, Zap, Shield, HardDrive, Wifi, Globe, 
  Mail, RefreshCw, Cpu, Server, Sparkles, ArrowRight, HelpCircle, AtSign 
} from 'lucide-react';
import { DOMAIN_PRICING } from '../data/mockWebsites';

interface HostingPlansViewProps {
  onHostNewSite: () => void;
}

export const HostingPlansView: React.FC<HostingPlansViewProps> = ({ onHostNewSite }) => {
  const [calculatorSites, setCalculatorSites] = useState<number>(15);

  const pricePerSite = 1345;
  const totalApexAnnual = calculatorSites * pricePerSite;
  const competitorAnnual = calculatorSites * 4200;
  const savings = competitorAnnual - totalApexAnnual;

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* Vercel Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Simple, Fixed South African Cloud & Domain Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Web Hosting at <span className="text-white underline decoration-zinc-600">R1,345</span> / Year
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Host unlimited business sites across Teraco JB1 and CT1 datacenters. Fixed at R1,345 per website per year, plus transparent global domain renewals: <strong className="text-white">.com for R232/yr</strong> and <strong className="text-white">elijahchurch.org for R356/yr</strong>.
        </p>
      </div>

      {/* Main Hosting Pricing Card (Vercel Style) */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-[#0c0c0e] border border-[#222227] p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-white text-black font-bold text-[10px] font-mono uppercase tracking-widest py-1 px-4 rounded-bl-xl shadow-sm">
            ALL-INCLUSIVE ANNUAL PLAN
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Price and Summary */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-[#1e1e24] pb-6 lg:pb-0 lg:pr-8">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                Standard Managed Cloud
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tight font-mono">R1,345</span>
                <span className="text-zinc-500 text-xs font-mono">/ website / yr</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Includes annual .co.za domain renewal, 40GB NVMe Gen4 storage, uncapped 10Gbps local traffic, wildcard SSL, and daily offsite backups.
              </p>
              <div className="pt-2">
                <button
                  onClick={onHostNewSite}
                  className="w-full py-3 px-5 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Zap className="w-4 h-4 text-black fill-current" />
                  <span>Host a Website for R1,345/yr</span>
                </button>
              </div>
              <p className="text-[10.5px] text-zinc-500 text-center font-mono">
                Instant provisioning • South African VAT Tax Invoice
              </p>
            </div>

            {/* Right: Feature Checklist */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {[
                { title: '40 GB NVMe Gen4 Storage', desc: 'Ultra-fast solid-state drives in RAID 10' },
                { title: 'Unmetered 10Gbps Traffic', desc: 'Zero overage fees on NAPAfrica breakout' },
                { title: 'Free .co.za Domain Renewal', desc: 'Annual registry fee covered in full' },
                { title: 'Unlimited Business Mailboxes', desc: 'Mailboxes with IMAP/POP3 & Webmail' },
                { title: 'Free Wildcard Let\'s Encrypt SSL', desc: 'TLS 1.3 certificates with auto-renewal' },
                { title: 'Daily Off-Site Cloud Backups', desc: '30-day retention with 1-click restore' },
                { title: 'LiteSpeed Web Server', desc: 'Up to 12x faster than Apache' },
                { title: 'PHP 8.1 - 8.3 & MariaDB', desc: 'Easily switch engines via cPanel SSO' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#111114] border border-[#1e1e24]">
                  <div className="p-0.5 rounded bg-zinc-800 text-zinc-200 mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-xs">{item.title}</h5>
                    <p className="text-[10px] text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Domain Registration & Pricing Matrix */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AtSign className="w-4 h-4 text-zinc-400" />
              <span>Official SouthFlow Domain Registration & Renewal Rates</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Transparent, flat-rate annual renewals across global and South African top-level domains.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">ZACR & ICANN Standard</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#1e1e24] bg-[#0c0c0e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-[#1e1e24]">
              <tr>
                <th className="py-3 px-4">Domain Extension (TLD)</th>
                <th className="py-3 px-3">Annual Registration</th>
                <th className="py-3 px-3">Annual Renewal</th>
                <th className="py-3 px-3">Description & Special Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e24] text-zinc-300 font-sans">
              {DOMAIN_PRICING.map((tier) => {
                const isCom = tier.tld === '.com';
                const isOrg = tier.tld === '.org';

                return (
                  <tr 
                    key={tier.tld}
                    className={`transition-colors ${
                      isOrg 
                        ? 'bg-indigo-950/20 hover:bg-indigo-950/30' 
                        : isCom 
                        ? 'bg-zinc-900/40 hover:bg-zinc-900/60' 
                        : 'hover:bg-zinc-900/20'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-white flex items-center gap-2">
                      <span className="text-sm">{tier.tld}</span>
                      {isOrg && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          ELIJAH CHURCH PLAN (R356)
                        </span>
                      )}
                      {isCom && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                          STANDARD .COM (R232)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-white whitespace-nowrap">
                      R{tier.yearlyPriceZAR}
                      <span className="text-[10px] text-zinc-500 font-normal"> / year</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                      R{tier.renewalPriceZAR}
                      <span className="text-[10px] text-zinc-500 font-normal"> / year</span>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-400 text-xs">
                      <div>{tier.description}</div>
                      {tier.highlightNote && (
                        <div className="text-[10.5px] font-mono text-zinc-300 font-medium mt-0.5">
                          ✓ {tier.highlightNote}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Website Savings Calculator */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-[#0c0c0e] border border-[#1e1e24] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Multi-Website Agency & Fleet Calculator</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Calculate total annual spend for all your hosted sites at R1,345/year per website.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#111114] px-3 py-1.5 rounded-lg border border-[#222227]">
            <span className="text-xs text-zinc-400">Sites:</span>
            <span className="font-mono text-sm font-bold text-white">{calculatorSites} Websites</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="30"
            value={calculatorSites}
            onChange={(e) => setCalculatorSites(parseInt(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>1 Site (R1,345)</span>
            <span>15 Sites (Your Current Fleet)</span>
            <span>30 Sites (R40,350)</span>
          </div>
        </div>

        {/* Comparison Result */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-[#111114] border border-[#1e1e24]">
            <span className="text-xs text-zinc-400 font-mono">SouthFlow Cloud ZA</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              R{totalApexAnnual.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">Fixed R1,345 × {calculatorSites} sites/yr</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111114] border border-[#1e1e24]">
            <span className="text-xs text-zinc-400 font-mono">International Average</span>
            <div className="text-2xl font-bold font-mono text-zinc-500 line-through mt-1">
              R{competitorAnnual.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-600 font-mono">~R350/mo per site</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
            <span className="text-xs text-emerald-400 font-semibold font-mono">Fleet Annual Savings</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              R{savings.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-300/80 font-mono">Saved per year across your fleet</span>
          </div>
        </div>
      </div>

    </div>
  );
};
