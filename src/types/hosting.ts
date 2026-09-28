export type HostingStatus = 'active' | 'grace_period' | 'pending_renewal' | 'suspended';

export interface HostedWebsite {
  id: string;
  name: string;
  domain: string;
  category: 'Hospitality & Hotels' | 'Faith & Non-Profit' | 'Tourism & Travel' | 'Energy & Tech' | 'Food & Beverage' | 'Healthcare' | 'Professional Services' | 'Logistics' | 'Finance';
  plan: string;
  annualPriceZAR: number;
  status: HostingStatus;
  renewalDate: string; // e.g., '2026-09-27'
  deactivationDeadline?: string; // e.g., '2026-10-01'
  daysRemaining: number;
  ipAddress: string;
  serverLocation: string;
  phpVersion: string;
  diskUsedGB: number;
  diskTotalGB: number;
  bandwidthUsedGB: number;
  sslActive: boolean;
  sslExpiry: string;
  autoRenew: boolean;
  emailAccounts: number;
  dbCount: number;
  cms: string;
  uptime90Days: number;
  previewDetails: {
    heroTitle: string;
    heroSubtitle: string;
    themeColor: string;
    features: string[];
    contactPhone: string;
    location: string;
    establishedYear: number;
  };
}

export interface HostingPlanFeature {
  name: string;
  included: boolean;
  description: string;
}

export interface Invoice {
  id: string;
  websiteId: string;
  domainName: string;
  amountZAR: number;
  dateIssued: string;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentMethod?: string;
  receiptNumber?: string;
}
