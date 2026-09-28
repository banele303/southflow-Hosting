import React, { useState } from 'react';
import { 
  X, Server, HardDrive, Shield, Globe, Terminal, 
  Database, RefreshCw, Key, ExternalLink, Check, Copy, AlertTriangle 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface SiteDrawerProps {
  site: HostedWebsite | null;
  onClose: () => void;
  onRenew: (site: HostedWebsite) => void;
}

export const SiteDrawer: React.FC<SiteDrawerProps> = ({
  site,
  onClose,
  onRenew,
}) => {
  if (!site) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'dns' | 'backups' | 'ssl'>('overview');
  const [copiedIp, setCopiedIp] = useState<boolean>(false);
  const [restoringBackup, setRestoringBackup] = useState<boolean>(false);
  const [backupSuccess, setBackupSuccess] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleRestoreBackup = () => {
    setRestoringBackup(true);
    setTimeout(() => {
      setRestoringBackup(false);
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{ 
                    backgroundColor: site.previewDetails.themeColor + '20', 
                    color: site.previewDetails.themeColor 
                  }}
                >
                  {site.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base truncate max-w-[240px]">{site.name}</h3>
                  <p className="text-xs font-mono text-slate-400">{site.domain}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick SSO Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a 
                href={`https://${site.domain}/wp-admin`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>WP Admin Login</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a 
                href={`https://cpanel.${site.domain}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>cPanel SSO</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex border-b border-slate-800 px-6 bg-slate-900/50 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 border-b-2 transition-colors ${
                activeTab === 'overview' ? 'border-indigo-500 text-white' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('dns')}
              className={`py-3 px-3 border-b-2 transition-colors ${
                activeTab === 'dns' ? 'border-indigo-500 text-white' : 'border-transparent hover:text-slate-200'
              }`}
            >
              DNS Records
            </button>
            <button
              onClick={() => setActiveTab('backups')}
              className={`py-3 px-3 border-b-2 transition-colors ${
                activeTab === 'backups' ? 'border-indigo-500 text-white' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Backups
            </button>
            <button
              onClick={() => setActiveTab('ssl')}
              className={`py-3 px-3 border-b-2 transition-colors ${
                activeTab === 'ssl' ? 'border-indigo-500 text-white' : 'border-transparent hover:text-slate-200'
              }`}
            >
              SSL Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
            {activeTab === 'overview' && (
              <>
                {/* Renewal Alert Card */}
                {site.status === 'grace_period' && (
                  <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>CRITICAL: 4 DAYS TO DEACTIVATION</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-rose-200/90">
                      Hosting expired on 27 Sept 2026. Settle the R1,345 yearly fee immediately to prevent automated service termination.
                    </p>
                    <button
                      onClick={() => onRenew(site)}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                    >
                      Renew Glenanda Hotel Now (R1,345)
                    </button>
                  </div>
                )}

                {site.status === 'pending_renewal' && (
                  <div className="p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>RENEWAL DUE: 1 OCTOBER 2026</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-200/90">
                      Due in 3 days. Total: R1,345/year.
                    </p>
                    <button
                      onClick={() => onRenew(site)}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                    >
                      Renew Elijah Church Now (R1,345)
                    </button>
                  </div>
                )}

                {/* Server Specs */}
                <div className="space-y-3">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">Server Environment</h4>
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Server IP (Johannesburg):</span>
                      <button 
                        onClick={() => copyToClipboard(site.ipAddress)}
                        className="font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {copiedIp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{site.ipAddress}</span>
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Web Engine:</span>
                      <span className="text-white font-mono">LiteSpeed Enterprise 6.2</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">PHP Version:</span>
                      <span className="text-emerald-400 font-mono font-semibold">{site.phpVersion}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Datacenter:</span>
                      <span className="text-white font-medium">{site.serverLocation}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Email Accounts:</span>
                      <span className="text-white">{site.emailAccounts} Active Mailboxes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Databases:</span>
                      <span className="text-white font-mono">{site.dbCount} MariaDB (InnoDB)</span>
                    </div>
                  </div>
                </div>

                {/* Billing Summary */}
                <div className="space-y-3">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">Hosting Tier</h4>
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Package:</span>
                      <span className="font-semibold text-white">Yearly Cloud Host</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Fee:</span>
                      <span className="font-bold text-emerald-400">R1,345.00 ZAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Renewal:</span>
                      <span className="font-mono text-white">{site.renewalDate}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'dns' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">Zone Records</h4>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    DNSSEC Active
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span className="text-indigo-400 font-bold">A Record</span>
                      <span>TTL: 300</span>
                    </div>
                    <div className="text-white">@ &nbsp; ➔ &nbsp; {site.ipAddress}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span className="text-amber-400 font-bold">CNAME</span>
                      <span>TTL: 300</span>
                    </div>
                    <div className="text-white">www &nbsp; ➔ &nbsp; {site.domain}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span className="text-emerald-400 font-bold">MX Record</span>
                      <span>Priority: 10</span>
                    </div>
                    <div className="text-white">mail.{site.domain}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span className="text-purple-400 font-bold">TXT (SPF)</span>
                      <span>TTL: 3600</span>
                    </div>
                    <div className="text-slate-300 break-all text-[10px]">
                      v=spf1 ip4:{site.ipAddress} include:relay.apexhost.co.za ~all
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backups' && (
              <div className="space-y-4">
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs">
                  Automated daily off-site snapshots retained for 30 days in Cape Town secondary vault.
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Daily Snapshot (Today, 03:00 AM)</div>
                      <div className="text-slate-500 text-[11px] font-mono">{site.diskUsedGB} GB • Complete Files + SQL</div>
                    </div>
                    <button
                      onClick={handleRestoreBackup}
                      disabled={restoringBackup}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all disabled:opacity-50"
                    >
                      {restoringBackup ? 'Restoring...' : 'Restore'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Weekly Snapshot (21 Sep 2026)</div>
                      <div className="text-slate-500 text-[11px] font-mono">{site.diskUsedGB - 0.4} GB • Complete Files + SQL</div>
                    </div>
                    <button
                      onClick={handleRestoreBackup}
                      disabled={restoringBackup}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
                    >
                      Restore
                    </button>
                  </div>
                </div>

                {backupSuccess && (
                  <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Backup restored successfully. Nginx & PHP reloaded.</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ssl' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Shield className="w-5 h-5" />
                    <span>Let's Encrypt Wildcard SSL Active</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div>Issuer: <strong>Let's Encrypt Authority X3</strong></div>
                    <div>Algorithm: <strong>RSA 2048 / SHA-256</strong></div>
                    <div>Domains Covered: <strong>{site.domain}, *.{site.domain}</strong></div>
                    <div>Auto-Renew: <strong className="text-emerald-400">Enabled</strong></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">ID: {site.id}</span>
            <button
              onClick={() => onRenew(site)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-900/30 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Renew Plan (R1,345)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
