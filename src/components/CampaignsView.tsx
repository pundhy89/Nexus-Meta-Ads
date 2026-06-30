import React, { useState } from 'react';
import { mockCampaigns, formatCurrency, formatNumber } from '../data';
import { Plus, Search, Filter, MoreHorizontal, Play, Pause, ChevronRight, Facebook, Instagram, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const CampaignsView: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <div className="p-8 pb-24 max-w-7xl mx-auto h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Manajemen Kampanye</h2>
          <p className="text-gray-400 text-sm">Kelola iklan dan target landing page Anda</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-nexus-cyan hover:bg-nexus-cyan/90 text-nexus-bg font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Plus size={18} />
          Buat Kampanye Baru
        </button>
      </div>

      <div className="glass-panel p-1">
        <div className="p-4 border-b border-nexus-border flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Cari kampanye (ID, Nama)..." 
              className="w-full bg-nexus-bg border border-nexus-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50 focus:ring-1 focus:ring-nexus-cyan/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-nexus-border rounded-lg text-sm text-gray-300 hover:bg-nexus-surface transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-nexus-surface/50 text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-3 rounded-tl-lg">Status</th>
                <th className="px-6 py-3">Kampanye</th>
                <th className="px-6 py-3">Anggaran</th>
                <th className="px-6 py-3">Terpakai</th>
                <th className="px-6 py-3">Tayangan</th>
                <th className="px-6 py-3">Konversi</th>
                <th className="px-6 py-3">CPA</th>
                <th className="px-6 py-3 rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-border">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-nexus-surface/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full w-max border ${
                      campaign.status === 'active' 
                        ? 'bg-nexus-green/10 text-nexus-green border-nexus-green/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {campaign.status === 'active' ? <span className="w-1.5 h-1.5 bg-nexus-green rounded-full animate-pulse"></span> : null}
                      {campaign.status === 'active' ? 'Aktif' : 'Jeda'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-200">{campaign.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{campaign.id}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-300">Rp {formatNumber(campaign.budget)}</td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-gray-300">Rp {formatNumber(campaign.spend)}</div>
                    <div className="w-full bg-nexus-border rounded-full h-1 mt-2">
                      <div className="bg-nexus-cyan h-1 rounded-full" style={{ width: `${(campaign.spend / campaign.budget) * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-300">{formatNumber(campaign.impressions)}</td>
                  <td className="px-6 py-4 font-mono text-nexus-cyan">{formatNumber(campaign.conversions)}</td>
                  <td className="px-6 py-4 font-mono text-gray-300">Rp {formatNumber(Math.floor(campaign.spend / campaign.conversions))}</td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button className="text-gray-500 hover:text-white p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(campaign.id)}
                      className="text-nexus-red/60 hover:text-nexus-red hover:bg-nexus-red/10 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation Modal (Overlay) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel w-full max-w-2xl bg-nexus-bg flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-nexus-border flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Buat Kampanye Baru</h3>
                <p className="text-sm text-gray-400 mt-1">Setup iklan untuk diarahkan ke Landing Page Anda</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-nexus-cyan flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-nexus-cyan/10 flex items-center justify-center text-xs">1</span>
                  Tujuan & Nama
                </h4>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Nama Kampanye</label>
                  <input type="text" className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50" placeholder="Misal: Promo Akhir Tahun 2026" />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">URL Landing Page (Target)</label>
                  <input type="url" className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50" placeholder="https://landingpage-anda.com/promo" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-nexus-border">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-nexus-cyan flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-nexus-cyan/10 flex items-center justify-center text-xs">2</span>
                    Target Audiens & Anggaran
                  </h4>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-600/30">
                      <Facebook size={12} />
                    </div>
                    <div className="w-6 h-6 rounded bg-pink-600/20 text-pink-500 flex items-center justify-center border border-pink-600/30">
                      <Instagram size={12} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Anggaran Harian (IDR)</label>
                    <input type="number" className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50" placeholder="100000" defaultValue="100000" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Target Wilayah (Global/Lokal)</label>
                    <select className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50">
                      <option>Seluruh Dunia (Global)</option>
                      <option>Amerika Utara (US & CA)</option>
                      <option>Eropa (EU)</option>
                      <option>Asia Pasifik</option>
                      <option>Seluruh Indonesia</option>
                      <option>Asia Tenggara (SEA)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-nexus-border">
                <h4 className="text-sm font-semibold text-nexus-purple flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-nexus-purple/10 flex items-center justify-center text-xs">3</span>
                  Otomatisasi Pixel
                </h4>
                <div className="bg-nexus-surface/50 border border-nexus-border rounded-lg p-4 text-sm">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded bg-nexus-bg border-nexus-border text-nexus-purple focus:ring-nexus-purple/50" defaultChecked />
                    <div>
                      <p className="font-medium text-gray-200">Integrasi Meta Pixel Otomatis</p>
                      <p className="text-gray-400 text-xs mt-1">Sistem akan men-generate payload pelacakan konversi untuk landing page Anda secara instan.</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-nexus-border bg-nexus-surface/30 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-nexus-surface transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="bg-nexus-cyan hover:bg-nexus-cyan/90 text-nexus-bg font-semibold py-2 px-6 rounded-lg text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
              >
                Terbitkan Kampanye
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
