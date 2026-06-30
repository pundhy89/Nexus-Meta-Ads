import React from 'react';
import { CreditCard, Wallet, ArrowRight, ShieldCheck, Zap, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { formatNumber } from '../data';

export const BillingView: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Pembayaran & API Gateway</h2>
        <p className="text-gray-400">Isi saldo akun iklan Anda dengan integrasi payment gateway yang cepat dan aman.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 md:col-span-1 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 text-nexus-cyan group-hover:opacity-20 transition-opacity">
            <Wallet size={100} className="-mr-6 -mt-6 transform rotate-12" />
          </div>
          
          <h3 className="text-sm font-medium text-gray-400 mb-1 relative z-10 flex justify-between">
            Saldo Iklan Saat Ini
            <div className="flex gap-1.5 opacity-60">
              <Facebook size={14} className="text-blue-400" />
              <Instagram size={14} className="text-pink-400" />
            </div>
          </h3>
          <div className="text-3xl font-bold font-mono mb-4 text-white relative z-10">
            Rp {formatNumber(12500000)}
          </div>
          
          <div className="relative z-10">
            <button className="w-full bg-nexus-cyan hover:bg-nexus-cyan/90 text-nexus-bg font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CreditCard size={18} />
              Isi Saldo Meta Ads
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 md:col-span-2 flex flex-col justify-center"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-nexus-purple/10 flex items-center justify-center shrink-0 border border-nexus-purple/20">
              <ShieldCheck size={24} className="text-nexus-purple" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Integrasi API Pembayaran Aman</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Sistem Nexus terhubung langsung dengan Payment Gateway Nasional (Virtual Account, e-Wallet, Kartu Kredit). Transaksi diproses secara real-time dan saldo iklan langsung terisi tanpa penundaan.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-nexus-surface border border-nexus-border text-gray-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan"></span> BCA Virtual Account
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-nexus-surface border border-nexus-border text-gray-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan"></span> Mandiri Bill
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-nexus-surface border border-nexus-border text-gray-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nexus-cyan"></span> GoPay / OVO
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <h3 className="text-lg font-semibold mb-4 mt-8">Riwayat Transaksi Terbaru</h3>
      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-nexus-surface/50 text-gray-400 font-medium border-b border-nexus-border">
            <tr>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">ID Transaksi</th>
              <th className="px-6 py-3">Metode</th>
              <th className="px-6 py-3 text-right">Jumlah</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nexus-border">
            {[
              { date: '28 Jun 2026, 14:30', id: 'TRX-88912', method: 'BCA Virtual Account', amount: 5000000, status: 'success' },
              { date: '15 Jun 2026, 09:15', id: 'TRX-88744', method: 'GoPay', amount: 1000000, status: 'success' },
              { date: '02 Jun 2026, 16:45', id: 'TRX-88501', method: 'Mandiri Bill', amount: 10000000, status: 'success' },
            ].map((trx, i) => (
              <tr key={i} className="hover:bg-nexus-surface/30 transition-colors">
                <td className="px-6 py-4 text-gray-400">{trx.date}</td>
                <td className="px-6 py-4 font-mono text-xs">{trx.id}</td>
                <td className="px-6 py-4">{trx.method}</td>
                <td className="px-6 py-4 font-mono text-right text-gray-200">Rp {formatNumber(trx.amount)}</td>
                <td className="px-6 py-4 flex justify-center">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-nexus-green bg-nexus-green/10 px-2 py-1 rounded-full border border-nexus-green/20">
                    <Zap size={12} />
                    Berhasil
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
