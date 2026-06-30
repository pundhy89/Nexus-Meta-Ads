import React, { useState } from 'react';
import { Bell, User, Facebook, Instagram, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }, 1500);
  };

  return (
    <>
      <header className="h-16 border-b border-nexus-border bg-nexus-bg/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-nexus-cyan rounded-full shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
            </button>
            
            <div 
              onClick={() => !isLoggedIn && setShowLoginModal(true)}
              className={`w-8 h-8 rounded-full p-0.5 flex items-center justify-center cursor-pointer transition-all ${
                isLoggedIn 
                  ? 'bg-gradient-to-tr from-blue-500 to-pink-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                  : 'bg-gradient-to-tr from-nexus-purple to-nexus-cyan'
              }`}
            >
              <div className="w-full h-full bg-nexus-surface rounded-full flex items-center justify-center overflow-hidden">
                {isLoggedIn ? (
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-gray-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel w-full max-w-sm bg-nexus-bg flex flex-col relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="p-6 border-b border-nexus-border flex justify-between items-center relative z-10">
                <h3 className="text-lg font-bold">Integrasi Meta Akun</h3>
                <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 relative z-10 space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-600/30">
                      <Facebook size={24} />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-pink-600/20 text-pink-500 flex items-center justify-center border border-pink-600/30">
                      <Instagram size={24} />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Hubungkan Meta Ads</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Sinkronisasikan akun Facebook & Instagram Anda untuk memantau performa iklan secara real-time.
                  </p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Facebook size={18} />
                        Lanjutkan dengan Facebook
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Instagram size={18} />
                        Lanjutkan dengan Instagram
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center gap-2 justify-center text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-nexus-green" />
                  Koneksi terenkripsi & aman.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
