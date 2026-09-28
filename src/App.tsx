import React, { useState, useMemo } from 'react';
import { 
  Globe, Server, ShieldCheck, Zap, HardDrive, 
  Wifi, Search, Filter, LayoutGrid, List, Plus, 
  RefreshCw, CheckCircle2, AlertTriangle, Clock, 
  ChevronRight, Command, Bell, ExternalLink, Menu, X, AtSign 
} from 'lucide-react';
import { HostedWebsite, Invoice, RegisteredDomain } from './types/hosting';
import { MOCK_WEBSITES, INITIAL_INVOICES, MOCK_DOMAINS } from './data/mockWebsites';
import { Sidebar } from './components/Sidebar';
import { AlertBanner } from './components/AlertBanner';
import { WebsiteCard } from './components/WebsiteCard';
import { WebsitesTable } from './components/WebsitesTable';
import { RenewalModal } from './components/RenewalModal';
import { DomainRenewalModal } from './components/DomainRenewalModal';
import { LivePreviewModal } from './components/LivePreviewModal';
import { SiteDrawer } from './components/SiteDrawer';
import { HostingPlansView } from './components/HostingPlansView';
import { InvoicesView } from './components/InvoicesView';
import { DomainsView } from './components/DomainsView';
import { ServerHealthView } from './components/ServerHealthView';
import { AddWebsiteModal } from './components/AddWebsiteModal';

export const App: React.FC = () => {
  const [websites, setWebsites] = useState<HostedWebsite[]>(MOCK_WEBSITES);
  const [domains, setDomains] = useState<RegisteredDomain[]>(MOCK_DOMAINS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [activeTab, setActiveTab] = useState<'websites' | 'domains' | 'pricing' | 'invoices' | 'server'>('websites');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'urgent' | 'active'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals & Drawers
  const [renewalSite, setRenewalSite] = useState<HostedWebsite | null>(null);
  const [renewalDomain, setRenewalDomain] = useState<RegisteredDomain | null>(null);
  const [manageSite, setManageSite] = useState<HostedWebsite | null>(null);
  const [previewSite, setPreviewSite] = useState<HostedWebsite | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Find specific key sites
  const glenandaHotel = websites.find(w => w.id === 'site-glenanda');
  const elijahChurch = websites.find(w => w.id === 'site-elijah');

  // Count critical / urgent
  const urgentCount = useMemo(() => {
    const siteUrgent = websites.filter(w => w.status === 'grace_period' || w.status === 'pending_renewal').length;
    const domUrgent = domains.filter(d => d.status === 'grace_period' || d.status === 'pending_renewal').length;
    return siteUrgent + domUrgent;
  }, [websites, domains]);

  // Aggregate stats
  const totalFleetCostZAR = websites.length * 1345;
  const totalStorageGB = websites.reduce((acc, curr) => acc + curr.diskUsedGB, 0).toFixed(1);
  const totalBandwidthGB = websites.reduce((acc, curr) => acc + curr.bandwidthUsedGB, 0).toFixed(1);

  // Filtered websites
  const filteredWebsites = useMemo(() => {
    return websites.filter(site => {
      const matchesSearch = 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.ipAddress.includes(searchQuery);

      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'urgent' ? (site.status === 'grace_period' || site.status === 'pending_renewal') :
        site.status === 'active';

      const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [websites, searchQuery, statusFilter, categoryFilter]);

  // Handle successful website hosting renewal
  const handleConfirmRenewal = (siteId: string, years: number, totalPaidZAR: number) => {
    setWebsites(prev => prev.map(site => {
      if (site.id !== siteId) return site;

      const currentYear = 2026;
      const newYear = currentYear + years;
      const monthDay = site.id === 'site-glenanda' ? '09-27' : site.id === 'site-elijah' ? '10-01' : '09-28';
      const newDate = `${newYear}-${monthDay}`;

      return {
        ...site,
        status: 'active',
        renewalDate: newDate,
        daysRemaining: 365 * years,
        deactivationDeadline: undefined,
      };
    }));

    setInvoices(prev => prev.map(inv => {
      if (inv.websiteId === siteId) {
        return {
          ...inv,
          status: 'Paid',
          paymentMethod: 'Instant EFT (Ozow / Capitec Pay)',
          receiptNumber: `REC-ZA-${Math.floor(100000 + Math.random() * 900000)}`,
        };
      }
      return inv;
    }));

    const siteObj = websites.find(w => w.id === siteId);
    showToast(`🎉 Settle completed for ${siteObj?.name}! Renewed for ${years} yr(s) (R${totalPaidZAR.toLocaleString()}).`);
    setRenewalSite(null);
  };

  // Handle successful domain renewal (e.g. elijahchurch.org for R356, or .com for R232)
  const handleConfirmDomainRenewal = (domainId: string, years: number, totalPaidZAR: number) => {
    setDomains(prev => prev.map(dom => {
      if (dom.id !== domainId) return dom;

      const currentYear = 2026;
      const newYear = currentYear + years;
      const monthDay = dom.domain === 'elijahchurch.org' ? '10-01' : '09-28';
      const newDate = `${newYear}-${monthDay}`;

      return {
        ...dom,
        status: 'active',
        renewalDate: newDate,
        daysRemaining: 365 * years,
      };
    }));

    // Update or mark domain invoice as Paid
    setInvoices(prev => prev.map(inv => {
      if (inv.domainName === 'elijahchurch.org' || inv.id.includes(domainId)) {
        return {
          ...inv,
          status: 'Paid',
          paymentMethod: 'Capitec Pay / Ozow',
          receiptNumber: `REC-DOM-${Math.floor(100000 + Math.random() * 900000)}`,
        };
      }
      return inv;
    }));

    const targetDom = domains.find(d => d.id === domainId);
    showToast(`🌐 Domain ${targetDom?.domain} successfully renewed for ${years} year(s) (R${totalPaidZAR})!`);
    setRenewalDomain(null);
  };

  // Handle registering a new domain
  const handleRegisterDomain = (domainName: string, tld: string, priceZAR: number) => {
    const newDomain: RegisteredDomain = {
      id: `dom-${Date.now()}`,
      domain: domainName,
      tld,
      category: 'New Registration',
      annualPriceZAR: priceZAR,
      status: 'active',
      renewalDate: '2027-09-28',
      daysRemaining: 365,
      autoRenew: true,
      dnssec: true,
      whoisPrivacy: true,
      nameservers: ['ns1.southflow.co.za', 'ns2.southflow.co.za'],
    };

    setDomains(prev => [newDomain, ...prev]);

    const newInvoice: Invoice = {
      id: `INV-DOM-${Date.now().toString().slice(-6)}`,
      domainName,
      type: 'domain',
      amountZAR: priceZAR,
      dateIssued: '2026-09-28',
      dueDate: '2026-09-28',
      status: 'Paid',
      paymentMethod: 'Instant EFT (Ozow)',
      description: `Annual ${tld} Domain Registration & Anycast DNSSEC (${domainName})`,
      receiptNumber: `REC-DOM-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setInvoices(prev => [newInvoice, ...prev]);

    showToast(`🌐 ${domainName} successfully registered at R${priceZAR}/year!`);
  };

  const handleAddWebsite = (newSite: HostedWebsite) => {
    setWebsites(prev => [newSite, ...prev]);
    const newInvoice: Invoice = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      websiteId: newSite.id,
      domainName: newSite.domain,
      type: 'hosting',
      amountZAR: 1345,
      dateIssued: '2026-09-28',
      dueDate: '2026-09-28',
      status: 'Paid',
      paymentMethod: 'Instant EFT (Teraco)',
      description: `Annual Cloud Web Hosting Renewal (R1,345/yr)`,
      receiptNumber: `REC-ZA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setInvoices(prev => [newInvoice, ...prev]);
    showToast(`🚀 ${newSite.domain} deployed to Teraco JB1 cluster!`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-100 flex font-sans antialiased selection:bg-white selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111114] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#27272a] animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Desktop Sidebar (Vercel Style) */}
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          sitesCount={websites.length}
          domainsCount={domains.length}
          criticalCount={urgentCount}
          totalDiskGB={totalStorageGB}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="relative z-10 w-64 bg-[#000000]">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              onOpenAddModal={() => {
                setIsAddModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              sitesCount={websites.length}
              domainsCount={domains.length}
              criticalCount={urgentCount}
              totalDiskGB={totalStorageGB}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        
        {/* Vercel Top Breadcrumb & Status Bar */}
        <header className="sticky top-0 z-30 h-14 bg-[#000000]/90 backdrop-blur border-b border-[#1e1e24] px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md bg-[#111114] text-zinc-400 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
              <span className="text-white font-semibold">SouthFlow Cloud</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300 font-mono">za-production</span>
              <span className="text-zinc-600">/</span>
              <span className="text-white capitalize font-mono text-[11px]">{activeTab}</span>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 bg-[#0c0c0e] px-2.5 py-1 rounded-md border border-[#222227] text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-500">.com Domain:</span>
              <span className="text-emerald-400 font-bold">R232/yr</span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-[#0c0c0e] px-2.5 py-1 rounded-md border border-[#222227] text-[11px] font-mono text-zinc-400">
              <span className="text-zinc-500">Hosting:</span>
              <span className="text-zinc-200 font-bold">R1,345/yr</span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deploy Site</span>
            </button>
          </div>
        </header>

        {/* Inner Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
          
          {/* TAB 1: WEBSITES FLEET */}
          {activeTab === 'websites' && (
            <div className="space-y-6">
              
              {/* Critical Notice Banner for Glenanda Hotel & Elijah Church */}
              <AlertBanner
                glenandaHotel={glenandaHotel}
                elijahChurch={elijahChurch}
                onQuickRenew={(site) => setRenewalSite(site)}
                onFilterUrgent={() => setStatusFilter('urgent')}
              />

              {/* Vercel Metrics Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-[#0c0c0e] border border-[#1e1e24] hover:border-[#2e2e36] transition-colors">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span>HOSTED DOMAINS</span>
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1.5 tracking-tight font-mono">
                    {websites.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    R1,345/yr per site tier
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0c0c0e] border border-[#1e1e24] hover:border-[#2e2e36] transition-colors">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span>ANNUAL FLEET</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1.5 tracking-tight font-mono">
                    R{totalFleetCostZAR.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">
                    15 websites @ R1,345
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0c0c0e] border border-[#1e1e24] hover:border-[#2e2e36] transition-colors">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span>DOMAINS PORTFOLIO</span>
                    <AtSign className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1.5 tracking-tight font-mono">
                    {domains.length} <span className="text-xs font-normal text-zinc-500">Domains</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono">
                    .com R232 • .org R356
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0c0c0e] border border-[#1e1e24] hover:border-[#2e2e36] transition-colors">
                  <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                    <span>BANDWIDTH</span>
                    <Wifi className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1.5 tracking-tight font-mono">
                    {totalBandwidthGB} <span className="text-xs font-normal text-zinc-500">GB</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Uncapped 10Gbps NAPAfrica
                  </div>
                </div>
              </div>

              {/* Filter & Search Toolbar */}
              <div className="bg-[#0c0c0e] p-3 rounded-xl border border-[#1e1e24] flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 15 websites by domain, business name, or IP..."
                    className="w-full bg-[#111114] border border-[#222227] rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors font-mono"
                  />
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#111114] p-1 rounded-lg border border-[#222227] text-xs">
                    <button
                      onClick={() => setStatusFilter('all')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        statusFilter === 'all'
                          ? 'bg-zinc-800 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      All ({websites.length})
                    </button>
                    <button
                      onClick={() => setStatusFilter('urgent')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                        statusFilter === 'urgent'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-rose-400 hover:text-rose-300'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>Action Required</span>
                    </button>
                    <button
                      onClick={() => setStatusFilter('active')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        statusFilter === 'active'
                          ? 'bg-zinc-800 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Active ({websites.filter(w => w.status === 'active').length})
                    </button>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-[#111114] p-1 rounded-lg border border-[#222227]">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-md text-xs transition-colors ${
                        viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Grid Cards"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-md text-xs transition-colors ${
                        viewMode === 'table' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Dense Table"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Websites Grid or Table */}
              {filteredWebsites.length === 0 ? (
                <div className="text-center py-16 bg-[#0c0c0e] rounded-xl border border-[#1e1e24]">
                  <Globe className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">No websites match your filter</h3>
                  <p className="text-xs text-zinc-400 mt-1">Try resetting your search query.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                    className="mt-4 px-3 py-1.5 bg-white text-black font-semibold rounded-md text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWebsites.map((site) => (
                    <WebsiteCard
                      key={site.id}
                      site={site}
                      onRenew={(s) => setRenewalSite(s)}
                      onManage={(s) => setManageSite(s)}
                      onPreview={(s) => setPreviewSite(s)}
                    />
                  ))}
                </div>
              ) : (
                <WebsitesTable
                  websites={filteredWebsites}
                  onRenew={(s) => setRenewalSite(s)}
                  onManage={(s) => setManageSite(s)}
                  onPreview={(s) => setPreviewSite(s)}
                />
              )}

            </div>
          )}

          {/* TAB 2: DOMAINS & DNS (Features .com @ R232 & elijahchurch.org @ R356) */}
          {activeTab === 'domains' && (
            <DomainsView
              domains={domains}
              onRenewDomain={(dom) => setRenewalDomain(dom)}
              onRegisterDomain={handleRegisterDomain}
            />
          )}

          {/* TAB 3: PRICING & PLAN */}
          {activeTab === 'pricing' && (
            <HostingPlansView onHostNewSite={() => setIsAddModalOpen(true)} />
          )}

          {/* TAB 4: INVOICES & BILLING */}
          {activeTab === 'invoices' && (
            <InvoicesView
              invoices={invoices}
              websites={websites}
              onPayInvoice={(site) => setRenewalSite(site)}
            />
          )}

          {/* TAB 5: SERVER HEALTH & TERACO DATACENTER */}
          {activeTab === 'server' && (
            <ServerHealthView />
          )}

        </main>
      </div>

      {/* Modals & Drawers */}
      <RenewalModal
        site={renewalSite}
        onClose={() => setRenewalSite(null)}
        onConfirmRenewal={handleConfirmRenewal}
      />

      <DomainRenewalModal
        domain={renewalDomain}
        onClose={() => setRenewalDomain(null)}
        onConfirmDomainRenewal={handleConfirmDomainRenewal}
      />

      <LivePreviewModal
        site={previewSite}
        onClose={() => setPreviewSite(null)}
        onRenewFromPreview={(site) => {
          setPreviewSite(null);
          setRenewalSite(site);
        }}
      />

      <SiteDrawer
        site={manageSite}
        onClose={() => setManageSite(null)}
        onRenew={(site) => {
          setManageSite(null);
          setRenewalSite(site);
        }}
      />

      <AddWebsiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWebsite={handleAddWebsite}
      />

    </div>
  );
};

export default App;
