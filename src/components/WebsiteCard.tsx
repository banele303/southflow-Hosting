import React from 'react';
import { 
  Globe, ExternalLink, HardDrive, Wifi, Shield, Server, 
  Calendar, AlertCircle, Clock, CheckCircle, RefreshCw, 
  Settings, Eye, ArrowUpRight, Zap 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface WebsiteCardProps {
  site: HostedWebsite;
  onRenew: (site: HostedWebsite) => void;
  onManage: (site: HostedWebsite) => void;
  onPreview: (site: HostedWebsite) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  site,
  onRenew,
  onManage,
  onPreview,
}) => {
  const isGrace = site.status === 'grace_period';
  const isPending = site.status === 'pending_renewal';
  const isActive = site.status === 'active';

  // Calculate disk percentage
  const diskPercent = Math.min(100, Math.round((site.diskUsedGB / site.diskTotalGB) * 100));

  return (
    <div 
      className={`group relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
        isGrace
          ? 'bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/80 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/50 hover:border-rose-400'
          : isPending
          ? 'bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/70 shadow-md shadow-amber-950/20 hover:border-amber-400'
          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/80 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5'
      }`}
    >
      {/* Top Banner for Urgent Status */}
      {isGrace && (
        <div className="bg-rose-600 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-white tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>ONLY 4 DAYS TO BE DEACTIVATED!</span>
          </div>
          <span className="text-[11px] font-mono bg-rose-800 px-1.5 py-0.5 rounded">
            Expired 27 Sept
          </span>
        </div>
      )}

      {isPending && (
        <div className="bg-amber-600/90 px-4 py-1.5 flex items-center justify-between text-xs font-semibold text-white tracking-wide">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>RENEWAL DUE: 1 OCTOBER (IN 3 DAYS)</span>
          </div>
          <span className="text-[11px] font-mono bg-amber-800/80 px-1.5 py-0.5 rounded">
            R1,345/yr
          </span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Header: Title, Domain, Status Badge */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0"
                style={{ 
                  backgroundColor: site.previewDetails.themeColor + '20', 
                  color: site.previewDetails.themeColor,
                  border: `1px solid ${site.previewDetails.themeColor}50`
                }}
              >
                {site.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base text-white truncate group-hover:text-indigo-300 transition-colors">
                  {site.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span>{site.domain}</span>
                  <button 
                    onClick={() => onPreview(site)}
                    title="Preview Website"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 inline" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {isGrace ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 shadow-sm whitespace-nowrap animate-pulse">
                <AlertCircle className="w-3 h-3 text-rose-400" />
                Grace Period
              </span>
            ) : isPending ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 text-amber-400" />
                Due in 3d
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
              {site.category}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-mono">
              {site.cms.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Renewal Expiry Info */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Renewal Date:
            </span>
            <span className={`font-mono font-medium ${
              isGrace ? 'text-rose-400 font-bold' : isPending ? 'text-amber-400 font-bold' : 'text-slate-200'
            }`}>
              {site.renewalDate}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Annual Plan:
            </span>
            <span className="font-bold text-white">
              R{site.annualPriceZAR.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/year</span>
            </span>
          </div>

          {/* Grace period warning message */}
          {isGrace && (
            <div className="text-[11px] font-semibold text-rose-300 bg-rose-950/80 p-2 rounded-lg border border-rose-800/60 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>Deactivation Cutoff: <strong>1 Oct 2026 (4 days)</strong></span>
            </div>
          )}

          {isPending && (
            <div className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 p-2 rounded-lg border border-amber-800/50 flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>Renewal in 3 days on 1 October 2026</span>
            </div>
          )}
        </div>

        {/* Resource Usage Meters */}
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-slate-400 mb-1 text-[11px]">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-slate-500" /> NVMe Storage
              </span>
              <span className="font-mono text-slate-300">{site.diskUsedGB} GB / {site.diskTotalGB} GB ({diskPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  diskPercent > 70 ? 'bg-amber-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${diskPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-slate-500" /> Traffic:
              <strong className="text-slate-300 font-mono font-normal ml-0.5">{site.bandwidthUsedGB} GB / mo</strong>
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3 h-3" /> SSL Active
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 border-t border-slate-800/60">
            <span className="flex items-center gap-1 truncate max-w-[170px]">
              <Server className="w-3 h-3" /> {site.serverLocation}
            </span>
            <span className="font-mono text-slate-400">{site.phpVersion}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2">
        {/* Renew Button */}
        <button
          onClick={() => onRenew(site)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md ${
            isGrace
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40 animate-pulse'
              : isPending
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isGrace ? 'Settle & Renew (R1,345)' : isPending ? 'Renew (R1,345)' : 'Extend (R1,345)'}</span>
        </button>

        {/* Manage Drawer Button */}
        <button
          onClick={() => onManage(site)}
          title="Server Management & cPanel"
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Live Preview Button */}
        <button
          onClick={() => onPreview(site)}
          title="Preview Live Website"
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
