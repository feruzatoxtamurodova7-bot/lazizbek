import React from 'react';
import { Store, AlertTriangle, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c2456] text-white border-t border-indigo-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-indigo-900/60">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#12a198] flex items-center justify-center text-white font-bold">
                <Store className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Bozor<span className="text-[#12a198]">Narx</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Toshkent ulgurji bozor narxlari, shaffof taqqoslash, talab va taklif hamda guruhli buyurtmalar uchun yagona chat-bot platformasi.
            </p>
          </div>

          {/* Explicit Demo Disclaimer Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 max-w-md">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold text-amber-300">Ochiq ogohlantirish (Demo):</div>
              <p className="text-[11px] leading-relaxed text-amber-100">
                Ushbu platformadagi barcha narxlar, yetkazib beruvchilar va savatchalar uydirma boʻlib, tasvirlarni tanib olish (Vision AI) simulyatsiya qilingan prototipdir.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} BozorNarx Platformasi. Toshkent, Oʻzbekiston.
          </div>
          <div className="flex items-center gap-6">
            <span>Til: Oʻzbek (lotin)</span>
            <span>•</span>
            <span>Toshkent ulgurji bozorlari: Chilonzor, Yangiobod, Abu Saxiy, Sergeli, Qoʻyliq</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
