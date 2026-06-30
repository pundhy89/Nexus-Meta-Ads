import { Campaign, ChartDataPoint, OverviewStats } from './types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'CMP-9921',
    name: 'Retargeting Promo Q3',
    status: 'active',
    budget: 5000000,
    spend: 1250000,
    impressions: 45200,
    clicks: 3100,
    conversions: 185,
    createdAt: '2023-08-15',
  },
  {
    id: 'CMP-9922',
    name: 'Cold Audience Awareness',
    status: 'active',
    budget: 10000000,
    spend: 4200000,
    impressions: 120500,
    clicks: 4200,
    conversions: 82,
    createdAt: '2023-08-10',
  },
  {
    id: 'CMP-9923',
    name: 'Flash Sale Weekend',
    status: 'paused',
    budget: 2000000,
    spend: 2000000,
    impressions: 25000,
    clicks: 1800,
    conversions: 150,
    createdAt: '2023-08-01',
  },
];

export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = 14; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    // Generate some realistic-looking wavy data
    const baseVisitors = 1000 + Math.random() * 500 + (Math.sin(i) * 200);
    const readers = baseVisitors * (0.4 + Math.random() * 0.2); // 40-60% read
    const conversions = readers * (0.05 + Math.random() * 0.05); // 5-10% of readers convert
    
    data.push({
      date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      visitors: Math.floor(baseVisitors),
      readers: Math.floor(readers),
      conversions: Math.floor(conversions),
      cost: Math.floor(conversions * (50000 + Math.random() * 20000)), // Random cost per conversion between 50k-70k
    });
  }
  return data;
};

export const chartData = generateChartData();

export const overviewStats: OverviewStats = {
  totalSpend: 7450000,
  totalImpressions: 190700,
  totalClicks: 9100,
  totalConversions: 417,
  costPerConversion: 17865, // totalSpend / totalConversions
  ctr: 4.77, // (totalClicks / totalImpressions) * 100
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value);
};
