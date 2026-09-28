import React, { useState } from 'react';
import { 
  Check, Zap, Shield, HardDrive, Wifi, Globe, 
  Mail, RefreshCw, Cpu, Server, Sparkles, ArrowRight, HelpCircle 
} from 'lucide-react';

interface HostingPlansViewProps {
  onHostNewSite: () => void;
}

export const HostingPlansView: React.FC<HostingPlansViewProps> = ({ onHostNewSite }) => {
  const [calculatorSites, setCalculatorSites] = useState<number>(15);

  const pricePerSite = 1345;
  const totalApexAnnual = calculatorSites * pricePerSite;
  // Competitor average e.g. international host charging $20/mo = ~R360/mo = ~R4320/yr
  const competitorAnnual = calculatorSites * 4200;
  const savings = competitorAnnual - totalApexAnnual;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent South African Cloud Hosting</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything Your Website Needs for Just <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">R1,345</span> / Year
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          No hidden fees, no renewal price spikes, and no surprise add-ons. Host 1 or 50 websites at the fixed rate of R1,345 per website per year, powered by lightning-fast Teraco NVMe infrastructure in Johannesburg and Cape Town.
        </p>
      </div>

      {/* Main Pricing Card */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500/50 shadow-2xl p-6 sm:p-10 overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-indigo-700 text-white font-bold text-xs uppercase tracking-widest py-1.5 px-6 rounded-bl-2xl shadow-md">
            All-Inclusive Annual Tier
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Price and Summary */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Standard Website Hosting</span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white tracking-tight">R1,345</span>
                <span className="text-slate-400 text-sm font-medium">/ website / year</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Includes annual .co.za domain renewal, NVMe storage, uncapped local bandwidth, SSL, and automated daily backups.
              </p>
              <div className="pt-2">
                <button
                  onClick={onHostNewSite}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Host a Website for R1,345/yr</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Instant activation in ~60 seconds. South African VAT invoice provided.
              </p>
            </div>

            {/* Right: Feature Checklist */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { title: '40 GB NVMe Gen4 Storage', desc: 'Ultra-fast solid-state drives in RAID 10' },
                { title: 'Unmetered 10Gbps Bandwidth', desc: 'Zero overage fees, connected to NAPAfrica' },
                { title: 'Free .co.za Domain Renewal', desc: 'Annual registry fee covered in full' },
                { title: 'Unlimited Business Email', desc: 'Mailboxes with IMAP/POP3 & Webmail' },
                { title: 'Free Let\'s Encrypt SSL', desc: 'Wildcard certificates with auto-renewal' },
                { title: 'Daily Off-Site Backups', desc: '30-day retention with 1-click restore' },
                { title: 'LiteSpeed Web Server', desc: 'Up to 12x faster than standard Apache' },
                { title: 'PHP 8.1 - 8.3 & MariaDB', desc: 'Easily switch engines via cPanel' },
                { title: 'WordPress 1-Click Staging', desc: 'Test changes safely before going live' },
                { title: '24/7 Local ZA Support', desc: 'Direct WhatsApp & Helpdesk engineers' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{item.title}</h5>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Website Savings Calculator */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Multi-Website Agency & Portfolio Calculator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Calculate total annual spend for all your hosted sites at R1,345/year per website.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Sites Hosted:</span>
            <span className="font-mono text-base font-bold text-indigo-400">{calculatorSites} Websites</span>
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
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>1 Site (R1,345)</span>
            <span>15 Sites (Your Current Fleet)</span>
            <span>30 Sites (R40,350)</span>
          </div>
        </div>

        {/* Comparison Result */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">ApexHost Cloud ZA</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">
              R{totalApexAnnual.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">Fixed R1,345 × {calculatorSites} sites/yr</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Standard Agency Average</span>
            <div className="text-2xl font-bold text-slate-400 line-through mt-1">
              R{competitorAnnual.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">~R350/mo per site</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
            <span className="text-xs text-emerald-400 font-semibold">Your Estimated Savings</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              R{savings.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-300/80">Saved per year across your fleet!</span>
          </div>
        </div>
      </div>

    </div>
  );
};
