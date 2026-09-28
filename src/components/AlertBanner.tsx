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
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 mb-6 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-300">All 15 Hosted Websites are Healthy & Current</h4>
            <p className="text-xs text-emerald-400/80">No immediate renewals pending. All NVMe storage clusters and SSL certs operational.</p>
          </div>
        </div>
        <div className="text-xs font-medium text-emerald-400 bg-emerald-900/50 px-3 py-1.5 rounded-lg border border-emerald-500/30">
          Cluster Status: 100% Online
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      {/* Critical Alert 1: Glenanda Hotel - 4 Days left before deactivation */}
      {isGlenandaGrace && glenandaHotel && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-slate-900 border-2 border-rose-500/60 shadow-xl shadow-rose-950/40 p-4 sm:p-5 transition-all">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="relative p-2.5 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/40 flex-shrink-0 animate-pulse">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-ping"></span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow-sm">
                    CRITICAL: GRACE PERIOD ACTIVE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-700/60">
                    Expired: 27 September 2026
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-600/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ONLY 4 DAYS LEFT TO BE DEACTIVATED!
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Glenanda Hotel & Suites</span>
                  <span className="text-xs font-mono text-rose-300 font-normal underline">glenanda-hotel.co.za</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  The yearly cloud hosting renewal (<strong className="text-white font-semibold">R1,345/yr</strong>) expired on <strong className="text-rose-200">27 September</strong>. The 5-day grace period is running out fast. If payment is not settled by <strong className="text-amber-300">1 October 2026 (4 days)</strong>, the live hotel booking portal and email services will be permanently suspended.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-rose-800/40">
              <div className="text-left sm:text-right">
                <div className="text-xs text-rose-300 font-medium">Annual Renewal Due</div>
                <div className="text-2xl font-black text-white tracking-tight">R1,345<span className="text-xs font-normal text-slate-400">/year</span></div>
              </div>
              <button
                onClick={() => onQuickRenew(glenandaHotel)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <CreditCard className="w-4 h-4" />
                <span>Renew Glenanda Hotel (R1,345)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert 2: Elijah Church - Due on 1 October (in 3 days) */}
      {isElijahPending && elijahChurch && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/60 via-indigo-950/40 to-slate-900 border border-amber-500/40 shadow-lg shadow-amber-950/20 p-4 sm:p-5 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    PENDING RENEWAL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50">
                    Due Date: 1 October 2026 (In 3 Days)
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Elijah Church International</span>
                  <span className="text-xs font-mono text-indigo-300 font-normal underline">elijahchurch.org.za</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Annual hosting renewal (<strong className="text-white font-semibold">R1,345/yr</strong>) is due in 3 days on <strong className="text-amber-200">1 October 2026</strong>. Renew now to avoid sermon streaming disruptions or auto-debit failure.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-800/40">
              <div className="text-left sm:text-right">
                <div className="text-xs text-amber-300/80 font-medium">Standard Cloud Tier</div>
                <div className="text-2xl font-black text-white tracking-tight">R1,345<span className="text-xs font-normal text-slate-400">/year</span></div>
              </div>
              <button
                onClick={() => onQuickRenew(elijahChurch)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <CreditCard className="w-4 h-4" />
                <span>Renew Elijah Church (R1,345)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
