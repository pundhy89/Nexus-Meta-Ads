export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export interface ChartDataPoint {
  date: string;
  visitors: number;
  readers: number;
  conversions: number;
  cost: number;
}

export interface OverviewStats {
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  costPerConversion: number;
  ctr: number; // Click-through rate
}
