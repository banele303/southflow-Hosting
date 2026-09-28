import React, { useState } from 'react';
import { 
  X, Plus, Globe, Server, ShieldCheck, 
  CheckCircle2, Sparkles, Zap, ArrowRight 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWebsite: (newSite: HostedWebsite) => void;
}

export const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({
  isOpen,
  onClose,
  onAddWebsite,
}) => {
  if (!isOpen) return null;

  const [siteName, setSiteName] = useState('');
  const [domain, setDomain] = useState('');
  const [domainTld, setDomainTld] = useState('.co.za');
  const [category, setCategory] = useState<HostedWebsite['category']>('Professional Services');
  const [cms, setCms] = useState('WordPress 6.6');
  const [location, setLocation] = useState('Johannesburg (Teraco JB1)');
  const [themeColor, setThemeColor] = useState('#4f46e5');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName || !domain) return;

    setIsDeploying(true);

    const fullDomain = domain.toLowerCase().includes('.') 
      ? domain.toLowerCase() 
      : `${domain.toLowerCase()}${domainTld}`;

    const newWebsite: HostedWebsite = {
      id: `site-${Date.now()}`,
      name: siteName,
      domain: fullDomain,
      category,
      plan: 'Premium Cloud Host Pro (1 Yr)',
      annualPriceZAR: 1345,
      status: 'active',
      renewalDate: '2027-09-28', // 1 full year from today
      daysRemaining: 365,
      ipAddress: location.includes('Johannesburg') ? '102.130.114.' + Math.floor(10 + Math.random() * 80) : '102.130.115.' + Math.floor(10 + Math.random() * 80),
      serverLocation: location,
      phpVersion: '8.3 FPM',
      diskUsedGB: 1.2,
      diskTotalGB: 40.0,
      bandwidthUsedGB: 0.5,
      sslActive: true,
      sslExpiry: '2027-09-28',
      autoRenew: true,
      emailAccounts: 5,
      dbCount: 1,
      cms,
      uptime90Days: 100.0,
      previewDetails: {
        heroTitle: `Welcome to ${siteName}`,
        heroSubtitle: 'High performance cloud hosting delivered right from Teraco South Africa.',
        themeColor,
        features: ['Fast NVMe Storage', 'Daily Off-Site Backups', 'Free SSL Certificate', 'Enterprise Mailboxes'],
        contactPhone: '+27 (0)11 555 0100',
        location: 'Johannesburg, South Africa',
        establishedYear: 2026,
      }
    };

    setTimeout(() => {
      setIsDeploying(false);
      setIsSuccess(true);
      setTimeout(() => {
        onAddWebsite(newWebsite);
        onClose();
        setIsSuccess(false);
        setSiteName('');
        setDomain('');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Host New Website</h3>
              <p className="text-xs text-indigo-400 font-semibold">Standard Cloud Tier • R1,345 / Year</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isDeploying}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Website Provisioned!</h4>
            <p className="text-sm text-slate-300">
              Allocated 40GB NVMe storage and generated Let's Encrypt SSL.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Website Name */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Business or Website Name</label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g. Balalaika Safari Lodge"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            {/* Domain */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Domain Name</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. balalaika-safari"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs font-mono"
                />
                <select
                  value={domainTld}
                  onChange={(e) => setDomainTld(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-indigo-400 font-mono font-bold focus:outline-none"
                >
                  <option value=".co.za">.co.za (Free Renewal)</option>
                  <option value=".com">.com</option>
                  <option value=".org.za">.org.za</option>
                  <option value=".africa">.africa</option>
                  <option value=".capetown">.capetown</option>
                </select>
              </div>
            </div>

            {/* Category & CMS */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as HostedWebsite['category'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  <option value="Hospitality & Hotels">Hospitality & Hotels</option>
                  <option value="Faith & Non-Profit">Faith & Non-Profit</option>
                  <option value="Tourism & Travel">Tourism & Travel</option>
                  <option value="Energy & Tech">Energy & Tech</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Pre-installed Stack</label>
                <select
                  value={cms}
                  onChange={(e) => setCms(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none font-mono"
                >
                  <option value="WordPress 6.6">WordPress 6.6</option>
                  <option value="WooCommerce Store">WooCommerce Store</option>
                  <option value="Next.js / Node.js">Next.js 14 / Node.js</option>
                  <option value="Laravel 11 PHP">Laravel 11 PHP</option>
                  <option value="Plain HTML5/CSS">Plain HTML5 / Static</option>
                </select>
              </div>
            </div>

            {/* Datacenter selection */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Datacenter Location</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLocation('Johannesburg (Teraco JB1)')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    location.includes('Johannesburg')
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white text-xs">Johannesburg</div>
                  <div className="text-[10px] text-slate-400">Teraco JB1 (3.8ms ping)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLocation('Cape Town (Teraco CT1)')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    location.includes('Cape Town')
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white text-xs">Cape Town</div>
                  <div className="text-[10px] text-slate-400">Teraco CT1 (Atlantic Sea Cable)</div>
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Annual Hosting Fee:</span>
                <span className="text-[10px] text-slate-500 block">40GB NVMe + Unlimited Email + SSL</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-400">R1,345</span>
                <span className="text-[10px] text-slate-500"> / year</span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeploying}
                className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDeploying}
                className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95"
              >
                {isDeploying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Configuring Virtual Host...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Deploy Website (R1,345)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
