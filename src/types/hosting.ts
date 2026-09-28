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
  registeredDomainId?: string;
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

export interface RegisteredDomain {
  id: string;
  domain: string;
  tld: string;
  category: string;
  annualPriceZAR: number;
  status: 'active' | 'pending_renewal' | 'grace_period' | 'expired';
  renewalDate: string;
  daysRemaining: number;
  autoRenew: boolean;
  dnssec: boolean;
  whoisPrivacy: boolean;
  linkedWebsite?: string;
  nameservers: string[];
}

export interface DomainPricingTier {
  tld: string;
  yearlyPriceZAR: number;
  renewalPriceZAR: number;
  description: string;
  popular?: boolean;
  highlightNote?: string;
}

export interface HostingPlanFeature {
  name: string;
  included: boolean;
  description: string;
}

export interface Invoice {
  id: string;
  websiteId?: string;
  domainName: string;
  type?: 'hosting' | 'domain' | 'bundle';
  amountZAR: number;
  dateIssued: string;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentMethod?: string;
  receiptNumber?: string;
  description?: string;
}
