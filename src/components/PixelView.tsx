import React, { useState } from 'react';
import { Code2, Copy, CheckCircle2, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export const PixelView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pixelCode = `<!-- Nexus Meta Pixel Integration -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'NEXUS_AUTO_PIXEL_ID_99214');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=NEXUS_AUTO_PIXEL_ID_99214&ev=PageView&noscript=1"
/></noscript>
<!-- End Nexus Meta Pixel Integration -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixelCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Code2 className="text-nexus-purple" />
          Integrasi Meta Pixel
        </h2>
        <p className="text-gray-400">Hubungkan Landing Page Anda dengan ekosistem pelacakan cerdas kami.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold mb-4 text-nexus-cyan">Otomatisasi API</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Jika Landing Page Anda menggunakan platform yang mendukung Webhooks atau API Injection, Nexus akan secara otomatis menyisipkan pixel ke setiap halaman saat kampanye diluncurkan.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-nexus-green bg-nexus-green/10 px-3 py-2 rounded border border-nexus-green/20">
              <CheckCircle2 size={14} />
              Status: Siap untuk injeksi otomatis
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold mb-4">Pelacakan Event</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-nexus-cyan shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
                PageView (Kunjungan)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-nexus-purple shadow-[0_0_5px_rgba(139,92,246,0.8)]"></span>
                ViewContent (Baca Artikel/Produk)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-nexus-green shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                Purchase (Konversi/Sales)
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <div className="glass-panel border-nexus-border/50 overflow-hidden h-full flex flex-col">
            <div className="bg-nexus-surface border-b border-nexus-border p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Terminal size={14} />
                Instalasi Manual (Tag &lt;head&gt;)
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-nexus-cyan hover:text-white transition-colors bg-nexus-cyan/10 px-2 py-1 rounded border border-nexus-cyan/20"
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                {copied ? 'Tersalin!' : 'Salin Kode'}
              </button>
            </div>
            <div className="p-4 bg-[#0d0d12] flex-1 overflow-x-auto custom-scrollbar">
              <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                <code>{pixelCode}</code>
              </pre>
            </div>
            <div className="p-4 border-t border-nexus-border bg-nexus-surface/30">
              <p className="text-xs text-gray-500">
                Letakkan kode ini di antara tag <code className="text-nexus-cyan font-mono">&lt;head&gt;</code> dan <code className="text-nexus-cyan font-mono">&lt;/head&gt;</code> pada setiap halaman website atau landing page Anda.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
