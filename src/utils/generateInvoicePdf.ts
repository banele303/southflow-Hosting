import { Invoice, HostedWebsite } from '../types/hosting';

export function downloadProfessionalInvoicePDF(invoice: Invoice, site?: HostedWebsite) {
  try {
    const printWindow = window.open('', '_blank', 'width=850,height=1000');
    if (!printWindow) {
      alert('Please allow popups to download/print the invoice.');
      return;
    }

    const isPaid = invoice.status === 'Paid';
    const isOverdue = invoice.status === 'Overdue';
    const statusColor = isPaid ? '#10b981' : isOverdue ? '#ef4444' : '#f59e0b';
    const statusBg = isPaid ? '#ecfdf5' : isOverdue ? '#fef2f2' : '#fffbeb';

    // Calculate dynamic subtotal and 15% VAT
    const totalAmount = invoice.amountZAR;
    const subtotal = totalAmount / 1.15;
    const vat = totalAmount - subtotal;

    // Detect if this is a domain invoice or hosting invoice
    const isDomain = invoice.type === 'domain' || invoice.domainName === 'elijahchurch.org' || totalAmount === 356 || totalAmount === 232;
    const isElijahOrg = invoice.domainName === 'elijahchurch.org' || totalAmount === 356;
    const isComDomain = invoice.domainName.endsWith('.com') || totalAmount === 232;

    let lineItemTitle = '';
    let lineItemDesc = '';
    let lineItemPeriod = '1 Year';

    if (isElijahOrg) {
      lineItemTitle = `Annual .org Domain Registration & Anycast DNSSEC (elijahchurch.org)`;
      lineItemDesc = `Official Elijah Church .org Non-Profit & Institutional Top-Level Domain Registry Fee, WHOIS ID Protection, 100% Anycast DNSSEC Signed`;
      lineItemPeriod = '1 Year (Yearly Plan)';
    } else if (isComDomain) {
      lineItemTitle = `Annual .com Global Top-Level Domain Registration (${invoice.domainName})`;
      lineItemDesc = `ICANN Global .com Registry Annual Renewal, DNSSEC Signed, Anycast Cloudflare/Teraco DNS Routing & WHOIS Privacy Protection`;
      lineItemPeriod = '1 Year';
    } else if (isDomain) {
      lineItemTitle = `Annual Domain Name Registration & DNSSEC (${invoice.domainName})`;
      lineItemDesc = `Top-level domain annual renewal, WHOIS privacy protection, and Anycast authoritative DNS`;
      lineItemPeriod = '1 Year';
    } else {
      lineItemTitle = `Annual High-Performance Cloud Web Hosting (${invoice.domainName})`;
      lineItemDesc = `40GB NVMe Gen4 Storage (RAID 10), LiteSpeed Enterprise, Uncapped 10Gbps NAPAfrica Bandwidth, Unlimited IMAP/POP3 Mailboxes, Automated 30-Day Daily Offsite Backups`;
      lineItemPeriod = '12 Months';
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Tax Invoice - ${invoice.id} - SouthFlow Hosting</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #111827; 
            background: #ffffff; 
            padding: 40px; 
            font-size: 13px;
            line-height: 1.5;
          }
          .invoice-container {
            max-width: 780px;
            margin: 0 auto;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          }
          .header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #111827;
            padding-bottom: 24px;
            margin-bottom: 28px;
          }
          .brand-logo {
            font-size: 22px;
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #000000;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .brand-logo span.triangle {
            color: #000;
            font-size: 18px;
          }
          .company-details {
            font-size: 11px;
            color: #4b5563;
            margin-top: 6px;
            line-height: 1.4;
          }
          .invoice-badge-box {
            text-align: right;
          }
          .tax-title {
            font-size: 22px;
            font-weight: 900;
            color: #111827;
            letter-spacing: 1px;
          }
          .inv-number {
            font-family: monospace;
            font-size: 14px;
            font-weight: 700;
            color: #374151;
            margin: 4px 0;
          }
          .status-tag {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background-color: ${statusBg};
            color: ${statusColor};
            border: 1px solid ${statusColor}40;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 28px;
            background: #f9fafb;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #f3f4f6;
          }
          .meta-col h4 {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #6b7280;
            margin-bottom: 6px;
          }
          .meta-col p {
            font-size: 12px;
            color: #1f2937;
          }
          .meta-col p strong {
            color: #000000;
            font-size: 14px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .table th {
            background: #111827;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 10px 14px;
            text-align: left;
          }
          .table th:last-child { text-align: right; }
          .table td {
            padding: 14px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 12px;
            color: #374151;
          }
          .table td:last-child { text-align: right; font-weight: 600; }
          .totals-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
          }
          .totals-table {
            width: 320px;
          }
          .totals-table tr td {
            padding: 6px 0;
            font-size: 12px;
            color: #4b5563;
          }
          .totals-table tr.total-row td {
            border-top: 2px solid #111827;
            padding-top: 10px;
            font-size: 16px;
            font-weight: 900;
            color: #000000;
          }
          .banking-box {
            border-top: 1px dashed #d1d5db;
            padding-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            font-size: 11px;
            color: #4b5563;
          }
          .banking-box h5 {
            font-size: 11px;
            font-weight: 800;
            color: #111827;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .notice-footer {
            margin-top: 24px;
            text-align: center;
            font-size: 10px;
            color: #9ca3af;
            border-top: 1px solid #f3f4f6;
            padding-top: 14px;
          }
          @media print {
            body { padding: 0; background: #fff; }
            .invoice-container { border: none; box-shadow: none; padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="max-width: 780px; margin: 0 auto 16px auto; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: #6b7280;">Previewing SARS-Compliant Official Tax Invoice</span>
          <button onclick="window.print()" style="background: #000; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="invoice-container">
          <div class="header-row">
            <div>
              <div class="brand-logo"><span class="triangle">▲</span> SOUTHFLOW HOSTING ZA</div>
              <div class="company-details">
                <strong>SouthFlow Cloud (Pty) Ltd</strong><br>
                Teraco Data Environments JB1, Isando, Johannesburg, 1600<br>
                VAT Registration No: <strong>4920281944</strong> | Reg: 2018/491022/07<br>
                Support: billing@southflow.co.za • Tel: +27 (0)11 555 0199
              </div>
            </div>
            <div class="invoice-badge-box">
              <div class="tax-title">TAX INVOICE</div>
              <div class="inv-number">${invoice.id}</div>
              <div class="status-tag">${invoice.status}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-col">
              <h4>Billed To (Client / Domain):</h4>
              <p><strong>${site ? site.name : (invoice.domainName === 'elijahchurch.org' ? 'Elijah Church International' : invoice.domainName)}</strong></p>
              <p>Domain: <span style="font-family: monospace; font-weight: 600;">${invoice.domainName}</span></p>
              <p>Invoice Type: <strong style="text-transform: uppercase;">${isDomain ? 'Domain Registration & DNS' : 'Cloud Web Hosting'}</strong></p>
              <p>Registry / Datacenter: ${isDomain ? 'ICANN / ZACR Authoritative Anycast' : (site ? site.serverLocation : 'Teraco JB1, Johannesburg')}</p>
            </div>
            <div class="meta-col" style="text-align: right;">
              <h4>Billing Details:</h4>
              <p>Date Issued: <strong>${invoice.dateIssued}</strong></p>
              <p>Payment Due: <strong>${invoice.dueDate}</strong></p>
              <p>Payment Method: ${invoice.paymentMethod || 'Instant EFT / Ozow / Card'}</p>
              ${invoice.receiptNumber ? `<p>Receipt Reference: <span style="font-family: monospace; font-weight: bold; color: #059669;">${invoice.receiptNumber}</span></p>` : ''}
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: center;">Period</th>
                <th style="text-align: right;">Unit Price (ZAR)</th>
                <th>Total (ZAR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong style="color: #111827;">${lineItemTitle}</strong><br>
                  <span style="font-size: 11px; color: #6b7280;">
                    ${lineItemDesc}
                  </span>
                </td>
                <td style="text-align: center;">${lineItemPeriod}</td>
                <td style="text-align: right; font-family: monospace;">R${subtotal.toFixed(2)}</td>
                <td style="text-align: right; font-family: monospace;">R${subtotal.toFixed(2)}</td>
              </tr>
              ${isDomain ? `
              <tr>
                <td>
                  <strong style="color: #111827;">DNSSEC & WHOIS Identity Privacy Shield</strong><br>
                  <span style="font-size: 11px; color: #6b7280;">Cryptographic DNS security against cache poisoning and domain spoofing</span>
                </td>
                <td style="text-align: center;">1 Year</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">INCLUDED</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">R0.00</td>
              </tr>
              ` : `
              <tr>
                <td>
                  <strong style="color: #111827;">.co.za Domain Annual Registry & DNSSEC Renewal</strong><br>
                  <span style="font-size: 11px; color: #6b7280;">Included complimentary with annual R1,345 hosting plan</span>
                </td>
                <td style="text-align: center;">1 Year</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">FREE</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">R0.00</td>
              </tr>
              <tr>
                <td>
                  <strong style="color: #111827;">Let's Encrypt Wildcard TLS 1.3 Certificate</strong><br>
                  <span style="font-size: 11px; color: #6b7280;">Automated SSL certificate with zero-downtime auto-renewal</span>
                </td>
                <td style="text-align: center;">1 Year</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">FREE</td>
                <td style="text-align: right; font-family: monospace; color: #059669;">R0.00</td>
              </tr>
              `}
            </tbody>
          </table>

          <div class="totals-wrap">
            <table class="totals-table">
              <tr>
                <td>Subtotal (Excl. VAT):</td>
                <td style="text-align: right; font-family: monospace;">R${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>VAT (15% South African Standard Rate):</td>
                <td style="text-align: right; font-family: monospace;">R${vat.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Total Due (ZAR):</td>
                <td style="text-align: right; font-family: monospace; color: #000;">R${totalAmount.toLocaleString()}.00</td>
              </tr>
            </table>
          </div>

          <div class="banking-box">
            <div>
              <h5>EFT Banking Details (South Africa)</h5>
              <p>Bank: <strong>First National Bank (FNB)</strong></p>
              <p>Account Holder: <strong>SouthFlow Hosting ZA (Pty) Ltd</strong></p>
              <p>Account Number: <span style="font-family: monospace; font-weight: bold;">62890124810</span></p>
              <p>Branch Code: <span style="font-family: monospace;">250655</span> (Universal)</p>
              <p>Reference: <strong style="font-family: monospace;">${invoice.id}</strong></p>
            </div>
            <div>
              <h5>Instant Digital Settlements</h5>
              <p>Pay online instantaneously via Ozow Instant EFT, Capitec Pay, Visa or Mastercard to avoid service disruption.</p>
              <p style="margin-top: 6px; color: #059669; font-weight: 600;">
                ✓ 24/7 Automated Reconciliation & Immediate Service Unlocking
              </p>
            </div>
          </div>

          <div class="notice-footer">
            This is an official computer-generated Tax Invoice issued in compliance with the South African Value-Added Tax Act 89 of 1991.
            <br>© 2026 SouthFlow Hosting ZA (Pty) Ltd. All rights reserved.
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } catch (err) {
    console.error('Invoice print error:', err);
  }
}
