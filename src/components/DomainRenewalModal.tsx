import React, { useState } from 'react';
import { 
  X, ShieldCheck, CreditCard, Landmark, 
  Clock, Zap, CheckCircle2, Globe, QrCode 
} from 'lucide-react';
import { RegisteredDomain } from '../types/hosting';

interface DomainRenewalModalProps {
  domain: RegisteredDomain | null;
  onClose: () => void;
  onConfirmDomainRenewal: (domainId: string, years: number, totalPaidZAR: number) => void;
}

export const DomainRenewalModal: React.FC<DomainRenewalModalProps> = ({
  domain,
  onClose,
  onConfirmDomainRenewal,
}) => {
  if (!domain) return null;

  const [durationYears, setDurationYears] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'capitec' | 'card' | 'snapscan'>('ozow');
  const [selectedBank, setSelectedBank] = useState<string>('Capitec');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const baseRate = domain.annualPriceZAR;
  const subtotal = baseRate * durationYears;
  const finalTotal = subtotal;

  const isElijahOrg = domain.domain === 'elijahchurch.org';

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmDomainRenewal(domain.id, durationYears, finalTotal);
      }, 1400);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c0c0e] border border-[#222227] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-5 border-b border-[#1e1e24] bg-[#111114]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Renew Domain: {domain.domain}</span>
                </h3>
                <p className="text-[11px] font-mono text-zinc-400">
                  {domain.tld === '.com' ? '.com Global Domain (R232/yr)' : domain.tld === '.org' ? '.org Non-Profit Plan (R356/yr)' : `${domain.tld} Domain Registration`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Special Notice for Elijah Church .org */}
          {isElijahOrg && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Elijah Church .org Yearly Plan (R356 / year)</strong>
                <br />Due in 3 days on 1 October 2026. Includes Anycast DNSSEC and WHOIS ID protection.
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Domain Renewed!</h4>
            <p className="text-xs text-zinc-300">
              <strong className="text-white">{domain.domain}</strong> extended for {durationYears} year(s).
            </p>
            <div className="p-2.5 rounded-lg bg-[#111114] text-xs font-mono text-emerald-400 border border-emerald-500/30">
              ZACR / ICANN Registry Synchronized. Tax Invoice generated.
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Duration Selector */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Renewal Term:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setDurationYears(yr)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      durationYears === yr
                        ? 'bg-zinc-800 border-zinc-500 text-white'
                        : 'bg-[#111114] border-[#1e1e24] text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{yr} Year{yr > 1 ? 's' : ''}</div>
                    <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                      R{baseRate * yr}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Payment Gateway:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ozow')}
                  className={`p-2 rounded-lg border flex items-center gap-2 text-left transition-all ${
                    paymentMethod === 'ozow'
                      ? 'bg-zinc-800 border-zinc-500 text-white'
                      : 'bg-[#111114] border-[#1e1e24] text-zinc-400'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="block font-semibold">Ozow Instant EFT</span>
                    <span className="text-[10px] text-zinc-500">All SA Banks</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('capitec')}
                  className={`p-2 rounded-lg border flex items-center gap-2 text-left transition-all ${
                    paymentMethod === 'capitec'
                      ? 'bg-zinc-800 border-zinc-500 text-white'
                      : 'bg-[#111114] border-[#1e1e24] text-zinc-400'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="block font-semibold">Capitec Pay</span>
                    <span className="text-[10px] text-zinc-500">Instant Approval</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-lg border flex items-center gap-2 text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-zinc-800 border-zinc-500 text-white'
                      : 'bg-[#111114] border-[#1e1e24] text-zinc-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block font-semibold">Credit/Debit Card</span>
                    <span className="text-[10px] text-zinc-500">Visa / Mastercard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('snapscan')}
                  className={`p-2 rounded-lg border flex items-center gap-2 text-left transition-all ${
                    paymentMethod === 'snapscan'
                      ? 'bg-zinc-800 border-zinc-500 text-white'
                      : 'bg-[#111114] border-[#1e1e24] text-zinc-400'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="block font-semibold">SnapScan QR</span>
                    <span className="text-[10px] text-zinc-500">Scan & Pay</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-3 bg-[#111114] rounded-xl border border-[#1e1e24] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Domain:</span>
                <span className="text-white font-bold">{domain.domain}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Annual Registry Rate:</span>
                <span className="text-white">R{baseRate} / yr</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Period:</span>
                <span className="text-white">{durationYears} Year(s)</span>
              </div>
              <div className="pt-2 border-t border-[#1e1e24] flex justify-between items-center text-sm">
                <span className="text-white font-bold font-sans">Total Amount:</span>
                <span className="text-emerald-400 font-bold font-mono text-base">R{finalTotal.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="w-1/3 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 font-semibold text-xs hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-2/3 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Renewing Domain...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay R{finalTotal.toLocaleString()} & Renew Domain</span>
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
