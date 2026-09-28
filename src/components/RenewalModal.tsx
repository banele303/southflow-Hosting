import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, Landmark, 
  QrCode, AlertCircle, Clock, Zap, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { HostedWebsite } from '../types/hosting';

interface RenewalModalProps {
  site: HostedWebsite | null;
  onClose: () => void;
  onConfirmRenewal: (siteId: string, years: number, totalPaidZAR: number) => void;
}

export const RenewalModal: React.FC<RenewalModalProps> = ({
  site,
  onClose,
  onConfirmRenewal,
}) => {
  if (!site) return null;

  const [durationYears, setDurationYears] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'capitec' | 'card' | 'snapscan'>('ozow');
  const [selectedBank, setSelectedBank] = useState<string>('Capitec');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Calculate pricing based on years
  const baseRate = 1345;
  let subtotal = baseRate * durationYears;
  let discount = 0;
  if (durationYears === 2) {
    discount = Math.round(subtotal * 0.05); // 5% discount
  } else if (durationYears === 3) {
    discount = Math.round(subtotal * 0.10); // 10% discount
  }
  const finalTotal = subtotal - discount;

  const isGlenanda = site.id === 'site-glenanda';
  const isElijah = site.id === 'site-elijah';

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmRenewal(site.id, durationYears, finalTotal);
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className={`p-6 border-b ${
          isGlenanda && site.status === 'grace_period'
            ? 'bg-gradient-to-r from-rose-950/60 to-slate-900 border-rose-800/40'
            : isElijah && site.status === 'pending_renewal'
            ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-800/40'
            : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-md"
                style={{ 
                  backgroundColor: site.previewDetails.themeColor + '20', 
                  color: site.previewDetails.themeColor,
                  border: `1px solid ${site.previewDetails.themeColor}50`
                }}
              >
                {site.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Renew Hosting: {site.name}</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">{site.domain}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Urgent Note for Glenanda Hotel or Elijah Church */}
          {isGlenanda && site.status === 'grace_period' && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/90 border border-rose-500/60 text-xs text-rose-200 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-100 font-bold block">Notice: 1 Day Remaining (Cutoff: 29 September)</strong>
                Renewing today immediately restores full operational status, clears deactivation notices, and extends hosting until <strong className="text-white">27 September 2027</strong>.
              </div>
            </div>
          )}

          {isElijah && site.status === 'pending_renewal' && (
            <div className="mt-4 p-3 rounded-xl bg-amber-950/90 border border-amber-500/50 text-xs text-amber-200 flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-100 font-bold block">Scheduled Renewal: 1 October 2026 (In 3 Days)</strong>
                Renew in advance now to prevent interruption of church audio/video broadcasts and web portals.
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Payment Received!</h4>
            <p className="text-sm text-slate-300">
              Successfully renewed <strong className="text-indigo-300">{site.name}</strong> for {durationYears} year(s).
            </p>
            <div className="p-3 rounded-xl bg-slate-950 text-xs font-mono text-emerald-400 border border-emerald-500/30">
              Tax Invoice REC-ZA-{Math.floor(100000 + Math.random() * 900000)} generated.
              <br />Deactivation alert cleared.
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Renewal Duration:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDurationYears(1)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    durationYears === 1
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">1 Year</div>
                  <div className="text-xs text-indigo-400 font-semibold mt-0.5">R1,345</div>
                  <div className="text-[10px] text-slate-400 mt-1">Standard Rate</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationYears(2)}
                  className={`p-3 rounded-xl border text-left relative transition-all ${
                    durationYears === 2
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    SAVE 5%
                  </span>
                  <div className="font-bold text-sm">2 Years</div>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5">R2,555</div>
                  <div className="text-[10px] text-slate-400 mt-1">Save R135</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationYears(3)}
                  className={`p-3 rounded-xl border text-left relative transition-all ${
                    durationYears === 3
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    SAVE 10%
                  </span>
                  <div className="font-bold text-sm">3 Years</div>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5">R3,630</div>
                  <div className="text-[10px] text-slate-400 mt-1">Save R405</div>
                </button>
              </div>
            </div>

            {/* Payment Method Selector (South African Gateways) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                South African Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ozow')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'ozow'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <span className="block font-semibold">Ozow Instant EFT</span>
                    <span className="text-[10px] text-slate-500">Zero fees • All SA Banks</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('capitec')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'capitec'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <div className="text-left">
                    <span className="block font-semibold">Capitec Pay</span>
                    <span className="text-[10px] text-slate-500">Approve on phone</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <div className="text-left">
                    <span className="block font-semibold">Credit/Debit Card</span>
                    <span className="text-[10px] text-slate-500">Visa / Mastercard 3DS</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('snapscan')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'snapscan'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-purple-400" />
                  <div className="text-left">
                    <span className="block font-semibold">SnapScan / Zapper</span>
                    <span className="text-[10px] text-slate-500">Instant QR scan</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bank selector for Ozow / EFT */}
            {paymentMethod === 'ozow' && (
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Select Your Bank:</span>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {['Capitec', 'FNB', 'Standard Bank', 'Absa', 'Nedbank', 'Investec', 'TymeBank', 'Discovery'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        selectedBank === bank
                          ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Hosting Plan:</span>
                <span className="text-slate-200">Yearly Cloud Host (R1,345/yr)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Duration:</span>
                <span className="text-slate-200">{durationYears} Year(s)</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Term Discount:</span>
                  <span>- R{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>VAT (15% Included):</span>
                <span className="text-slate-200">R{Math.round(finalTotal * 0.15).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
                <span className="font-bold text-white">Total Amount Due:</span>
                <span className="text-xl font-black text-emerald-400">R{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="w-1/3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment via {paymentMethod === 'ozow' ? selectedBank : 'Gateway'}...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay R{finalTotal.toLocaleString()} & Settle Renewal</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
