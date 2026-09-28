import React from 'react';
import { 
  Globe, ExternalLink, Shield, HardDrive, Wifi, 
  Calendar, AlertCircle, Clock, RefreshCw, Settings, Eye 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface WebsitesTableProps {
  websites: HostedWebsite[];
  onRenew: (site: HostedWebsite) => void;
  onManage: (site: HostedWebsite) => void;
  onPreview: (site: HostedWebsite) => void;
}

export const WebsitesTable: React.FC<WebsitesTableProps> = ({
  websites,
  onRenew,
  onManage,
  onPreview,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1e1e24] bg-[#0c0c0e]">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#111114] text-zinc-400 font-mono border-b border-[#1e1e24] uppercase tracking-wider text-[11px]">
          <tr>
            <th className="py-3 px-4">Website & Domain</th>
            <th className="py-3 px-3">Status</th>
            <th className="py-3 px-3">Annual Plan</th>
            <th className="py-3 px-3">Renewal Date</th>
            <th className="py-3 px-3">Storage</th>
            <th className="py-3 px-3">Traffic</th>
            <th className="py-3 px-3">Datacenter</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e24] text-zinc-300">
          {websites.map((site) => {
            const isGrace = site.status === 'grace_period';
            const isPending = site.status === 'pending_renewal';
            const diskPercent = Math.min(100, Math.round((site.diskUsedGB / site.diskTotalGB) * 100));

            return (
              <tr 
                key={site.id} 
                className={`transition-colors ${
                  isGrace 
                    ? 'bg-rose-950/20 hover:bg-rose-950/30' 
                    : isPending 
                    ? 'bg-amber-950/15 hover:bg-amber-950/25' 
                    : 'hover:bg-zinc-900/40'
                }`}
              >
                {/* Domain & Name */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-7 h-7 rounded flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
                      style={{ 
                        backgroundColor: site.previewDetails.themeColor + '20', 
                        color: site.previewDetails.themeColor,
                        border: `1px solid ${site.previewDetails.themeColor}40`
                      }}
                    >
                      {site.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>{site.name}</span>
                        {isGrace && (
                          <span className="text-[9px] bg-rose-600 text-white font-mono font-extrabold px-1.5 py-0.2 rounded">
                            4D DEACTIVATION
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-zinc-500 text-[11px] flex items-center gap-1">
                        <span>{site.domain}</span>
                        <button 
                          onClick={() => onPreview(site)}
                          className="hover:text-white"
                        >
                          <ExternalLink className="w-3 h-3 inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3 whitespace-nowrap">
                  {isGrace ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 w-fit animate-pulse">
                      <AlertCircle className="w-3 h-3 text-rose-400" />
                      Grace: 1d Left (29 Sep)
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

                {/* Annual Cost */}
                <td className="py-3 px-3 whitespace-nowrap font-mono">
                  <span className="font-bold text-white">R{site.annualPriceZAR.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-500 block">per year</span>
                </td>

                {/* Renewal Date */}
                <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                  <span className={isGrace ? 'text-rose-400 font-bold' : isPending ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                    {site.renewalDate}
                  </span>
                  <span className="text-[10px] text-zinc-500 block">
                    {isGrace ? 'Expired 27 Sep' : isPending ? 'Due in 3 days' : `In ${site.daysRemaining} days`}
                  </span>
                </td>

                {/* Disk Storage */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="font-mono text-zinc-300 text-[11px]">{site.diskUsedGB} / {site.diskTotalGB} GB</div>
                  <div className="w-20 bg-zinc-800 rounded-full h-1 mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${diskPercent > 70 ? 'bg-amber-500' : 'bg-white'}`}
                      style={{ width: `${diskPercent}%` }}
                    ></div>
                  </div>
                </td>

                {/* Bandwidth Traffic */}
                <td className="py-3 px-3 whitespace-nowrap font-mono text-zinc-400 text-[11px]">
                  {site.bandwidthUsedGB} GB/mo
                </td>

                {/* Server Location */}
                <td className="py-3 px-3 whitespace-nowrap text-zinc-400 text-[11px] font-mono">
                  {site.serverLocation.replace(' (Teraco ', ' ')}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onRenew(site)}
                      className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all active:scale-95 ${
                        isGrace
                          ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                          : isPending
                          ? 'bg-amber-600 hover:bg-amber-500 text-white'
                          : 'bg-white hover:bg-zinc-200 text-black'
                      }`}
                    >
                      {isGrace ? 'Settle (R1,345)' : isPending ? 'Renew (R1,345)' : 'Renew'}
                    </button>

                    <button
                      onClick={() => onManage(site)}
                      title="Manage Server"
                      className="p-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700/60"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onPreview(site)}
                      title="Preview Website"
                      className="p-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700/60"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
