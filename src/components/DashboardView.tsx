import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { chartData, overviewStats, formatCurrency, formatNumber } from '../data';
import { ArrowUpRight, ArrowDownRight, Users, Eye, ShoppingCart, DollarSign, Activity, CreditCard, Globe, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, prefix = '', suffix = '' }: any) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-nexus-cyan/5 rounded-full blur-2xl group-hover:bg-nexus-cyan/10 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-nexus-surface rounded-lg border border-nexus-border">
          <Icon size={16} className="text-nexus-cyan" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl font-bold mb-1">
          {prefix}{value}{suffix}
        </div>
        
        <div className="flex items-center gap-1 text-xs font-mono">
          <span className={`flex items-center ${isPositive ? 'text-nexus-green' : 'text-nexus-red'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trendValue}%
          </span>
          <span className="text-gray-500 ml-1">vs bulan lalu</span>
        </div>
      </div>
    </motion.div>
  );
};

export const DashboardView: React.FC = () => {
  return (
    <div className="p-8 pb-24 max-w-7xl mx-auto space-y-6 overflow-y-auto custom-scrollbar h-[calc(100vh-64px)]">
      
      {/* Integration Banner */}
      <div className="bg-nexus-surface/50 border border-nexus-border rounded-xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-600/30">
              <Facebook size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-600/20 text-pink-500 flex items-center justify-center border border-pink-600/30">
              <Instagram size={20} />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-sm">Terhubung dengan Meta Ads</h2>
            <p className="text-xs text-gray-400">Semua data secara real-time tersinkronisasi dengan Facebook & Instagram.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-nexus-green bg-nexus-green/10 px-3 py-1.5 rounded-full border border-nexus-green/20">
          <span className="w-2 h-2 rounded-full bg-nexus-green animate-pulse"></span>
          LIVE SYNC
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Tagihan (FB & IG)" 
          value={formatNumber(overviewStats.totalSpend * 1.11)}
          prefix="Rp "
          icon={CreditCard}
          trend="up"
          trendValue="14.2"
        />
        <StatCard 
          title="Biaya Iklan (Meta Ads)" 
          value={formatNumber(overviewStats.totalSpend)}
          prefix="Rp "
          icon={DollarSign}
          trend="up"
          trendValue="12.5"
        />
        <StatCard 
          title="Jangkauan Global" 
          value={formatNumber(overviewStats.totalImpressions * 45)}
          icon={Globe}
          trend="up"
          trendValue="118.2"
        />
        <StatCard 
          title="Konversi Penjualan" 
          value={formatNumber(overviewStats.totalConversions)}
          icon={ShoppingCart}
          trend="up"
          trendValue="24.1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Trafik & Konversi</h2>
              <p className="text-sm text-gray-400">Performa pengunjung harian vs konversi</p>
            </div>
            <select className="bg-nexus-surface border border-nexus-border text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-nexus-cyan/50 text-gray-300">
              <option>14 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-nexus-purple)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-nexus-purple)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-nexus-cyan)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--color-nexus-cyan)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}/>
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  name="Pengunjung (Klik)" 
                  stroke="var(--color-nexus-purple)" 
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  name="Konversi (Sales)" 
                  stroke="var(--color-nexus-cyan)" 
                  fillOpacity={1} 
                  fill="url(#colorConversions)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 flex flex-col"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Biaya per Akuisisi</h2>
            <p className="text-sm text-gray-400">Rata-rata CPA harian</p>
          </div>
          
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-7)} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val/1000}k`}
                />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  formatter={(value: number) => [`Rp ${formatNumber(value)}`, 'Biaya']}
                />
                <Bar 
                  dataKey="cost" 
                  fill="var(--color-nexus-cyan)" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

    </div>
  );
};
