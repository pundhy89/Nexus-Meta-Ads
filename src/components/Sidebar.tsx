import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Megaphone, Code, CreditCard, Settings, LogOut, GripVertical, Search } from 'lucide-react';
import { motion, PanInfo } from 'motion/react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Kampanye', icon: Megaphone },
  { id: 'pixel', label: 'Integrasi Pixel', icon: Code },
  { id: 'billing', label: 'Pembayaran', icon: CreditCard },
];

const SIDEBAR_WIDTH = 256;
const VISIBLE_SLIVER = 24;
const CLOSED_X = -(SIDEBAR_WIDTH - VISIBLE_SLIVER);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  const stopCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (isOpen) {
      startCloseTimer();
    } else {
      stopCloseTimer();
    }
    return stopCloseTimer;
  }, [isOpen]);

  const handleMouseMove = () => {
    if (isOpen) {
      startCloseTimer();
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const isDraggingRight = info.offset.x > 20 || info.velocity.x > 200;
    const isDraggingLeft = info.offset.x < -20 || info.velocity.x < -200;
    
    if (isDraggingRight) {
      setIsOpen(true);
    } else if (isDraggingLeft) {
      setIsOpen(false);
    } else {
      if (isOpen && info.offset.x < -10) setIsOpen(false);
      else if (!isOpen && info.offset.x > 10) setIsOpen(true);
    }
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ x: isOpen ? 0 : CLOSED_X }}
      transition={{ type: "spring", stiffness: 600, damping: 25 }}
      drag="x"
      dragConstraints={{ left: CLOSED_X, right: 0 }}
      dragElastic={0.05}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      onClick={() => { if (!isOpen) setIsOpen(true) }}
      className={`w-64 h-screen border-r border-nexus-border backdrop-blur-xl flex flex-col fixed left-0 top-0 z-50 shadow-[5px_0_25px_rgba(0,0,0,0.5)] ${
        isOpen ? 'bg-nexus-surface/90 cursor-default' : 'bg-nexus-surface/50 cursor-grab'
      }`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-12 bg-nexus-surface border border-nexus-border rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <GripVertical size={14} className="text-gray-400" />
      </div>

      <div className="h-16 flex items-center px-6 border-b border-nexus-border shrink-0">
        <div className="flex items-center gap-2 text-nexus-cyan font-bold text-xl tracking-wider neon-text">
          <div className="w-6 h-6 rounded-sm bg-nexus-cyan flex items-center justify-center">
            <div className="w-3 h-3 bg-nexus-bg rounded-sm transform rotate-45"></div>
          </div>
          NEXUS
        </div>
      </div>
      
      <div className="p-4 border-b border-nexus-border shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Pencarian global..." 
            className="w-full bg-nexus-surface border border-nexus-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-nexus-cyan/50 focus:ring-1 focus:ring-nexus-cyan/50 transition-all text-white"
          />
        </div>
      </div>
      
      <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        <div className="px-3 mb-2 text-xs font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap">Menu Utama</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              setActiveView(item.id);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden whitespace-nowrap ${
              activeView === item.id 
                ? 'text-white bg-nexus-border/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)] border border-nexus-cyan/20' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-nexus-surface-hover'
            }`}
          >
            {activeView === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-nexus-cyan shadow-[0_0_10px_rgba(6,182,212,1)]" />
            )}
            <item.icon size={18} className={activeView === item.id ? 'text-nexus-cyan' : 'group-hover:text-gray-300'} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-nexus-border shrink-0">
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-nexus-surface-hover w-full transition-colors whitespace-nowrap"
        >
          <Settings size={18} />
          <span className="font-medium text-sm">Pengaturan</span>
        </button>
        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-nexus-red/80 hover:text-nexus-red hover:bg-nexus-red/10 w-full transition-colors mt-1 whitespace-nowrap"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Keluar</span>
        </button>
      </div>
    </motion.aside>
  );
};
