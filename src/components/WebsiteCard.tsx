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
      className={`group relative rounded-xl transition-all duration-200 flex flex-col justify-between overflow-hidden border ${
        isGrace
          ? 'bg-[#0f0709] border-rose-600/80 shadow-lg shadow-rose-950/20 hover:border-rose-500'
          : isPending
          ? 'bg-[#0f0c07] border-amber-600/70 shadow-md shadow-amber-950/20 hover:border-amber-500'
          : 'bg-[#0c0c0e] hover:bg-[#111114] border-[#1e1e24] hover:border-[#33333d]'
      }`}
    >
      {/* Top Banner for Urgent Status */}
      {isGrace && (
        <div className="bg-rose-600 px-3.5 py-1.5 flex items-center justify-between text-xs font-bold text-white tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>ONLY 4 DAYS TO BE DEACTIVATED!</span>
          </div>
          <span className="text-[10px] font-mono bg-rose-800 px-1.5 py-0.5 rounded">
            Expired 27 Sept
          </span>
        </div>
      )}

      {isPending && (
        <div className="bg-amber-600 px-3.5 py-1.5 flex items-center justify-between text-xs font-semibold text-white tracking-wide">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>RENEWAL DUE: 1 OCTOBER (IN 3 DAYS)</span>
          </div>
          <span className="text-[10px] font-mono bg-amber-800 px-1.5 py-0.5 rounded">
            R1,345/yr
          </span>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Header: Title, Domain, Status Badge */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
                style={{ 
                  backgroundColor: site.previewDetails.themeColor + '20', 
                  color: site.previewDetails.themeColor,
                  border: `1px solid ${site.previewDetails.themeColor}50`
                }}
              >
                {site.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white truncate group-hover:text-zinc-200 transition-colors">
                  {site.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <span>{site.domain}</span>
                  <button 
                    onClick={() => onPreview(site)}
                    title="Preview Live Website"
                    className="hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 inline text-zinc-500 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {isGrace ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 whitespace-nowrap animate-pulse">
                <AlertCircle className="w-3 h-3 text-rose-400" />
                4D Grace
              </span>
            ) : isPending ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 text-amber-400" />
                Due 1 Oct
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#16161a] text-zinc-400 border border-[#222227]">
              {site.category}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#16161a] text-zinc-300 border border-[#222227] font-mono">
              {site.cms.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Renewal Info */}
        <div className="bg-[#111114] rounded-lg p-3 border border-[#1e1e24] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              Renewal Date:
            </span>
            <span className={`font-mono text-xs ${
              isGrace ? 'text-rose-400 font-bold' : isPending ? 'text-amber-400 font-bold' : 'text-zinc-200'
            }`}>
              {site.renewalDate}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Annual Plan:
            </span>
            <span className="font-bold text-white font-mono">
              R{site.annualPriceZAR.toLocaleString()} <span className="text-[10px] text-zinc-500 font-normal">/yr</span>
            </span>
          </div>

          {/* Alert Message for Glenanda or Elijah */}
          {isGrace && (
            <div className="text-[10.5px] font-medium text-rose-300 bg-rose-950/80 p-2 rounded border border-rose-800/60 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
              <span>Deactivation: <strong>1 Oct 2026 (4 days left)</strong></span>
            </div>
          )}

          {isPending && (
            <div className="text-[10.5px] font-medium text-amber-300 bg-amber-950/60 p-2 rounded border border-amber-800/50 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
              <span>Auto-renewal due in 3 days on 1 Oct 2026</span>
            </div>
          )}
        </div>

        {/* Resource Usage Meters */}
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-zinc-400 mb-1 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-zinc-500">
                <HardDrive className="w-3 h-3 text-zinc-500" /> Storage
              </span>
              <span>{site.diskUsedGB} / {site.diskTotalGB} GB ({diskPercent}%)</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  diskPercent > 70 ? 'bg-amber-500' : 'bg-white'
                }`}
                style={{ width: `${diskPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
            <span className="flex items-center gap-1 font-mono">
              <Wifi className="w-3 h-3 text-zinc-500" />
              <span>{site.bandwidthUsedGB} GB/mo</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-mono">
              <Shield className="w-3 h-3" /> TLS Active
            </span>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-zinc-500 pt-1 border-t border-[#1e1e24] font-mono">
            <span className="truncate max-w-[150px]">
              {site.serverLocation.replace(' (Teraco ', ' ')}
            </span>
            <span>{site.phpVersion}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-3 bg-[#111114] border-t border-[#1e1e24] flex items-center gap-2">
        <button
          onClick={() => onRenew(site)}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            isGrace
              ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
              : isPending
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-white hover:bg-zinc-200 text-black'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isGrace ? 'Settle & Renew (R1,345)' : isPending ? 'Renew (R1,345)' : 'Renew (R1,345)'}</span>
        </button>

        <button
          onClick={() => onManage(site)}
          title="Server Management & cPanel"
          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700/60"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onPreview(site)}
          title="Preview Live Website"
          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700/60"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
