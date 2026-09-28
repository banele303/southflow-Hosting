import React, { useState } from 'react';
import { 
  X, ExternalLink, Monitor, Tablet, Smartphone, 
  ShieldCheck, Lock, RefreshCw, Star, MapPin, Phone, 
  Calendar, Check, Heart, Play, Coffee, Sun, Bed 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface LivePreviewModalProps {
  site: HostedWebsite | null;
  onClose: () => void;
  onRenewFromPreview: (site: HostedWebsite) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  site,
  onClose,
  onRenewFromPreview,
}) => {
  if (!site) return null;

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact'>('home');

  const isGlenanda = site.id === 'site-glenanda';
  const isElijah = site.id === 'site-elijah';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Browser Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          {/* Simulated Browser URL bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-400 font-mono">https://</span>
            <span className="font-mono text-white truncate">{site.domain}</span>
            <span className="ml-auto text-[10px] text-slate-500 hidden sm:inline">200 OK • NVMe Cached</span>
          </div>

          {/* Viewport Device Controls */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                device === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-y-auto flex justify-center items-start">
          <div 
            className={`transition-all duration-300 bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-full ${
              device === 'desktop' 
                ? 'w-full' 
                : device === 'tablet' 
                ? 'w-[768px]' 
                : 'w-[375px]'
            }`}
          >
            
            {/* GLENANDA HOTEL SIMULATION */}
            {isGlenanda ? (
              <div className="font-sans flex-1 flex flex-col bg-stone-50">
                {/* Notice banner inside site if in grace period */}
                {site.status === 'grace_period' && (
                  <div className="bg-rose-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
                    <span>⚠️ Hosting Renewal Alert: Deactivation cutoff is 29 September (1 day remaining).</span>
                    <button 
                      onClick={() => onRenewFromPreview(site)}
                      className="bg-white text-rose-600 px-2.5 py-0.5 rounded font-bold text-[11px] hover:bg-rose-50"
                    >
                      Renew R1,345
                    </button>
                  </div>
                )}

                {/* Hotel Header */}
                <header className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bed className="w-6 h-6 text-amber-500" />
                    <div>
                      <h1 className="font-serif text-lg tracking-wider font-bold">GLENANDA HOTEL & SUITES</h1>
                      <p className="text-[10px] tracking-widest text-amber-400 uppercase">Johannesburg South • Boutique Luxury</p>
                    </div>
                  </div>
                  <nav className="hidden sm:flex items-center space-x-4 text-xs tracking-wider uppercase font-medium">
                    <span className="text-amber-400 border-b-2 border-amber-400 pb-1">Suites</span>
                    <span className="hover:text-amber-400 cursor-pointer">Dining</span>
                    <span className="hover:text-amber-400 cursor-pointer">Conferences</span>
                    <span className="hover:text-amber-400 cursor-pointer">Contact</span>
                  </nav>
                  <button className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider">
                    Book a Suite
                  </button>
                </header>

                {/* Hotel Hero */}
                <div className="relative bg-stone-900 text-white py-16 px-6 sm:px-12 overflow-hidden">
                  <div className="max-w-2xl relative z-10 space-y-4">
                    <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest font-semibold">
                      ⭐ 4-Star Graded • 100% Solar Powered
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                      Experience Serenity & Elegance in the Hills of Glenanda
                    </h2>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      Nestled just 15 minutes from Sandton and 20 minutes from OR Tambo Airport. Enjoy luxurious king suites, our Tuscan garden terrace, conference facilities, and private swimming pool.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button className="bg-amber-500 text-stone-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider">
                        Check Availability
                      </button>
                      <button className="bg-stone-800 text-white border border-stone-700 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider">
                        Virtual Tour
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hotel Features Grid */}
                <div className="p-8 max-w-4xl mx-auto space-y-6 flex-1">
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">Suites & Amenities</h3>
                    <p className="text-xs text-stone-500">World-class hospitality tailored for business executives and leisure travelers</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {site.previewDetails.features.map((feat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center space-y-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto font-bold text-xs">
                          ✓
                        </div>
                        <h4 className="font-bold text-xs text-stone-800">{feat}</h4>
                        <p className="text-[11px] text-stone-500">Complimentary high-speed uncapped Wi-Fi included</p>
                      </div>
                    ))}
                  </div>

                  {/* Hotel Footer */}
                  <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{site.previewDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>{site.previewDetails.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isElijah ? (
              /* ELIJAH CHURCH SIMULATION */
              <div className="font-sans flex-1 flex flex-col bg-slate-50">
                {/* Church Navigation */}
                <header className="bg-indigo-950 text-white px-6 py-4 flex items-center justify-between border-b border-indigo-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
                      †
                    </div>
                    <div>
                      <h1 className="font-bold text-base tracking-wide">ELIJAH CHURCH INTERNATIONAL</h1>
                      <p className="text-[10px] text-indigo-300">Faith • Hope • Community Transformation</p>
                    </div>
                  </div>
                  <nav className="hidden sm:flex items-center space-x-4 text-xs font-semibold">
                    <span className="text-indigo-300">Sunday Service</span>
                    <span className="hover:text-indigo-300 cursor-pointer">Sermons</span>
                    <span className="hover:text-indigo-300 cursor-pointer">Ministries</span>
                    <span className="hover:text-indigo-300 cursor-pointer">Give / Tithe</span>
                  </nav>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl">
                    Watch Live
                  </button>
                </header>

                {/* Church Hero */}
                <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 text-white py-16 px-6 sm:px-12 text-center space-y-4">
                  <span className="bg-indigo-800/80 text-indigo-200 text-xs px-3 py-1 rounded-full border border-indigo-600 font-medium inline-block">
                    Next Sunday Service: 09:00 AM & 11:00 AM (SAST)
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
                    {site.previewDetails.heroTitle}
                  </h2>
                  <p className="text-indigo-200 text-sm max-w-xl mx-auto">
                    {site.previewDetails.heroSubtitle}
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Stream Latest Sermon</span>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-semibold">
                      Prayer Request
                    </button>
                  </div>
                </div>

                {/* Church Ministries */}
                <div className="p-8 max-w-4xl mx-auto space-y-6 flex-1">
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">Ministries & Community Outreach</h3>
                    <p className="text-xs text-slate-500">Impacting families across Johannesburg South & Gauteng</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {site.previewDetails.features.map((feat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto font-bold text-xs">
                          †
                        </div>
                        <h4 className="font-bold text-xs text-slate-800">{feat}</h4>
                        <p className="text-[11px] text-slate-500">Every weekend and mid-week fellowships</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>{site.previewDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-indigo-600" />
                      <span>{site.previewDetails.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* DYNAMIC SITE SIMULATION FOR OTHER 13 SITES */
              <div className="font-sans flex-1 flex flex-col bg-slate-50">
                <header 
                  className="px-6 py-4 flex items-center justify-between text-white"
                  style={{ backgroundColor: site.previewDetails.themeColor }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                      {site.name.substring(0, 1)}
                    </div>
                    <div>
                      <h1 className="font-bold text-base">{site.name}</h1>
                      <p className="text-[10px] text-white/80">{site.category}</p>
                    </div>
                  </div>
                  <button className="bg-white text-slate-900 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm">
                    Inquire Online
                  </button>
                </header>

                <div 
                  className="py-14 px-6 sm:px-12 text-white text-center space-y-3"
                  style={{ backgroundColor: site.previewDetails.themeColor + 'dd' }}
                >
                  <h2 className="text-2xl sm:text-3xl font-extrabold max-w-2xl mx-auto leading-tight">
                    {site.previewDetails.heroTitle}
                  </h2>
                  <p className="text-white/90 text-sm max-w-xl mx-auto">
                    {site.previewDetails.heroSubtitle}
                  </p>
                </div>

                <div className="p-8 max-w-4xl mx-auto space-y-6 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {site.previewDetails.features.map((feat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                        <h4 className="font-bold text-xs text-slate-800">{feat}</h4>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span>{site.previewDetails.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <span>{site.previewDetails.contactPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hosting Footer Badge */}
            <div className="bg-slate-900 text-slate-400 px-4 py-2 text-[11px] flex items-center justify-between border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Hosted on ApexHost Cloud ZA (Teraco JB1) • R1,345/yr
              </span>
              <span className="font-mono text-slate-400">SSL 256-bit TLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
