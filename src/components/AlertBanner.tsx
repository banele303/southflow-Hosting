import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, CreditCard, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface AlertBannerProps {
  glenandaHotel?: HostedWebsite;
  elijahChurch?: HostedWebsite;
  onQuickRenew: (site: HostedWebsite) => void;
  onFilterUrgent: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  glenandaHotel,
  elijahChurch,
  onQuickRenew,
  onFilterUrgent,
}) => {
  const isGlenandaGrace = glenandaHotel?.status === 'grace_period';
  const isElijahPending = elijahChurch?.status === 'pending_renewal';

  if (!isGlenandaGrace && !isElijahPending) {
    return (
      <div className="bg-[#0c0c0e] border border-emerald-500/30 rounded-xl p-3.5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-emerald-300">All 15 Hosted Websites are Healthy & Current</h4>
            <p className="text-[11px] text-zinc-400">No overdue accounts. All NVMe storage clusters and SSL certificates operational.</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
          Cluster Status: 100% Online
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      {/* Critical Alert 1: Glenanda Hotel - 4 Days left before deactivation */}
      {isGlenandaGrace && glenandaHotel && (
        <div className="relative overflow-hidden rounded-xl bg-[#0e0709] border border-rose-600/70 p-4 sm:p-5 transition-all shadow-lg shadow-rose-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 flex-shrink-0 animate-pulse mt-0.5">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-wider bg-rose-600 text-white">
                    CRITICAL: GRACE PERIOD ACTIVE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-900 text-rose-300 border border-zinc-800">
                    Expired: 27 September 2026
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-600/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ONLY 4 DAYS TO BE DEACTIVATED!
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 pt-0.5">
                  <span>Glenanda Hotel & Suites</span>
                  <span className="text-xs font-mono text-rose-300 font-normal">glenanda-hotel.co.za</span>
                </h3>
                <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                  The yearly cloud hosting renewal (<strong className="text-white font-semibold">R1,345/yr</strong>) expired on <strong className="text-rose-200">27 September</strong>. The 5-day grace period is running out fast. If payment is not settled by <strong className="text-amber-300">1 October 2026 (4 days)</strong>, all hotel booking APIs and email routing will be permanently shut down.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-rose-900/40">
              <div className="text-left sm:text-right">
                <div className="text-[10px] text-zinc-400 font-mono">ANNUAL FEE DUE</div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">R1,345<span className="text-[10px] text-zinc-500 font-normal">/yr</span></div>
              </div>
              <button
                onClick={() => onQuickRenew(glenandaHotel)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Settle & Renew (R1,345)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert 2: Elijah Church - Due on 1 October (in 3 days) */}
      {isElijahPending && elijahChurch && (
        <div className="relative overflow-hidden rounded-xl bg-[#0f0c07] border border-amber-600/60 p-4 sm:p-5 transition-all shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    PENDING RENEWAL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-zinc-300 bg-zinc-900 border border-zinc-800">
                    Due Date: 1 October 2026 (In 3 Days)
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 pt-0.5">
                  <span>Elijah Church International</span>
                  <span className="text-xs font-mono text-zinc-400 font-normal">elijahchurch.org.za</span>
                </h3>
                <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                  Annual hosting renewal (<strong className="text-white font-semibold">R1,345/yr</strong>) is due in 3 days on <strong className="text-amber-200">1 October 2026</strong>. Settle now to maintain continuous church streaming and donation services.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-900/40">
              <div className="text-left sm:text-right">
                <div className="text-[10px] text-zinc-400 font-mono">ANNUAL FEE DUE</div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">R1,345<span className="text-[10px] text-zinc-500 font-normal">/yr</span></div>
              </div>
              <button
                onClick={() => onQuickRenew(elijahChurch)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Renew Advance (R1,345)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
