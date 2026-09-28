import React, { useState, useMemo } from 'react';
import { 
  Globe, Server, ShieldCheck, Zap, HardDrive, 
  Wifi, Search, Filter, LayoutGrid, List, Plus, 
  RefreshCw, CheckCircle2, AlertTriangle, Clock, ArrowUpRight 
} from 'lucide-react';
import { HostedWebsite, Invoice } from './types/hosting';
import { MOCK_WEBSITES, INITIAL_INVOICES } from './data/mockWebsites';
import { Navbar } from './components/Navbar';
import { AlertBanner } from './components/AlertBanner';
import { WebsiteCard } from './components/WebsiteCard';
import { WebsitesTable } from './components/WebsitesTable';
import { RenewalModal } from './components/RenewalModal';
import { LivePreviewModal } from './components/LivePreviewModal';
import { SiteDrawer } from './components/SiteDrawer';
import { HostingPlansView } from './components/HostingPlansView';
import { InvoicesView } from './components/InvoicesView';
import { ServerHealthView } from './components/ServerHealthView';
import { AddWebsiteModal } from './components/AddWebsiteModal';

export const App: React.FC = () => {
  const [websites, setWebsites] = useState<HostedWebsite[]>(MOCK_WEBSITES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [activeTab, setActiveTab] = useState<'websites' | 'pricing' | 'invoices' | 'server'>('websites');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'urgent' | 'active'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals & Drawers
  const [renewalSite, setRenewalSite] = useState<HostedWebsite | null>(null);
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
    return websites.filter(w => w.status === 'grace_period' || w.status === 'pending_renewal').length;
  }, [websites]);

  // Aggregate stats
  const totalFleetCostZAR = websites.length * 1345;
  const totalStorageGB = websites.reduce((acc, curr) => acc + curr.diskUsedGB, 0).toFixed(1);
  const totalBandwidthGB = websites.reduce((acc, curr) => acc + curr.bandwidthUsedGB, 0).toFixed(1);

  // Filtered websites
  const filteredWebsites = useMemo(() => {
    return websites.filter(site => {
      // Search
      const matchesSearch = 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.ipAddress.includes(searchQuery);

      // Status
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'urgent' ? (site.status === 'grace_period' || site.status === 'pending_renewal') :
        site.status === 'active';

      // Category
      const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [websites, searchQuery, statusFilter, categoryFilter]);

  // Handle successful renewal
  const handleConfirmRenewal = (siteId: string, years: number, totalPaidZAR: number) => {
    setWebsites(prev => prev.map(site => {
      if (site.id !== siteId) return site;

      // Extend date
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

    // Update corresponding invoice to Paid
    setInvoices(prev => prev.map(inv => {
      if (inv.websiteId === siteId) {
        return {
          ...inv,
          status: 'Paid',
          paymentMethod: 'Instant EFT / Capitec Pay',
          receiptNumber: `REC-ZA-${Math.floor(100000 + Math.random() * 900000)}`,
        };
      }
      return inv;
    }));

    const siteObj = websites.find(w => w.id === siteId);
    showToast(`🎉 Successfully renewed ${siteObj?.name} for ${years} year(s)! Paid R${totalPaidZAR.toLocaleString()}.`);
    setRenewalSite(null);
  };

  // Handle adding new website
  const handleAddWebsite = (newSite: HostedWebsite) => {
    setWebsites(prev => [newSite, ...prev]);
    // Create an invoice for it
    const newInvoice: Invoice = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      websiteId: newSite.id,
      domainName: newSite.domain,
      amountZAR: 1345,
      dateIssued: '2026-09-28',
      dueDate: '2026-09-28',
      status: 'Paid',
      paymentMethod: 'Credit Card (Instant)',
      receiptNumber: `REC-ZA-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setInvoices(prev => [newInvoice, ...prev]);
    showToast(`🚀 ${newSite.domain} provisioned on ${newSite.serverLocation}!`);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-400/40 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        sitesCount={websites.length}
        criticalCount={urgentCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Content based on Active Tab */}
        {activeTab === 'websites' && (
          <div className="space-y-6">
            
            {/* Urgent Banners for Glenanda Hotel & Elijah Church */}
            <AlertBanner
              glenandaHotel={glenandaHotel}
              elijahChurch={elijahChurch}
              onQuickRenew={(site) => setRenewalSite(site)}
              onFilterUrgent={() => setStatusFilter('urgent')}
            />

            {/* Metrics Quick Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Hosted Websites</span>
                  <Globe className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-white mt-1">
                  {websites.length} <span className="text-xs font-normal text-slate-400">Domains</span>
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Fixed R1,345/yr tier
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Annual Fleet Total</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white mt-1">
                  R{totalFleetCostZAR.toLocaleString()} <span className="text-xs font-normal text-slate-400">/yr</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {websites.length} × R1,345 per site
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>NVMe Storage Used</span>
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-white mt-1">
                  {totalStorageGB} <span className="text-xs font-normal text-slate-400">/ 600 GB</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Gen4 Enterprise RAID10
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Monthly Traffic</span>
                  <Wifi className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-white mt-1">
                  {totalBandwidthGB} <span className="text-xs font-normal text-slate-400">GB</span>
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  Unmetered 10Gbps NAPAfrica
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 15 websites by name, domain, category..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>

              {/* Status Filters & View Toggle */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      statusFilter === 'all'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({websites.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('urgent')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                      statusFilter === 'urgent'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-rose-400 hover:text-rose-300'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Action Required ({urgentCount})</span>
                  </button>
                  <button
                    onClick={() => setStatusFilter('active')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      statusFilter === 'active'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Active ({websites.length - urgentCount})
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Grid Cards"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Dense Table"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Websites Display: Cards or Table */}
            {filteredWebsites.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
                <Globe className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No websites match your filter</h3>
                <p className="text-xs text-slate-400 mt-1">Try clearing your search query or filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <HostingPlansView onHostNewSite={() => setIsAddModalOpen(true)} />
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <InvoicesView
            invoices={invoices}
            websites={websites}
            onPayInvoice={(site) => setRenewalSite(site)}
          />
        )}

        {/* Server Health Tab */}
        {activeTab === 'server' && (
          <ServerHealthView />
        )}

      </main>

      {/* Modals & Drawers */}
      <RenewalModal
        site={renewalSite}
        onClose={() => setRenewalSite(null)}
        onConfirmRenewal={handleConfirmRenewal}
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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>ApexHost Cloud South Africa • 15 Demo Websites Hosted</span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400 font-semibold">R1,345 / yr per website</span>
          </div>
          <div className="text-slate-500 font-mono">
            Current Date: 28 September 2026 • Teraco JB1 Data Hub
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
