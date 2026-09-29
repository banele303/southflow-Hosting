import { jsPDF } from 'jspdf';
import { Invoice, HostedWebsite } from '../types/hosting';

export function downloadProfessionalInvoicePDF(invoice: Invoice, site?: HostedWebsite) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
    const margin = 40;
    const contentWidth = pageWidth - margin * 2; // 515.28 pt
    const rightAlignX = margin + contentWidth;

    const isPaid = invoice.status === 'Paid';
    const isOverdue = invoice.status === 'Overdue';
    const statusText = invoice.status.toUpperCase();
    const statusColor = isPaid ? [16, 185, 129] : isOverdue ? [225, 29, 72] : [217, 119, 6];

    // Detect if this is a domain-only invoice or hosting/bundle invoice
    const isDomainOnly = invoice.type === 'domain' || invoice.id.startsWith('INV-DOM-');
    const isElijahOrg = invoice.domainName === 'elijahchurch.org' || invoice.websiteId === 'site-elijah' || (site && site.id === 'site-elijah');
    const isComDomain = invoice.domainName.endsWith('.com') || (site && site.domain.endsWith('.com'));
    const isCapeTownDomain = invoice.domainName.endsWith('.capetown') || (site && site.domain.endsWith('.capetown'));

    interface InvoiceLineItem {
      title: string;
      desc: string;
      period: string;
      unitPrice: number;
      total: number;
    }

    const lineItems: InvoiceLineItem[] = [];

    if (isDomainOnly) {
      if (isElijahOrg || invoice.amountZAR === 356) {
        lineItems.push({
          title: 'Annual .org Top-Level Domain Registry (elijahchurch.org)',
          desc: 'Official Elijah Church International .org Non-Profit & Institutional Registry Fee (Yearly Plan), 100% Anycast DNSSEC Signed & WHOIS Privacy Protection',
          period: '1 Year (Yearly Plan)',
          unitPrice: 356,
          total: 356,
        });
      } else if (isComDomain || invoice.amountZAR === 232) {
        lineItems.push({
          title: `Annual .com Global Top-Level Domain Registration (${invoice.domainName})`,
          desc: 'ICANN Accredited Global .com Registry Renewal, DNSSEC Signed, Anycast Cloudflare/Teraco DNS Routing & WHOIS Privacy Protection',
          period: '1 Year',
          unitPrice: 232,
          total: 232,
        });
      } else if (invoice.domainName === 'glenanda-hotel.co.za' || invoice.amountZAR === 183) {
        lineItems.push({
          title: `Annual .co.za Domain Registration & DNSSEC (glenanda-hotel.co.za)`,
          desc: 'South African ZACR National Registry Renewal & Authoritative Anycast DNSSEC Protection',
          period: '1 Year',
          unitPrice: 183,
          total: 183,
        });
      } else if (invoice.domainName.endsWith('.co.za') || invoice.amountZAR === 99) {
        lineItems.push({
          title: `Annual .co.za Domain Name Registration (${invoice.domainName})`,
          desc: 'South African ZACR National Registry Renewal & Authoritative Anycast DNSSEC Protection',
          period: '1 Year',
          unitPrice: 99,
          total: 99,
        });
      } else {
        lineItems.push({
          title: `Annual Top-Level Domain Registration & DNSSEC (${invoice.domainName})`,
          desc: 'Top-level domain annual renewal, WHOIS privacy protection, and Anycast authoritative DNS',
          period: '1 Year',
          unitPrice: invoice.amountZAR,
          total: invoice.amountZAR,
        });
      }
    } else {
      // Hosting line item
      lineItems.push({
        title: `Annual Cloud Web Hosting Pro (${site ? site.name : invoice.domainName})`,
        desc: '40GB NVMe Gen4 Storage (RAID 10), LiteSpeed Enterprise, Uncapped 10Gbps NAPAfrica Bandwidth, Unlimited IMAP/POP3 Mailboxes, TLS 1.3 SSL, Daily Offsite Backups',
        period: '12 Months',
        unitPrice: 1345,
        total: 1345,
      });

      // Domain itemized with exact price - NEVER R0.00
      if (isElijahOrg) {
        lineItems.push({
          title: 'Annual .org Domain Registration & Anycast DNSSEC (elijahchurch.org)',
          desc: 'Official Elijah Church International .org Non-Profit Top-Level Domain Registry Fee on Yearly Plan, DNSSEC Cryptographic Protection & WHOIS Identity Shield',
          period: '1 Year (Yearly Plan)',
          unitPrice: 356,
          total: 356,
        });
      } else if (isComDomain) {
        const dom = site ? site.domain : invoice.domainName;
        lineItems.push({
          title: `Annual .com Global Domain Registration (${dom})`,
          desc: 'ICANN Accredited Global Registry Annual Renewal, DNSSEC Signed & WHOIS Privacy Protection',
          period: '1 Year',
          unitPrice: 232,
          total: 232,
        });
      } else if (isCapeTownDomain) {
        const dom = site ? site.domain : invoice.domainName;
        lineItems.push({
          title: `Annual .capetown Geo-TLD Domain Registration (${dom})`,
          desc: 'Cape Town Geo-TLD Registry Fee, Anycast DNSSEC & WHOIS Privacy Protection',
          period: '1 Year',
          unitPrice: 245,
          total: 245,
        });
      } else {
        const dom = site ? site.domain : invoice.domainName;
        const isGlenanda = dom === 'glenanda-hotel.co.za' || invoice.websiteId === 'site-glenanda' || (site && site.id === 'site-glenanda');
        const cozaPrice = isGlenanda ? 183 : 99;
        lineItems.push({
          title: `Annual .co.za Domain Registration & DNSSEC (${dom})`,
          desc: 'South African ZACR National Registry Renewal & Authoritative Anycast DNSSEC Protection',
          period: '1 Year',
          unitPrice: cozaPrice,
          total: cozaPrice,
        });
      }
    }

    const totalAmount = lineItems.reduce((acc, item) => acc + item.total, 0);
    const subtotal = totalAmount / 1.15;
    const vat = totalAmount - subtotal;

    // --- DRAW VECTOR PDF LAYOUT ---

    // Top Brand Accent Line
    doc.setFillColor(17, 24, 39);
    doc.rect(0, 0, pageWidth, 6, 'F');

    // Company Header (Left)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text('▲ SOUTHFLOW HOSTING ZA (PTY) LTD', margin, 46);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text('Teraco Data Environments JB1, 5 Great North Rd, Isando, Johannesburg', margin, 60);
    doc.text('VAT Reg No: 4920281944  •  Company Reg: 2018/491022/07', margin, 72);
    doc.text('Email: billing@southflow.co.za  •  Web: https://southflow.co.za', margin, 84);

    // Tax Invoice Title & ID (Right)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(17, 24, 39);
    doc.text('TAX INVOICE', rightAlignX, 46, { align: 'right' });

    doc.setFontSize(10.5);
    doc.setTextColor(79, 70, 229);
    doc.text(invoice.id, rightAlignX, 61, { align: 'right' });

    // Status Pill Badge (Right)
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const badgeText = `STATUS: ${statusText}`;
    const badgeWidth = doc.getTextWidth(badgeText) + 14;
    const badgeHeight = 16;
    const badgeX = rightAlignX - badgeWidth;
    const badgeY = 69;

    doc.setFillColor(
      isPaid ? 236 : isOverdue ? 254 : 254,
      isPaid ? 253 : isOverdue ? 242 : 243,
      isPaid ? 245 : isOverdue ? 242 : 199
    );
    doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3, 3, 'F');
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(badgeText, badgeX + 7, badgeY + 11.5);

    // Horizontal Divider
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(1);
    doc.line(margin, 98, rightAlignX, 98);

    // Meta Box (Billed To & Billing Info)
    const metaBoxY = 108;
    const metaBoxHeight = 84;
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, metaBoxY, contentWidth, metaBoxHeight, 4, 4, 'F');
    doc.setDrawColor(243, 244, 246);
    doc.roundedRect(margin, metaBoxY, contentWidth, metaBoxHeight, 4, 4, 'S');

    // Left Column: Client / Domain Info
    const clientName = site ? site.name : (invoice.domainName === 'elijahchurch.org' ? 'Elijah Church International' : invoice.domainName);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('BILLED TO (CLIENT / DOMAIN):', margin + 14, metaBoxY + 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(17, 24, 39);
    doc.text(clientName, margin + 14, metaBoxY + 33);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text(`Domain: ${invoice.domainName}`, margin + 14, metaBoxY + 46);
    doc.text(`Invoice Type: ${isDomainOnly ? 'Domain Name Registration & DNSSEC' : 'Cloud Web Hosting Pro + Domain Registry'}`, margin + 14, metaBoxY + 59);
    doc.text(`Registry / DC: ${isDomainOnly ? 'ICANN / ZACR Authoritative Anycast' : (site ? site.serverLocation : 'Teraco JB1, Johannesburg')}`, margin + 14, metaBoxY + 72);

    // Right Column: Billing Dates & Receipts
    const col2X = margin + contentWidth / 2 + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('BILLING DETAILS:', col2X, metaBoxY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text('Date Issued:', col2X, metaBoxY + 33);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.dateIssued, col2X + 68, metaBoxY + 33);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Payment Due:', col2X, metaBoxY + 46);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isOverdue ? 225 : 17, isOverdue ? 29 : 24, isOverdue ? 72 : 39);
    doc.text(invoice.dueDate, col2X + 68, metaBoxY + 46);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('Payment Method:', col2X, metaBoxY + 59);
    doc.text(invoice.paymentMethod || 'Instant EFT / Ozow / Card', col2X + 80, metaBoxY + 59);

    if (invoice.receiptNumber) {
      doc.text('Receipt Ref:', col2X, metaBoxY + 72);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(invoice.receiptNumber, col2X + 68, metaBoxY + 72);
    }

    // Line Items Table Header
    const tableHeaderY = metaBoxY + metaBoxHeight + 16;
    const tableHeaderHeight = 22;
    doc.setFillColor(17, 24, 39);
    doc.rect(margin, tableHeaderY, contentWidth, tableHeaderHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('DESCRIPTION', margin + 12, tableHeaderY + 14.5);
    doc.text('PERIOD', margin + 285, tableHeaderY + 14.5, { align: 'center' });
    doc.text('UNIT PRICE (ZAR)', margin + 395, tableHeaderY + 14.5, { align: 'right' });
    doc.text('TOTAL (ZAR)', rightAlignX - 12, tableHeaderY + 14.5, { align: 'right' });

    // Line Items Rows
    let currentY = tableHeaderY + tableHeaderHeight;

    lineItems.forEach((item, index) => {
      const rowStartY = currentY;
      const descLines = doc.splitTextToSize(item.desc, 250);
      const rowHeight = Math.max(38, 22 + descLines.length * 11);

      // Alternating row background
      if (index % 2 === 1) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, rowStartY, contentWidth, rowHeight, 'F');
      }

      // Title & Description
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 24, 39);
      doc.text(item.title, margin + 12, rowStartY + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(107, 114, 128);
      doc.text(descLines, margin + 12, rowStartY + 26);

      // Period
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(55, 65, 81);
      doc.text(item.period, margin + 285, rowStartY + 18, { align: 'center' });

      // Unit Price
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text(`R${item.unitPrice.toLocaleString()}.00`, margin + 395, rowStartY + 18, { align: 'right' });

      // Total
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 24, 39);
      doc.text(`R${item.total.toLocaleString()}.00`, rightAlignX - 12, rowStartY + 18, { align: 'right' });

      // Row separator line
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(margin, rowStartY + rowHeight, rightAlignX, rowStartY + rowHeight);

      currentY += rowHeight;
    });

    // Totals Box (Right Side)
    const totalsY = currentY + 14;
    const totalsWidth = 220;
    const totalsX = rightAlignX - totalsWidth;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(totalsX, totalsY, totalsWidth, 68, 4, 4, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(totalsX, totalsY, totalsWidth, 68, 4, 4, 'S');

    // Subtotal
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text('Subtotal (Excl. VAT):', totalsX + 12, totalsY + 18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`R${subtotal.toFixed(2)}`, rightAlignX - 12, totalsY + 18, { align: 'right' });

    // VAT 15%
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text('VAT (15% Standard Rate):', totalsX + 12, totalsY + 34);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`R${vat.toFixed(2)}`, rightAlignX - 12, totalsY + 34, { align: 'right' });

    // Divider in Totals Box
    doc.setDrawColor(209, 213, 219);
    doc.line(totalsX + 10, totalsY + 42, rightAlignX - 10, totalsY + 42);

    // Total Due
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Total Due (ZAR):', totalsX + 12, totalsY + 58);
    doc.setFontSize(11);
    doc.setTextColor(79, 70, 229);
    doc.text(`R${totalAmount.toLocaleString()}.00`, rightAlignX - 12, totalsY + 58, { align: 'right' });

    // Banking Details Box (Left Side)
    const bankBoxY = totalsY;
    const bankBoxWidth = contentWidth - totalsWidth - 14;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, bankBoxY, bankBoxWidth, 68, 4, 4, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(margin, bankBoxY, bankBoxWidth, 68, 4, 4, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('EFT BANKING DETAILS (SOUTH AFRICA):', margin + 12, bankBoxY + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(55, 65, 81);
    doc.text('Bank: First National Bank (FNB)  •  Branch: 250655', margin + 12, bankBoxY + 28);
    doc.text('Account Holder: SouthFlow Hosting ZA (Pty) Ltd', margin + 12, bankBoxY + 40);
    doc.text('Account Number: 62890124810  (Cheque / Current)', margin + 12, bankBoxY + 52);
    doc.setFont('helvetica', 'bold');
    doc.text(`Payment Reference: ${invoice.id}`, margin + 12, bankBoxY + 63);

    // Compliance Notice & Footer
    const footerY = totalsY + 84;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text(
      'This is an official computer-generated Tax Invoice issued in compliance with the South African Value-Added Tax Act 89 of 1991.',
      pageWidth / 2,
      footerY,
      { align: 'center' }
    );
    doc.text(
      '© 2026 SouthFlow Hosting ZA (Pty) Ltd. All rights reserved. • Teraco JB1 Isando Cluster',
      pageWidth / 2,
      footerY + 12,
      { align: 'center' }
    );

    // DIRECT FILE DOWNLOAD VIA JSPDF (No Print Dialog!)
    doc.save(`SouthFlow-Tax-Invoice-${invoice.id}.pdf`);
  } catch (err) {
    console.error('Invoice PDF direct download error:', err);
  }
}
