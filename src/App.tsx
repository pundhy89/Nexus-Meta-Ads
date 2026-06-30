/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CampaignsView } from './components/CampaignsView';
import { PixelView } from './components/PixelView';
import { BillingView } from './components/BillingView';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'campaigns':
        return <CampaignsView />;
      case 'pixel':
        return <PixelView />;
      case 'billing':
        return <BillingView />;
      default:
        return <DashboardView />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dasbor Kinerja';
      case 'campaigns': return 'Kampanye Iklan';
      case 'pixel': return 'Integrasi Meta Pixel';
      case 'billing': return 'Pembayaran & Saldo';
      default: return 'Nexus Ads Manager';
    }
  };

  return (
    <div className="min-h-screen bg-nexus-bg text-white flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 pl-8 flex flex-col h-screen overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-nexus-purple/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-nexus-cyan/10 blur-[120px] pointer-events-none"></div>
        
        <Header title={getTitle()} />
        
        <main className="flex-1 relative z-10 pb-20">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
