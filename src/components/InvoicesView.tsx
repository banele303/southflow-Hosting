import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, AlertCircle, Clock, 
  Download, Eye, CreditCard, Printer, X, ShieldCheck, 
  ArrowDownToLine, Landmark 
} from 'lucide-react';
import { Invoice, HostedWebsite } from '../types/hosting';
import { downloadProfessionalInvoicePDF } from '../utils/generateInvoicePdf';

interface InvoicesViewProps {
  invoices: Invoice[];
  websites: HostedWebsite[];
  onPayInvoice: (site: HostedWebsite) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  websites,
  onPayInvoice,
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getWebsite = (siteId: string) => {
    return websites.find(w => w.id === siteId);
  };

  const handleDownloadInvoice = (inv: Invoice) => {
    const site = getWebsite(inv.websiteId);
    downloadProfessionalInvoicePDF(inv, site);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Vercel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222227]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <span>Tax Invoices & Billing</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Official South African SARS VAT Tax Invoices for yearly cloud hosting (R1,345/year per website).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="bg-[#111114] border border-[#222227] rounded-lg px-3 py-1.5 text-zinc-400">
            <span className="text-zinc-500 mr-1.5 font-mono">SARS VAT:</span>
            <span className="font-mono text-zinc-200 font-semibold">4920281944</span>
          </div>
        </div>
      </div>

      {/* Invoices Table (Vercel Style) */}
      <div className="overflow-x-auto rounded-xl border border-[#222227] bg-[#0c0c0e]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111114] text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-[#222227]">
            <tr>
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Domain & Client</th>
              <th className="py-3 px-3">Date Issued</th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Total (ZAR)</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e24] text-zinc-300 font-sans">
            {invoices.map((inv) => {
              const isOverdue = inv.status === 'Overdue';
              const isUnpaid = inv.status === 'Unpaid';
              const isPaid = inv.status === 'Paid';
              const site = getWebsite(inv.websiteId);

              return (
                <tr 
                  key={inv.id} 
                  className={`transition-colors ${
                    isOverdue 
                      ? 'bg-rose-950/20 hover:bg-rose-950/30' 
                      : isUnpaid 
                      ? 'bg-amber-950/20 hover:bg-amber-950/30' 
                      : 'hover:bg-zinc-900/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{inv.domainName}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">1 Yr Cloud Hosting • Teraco JB1</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-400">{inv.dateIssued}</td>
                  <td className="py-3.5 px-3 font-mono font-medium">
                    <span className={isOverdue ? 'text-rose-400 font-bold' : isUnpaid ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                      {inv.dueDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-white">
                    R{inv.amountZAR.toLocaleString()}.00
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {isOverdue ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 w-fit animate-pulse">
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        Overdue (4d Grace)
                      </span>
                    ) : isUnpaid ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Due 1 Oct (3d)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Pay button for Glenanda Hotel or Elijah Church */}
                      {(isOverdue || isUnpaid) && site && (
                        <button
                          onClick={() => onPayInvoice(site)}
                          className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1 transition-all ${
                            isOverdue
                              ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                              : 'bg-amber-600 hover:bg-amber-500 text-white'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay R{inv.amountZAR}</span>
                        </button>
                      )}

                      {/* Download Official PDF Button */}
                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        title="Download Professional Tax Invoice (PDF)"
                        className="px-2.5 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium border border-zinc-700/60"
                      >
                        <ArrowDownToLine className="w-3.5 h-3.5 text-zinc-300" />
                        <span className="hidden sm:inline">Download PDF</span>
                      </button>

                      {/* View Invoice Modal */}
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        title="View Tax Invoice"
                        className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-zinc-700/60"
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

      {/* Tax Invoice Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <div className="text-xl font-black text-black tracking-tight flex items-center gap-2">
                  <span>▲</span>
                  <span>SOUTHFLOW HOSTING ZA (PTY) LTD</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Teraco Data Environments JB1, Isando, Johannesburg<br />
                  VAT Registration: <strong>4920281944</strong> • Reg: 2018/491022/07<br />
                  Email: billing@southflow.co.za
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl font-black uppercase text-black block tracking-wider">TAX INVOICE</span>
                <span className="font-mono text-sm text-indigo-600 font-bold block">{selectedInvoice.id}</span>
                <span className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                  selectedInvoice.status === 'Paid' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : selectedInvoice.status === 'Overdue'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Status: {selectedInvoice.status}
                </span>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Billed To (Client):</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {getWebsite(selectedInvoice.websiteId)?.name || selectedInvoice.domainName}
                </span>
                <span className="font-mono text-slate-600 block">{selectedInvoice.domainName}</span>
                <span className="text-slate-500">Johannesburg, South Africa</span>
              </div>
              <div className="text-right space-y-1">
                <div><span className="text-slate-500">Date Issued:</span> <span className="font-mono font-medium">{selectedInvoice.dateIssued}</span></div>
                <div><span className="text-slate-500">Payment Due:</span> <span className="font-mono font-bold">{selectedInvoice.dueDate}</span></div>
                {selectedInvoice.receiptNumber && (
                  <div><span className="text-slate-500">Receipt Ref:</span> <span className="font-mono text-emerald-600 font-semibold">{selectedInvoice.receiptNumber}</span></div>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs border-t border-b">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold text-left">
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">Period</th>
                  <th className="py-2.5 px-3 text-right">Amount (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block">Annual Cloud Web Hosting & .co.za Renewal</strong>
                    <span className="text-slate-500 text-[11px]">40GB NVMe SSD, LiteSpeed, Unlimited Mailboxes, SSL, Daily Backups</span>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-600">12 Months</td>
                  <td className="py-3 px-3 text-right font-mono font-semibold">R1,169.57</td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end text-xs">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal (Excl. VAT):</span>
                  <span className="font-mono">R1,169.57</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT (15% Standard Rate):</span>
                  <span className="font-mono">R175.43</span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t">
                  <span>Total Amount Due:</span>
                  <span className="text-base text-black font-mono">R1,345.00 ZAR</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t flex items-center justify-between">
              <button
                onClick={() => handleDownloadInvoice(selectedInvoice)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black hover:bg-zinc-800 text-white text-xs font-semibold shadow-sm"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Download / Print PDF</span>
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
