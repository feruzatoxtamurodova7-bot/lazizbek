import React from 'react';
import { X, ShieldCheck, Clock, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface AccuracyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccuracyModal: React.FC<AccuracyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#141a38] text-[#1c2456] dark:text-[#f0f3fa] w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accuracy-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#0c1024]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#12a198]/10 text-[#12a198] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="accuracy-title" className="text-base font-bold leading-tight">
                Aniqlik (Ishonch) bali qanday hisoblanadi?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                0 dan 100 gacha shaffof baholash formulasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="p-3.5 bg-[#f3f5fb] dark:bg-[#0c1024] rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Asosiy formula
            </div>
            <div className="font-mono text-xs md:text-sm font-semibold text-[#1c2456] dark:text-teal-300">
              Jami (100) = Yangilik (40) + Tasdiqlar (40) + STIR (20)
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50">
              <Clock className="w-5 h-5 text-[#12a198] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>1. Maʼlumot yangiligi</span>
                  <span className="text-xs px-2 py-0.5 bg-[#12a198]/20 text-[#12a198] rounded-full font-mono font-bold">40 ball</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  24 soatdan eskirgan sari kamayadi: <code className="font-mono bg-white/70 dark:bg-black/40 px-1 py-0.5 rounded">max(0, 1 − soat/24) × 40</code>. Masalan, 2 soat oldingi narx ~37 ball oladi, 24 soatdan oshsa 0 ball.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
              <CheckCircle2 className="w-5 h-5 text-[#f0a22e] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>2. Doʻkonlar va agentlar tasdiqlari</span>
                  <span className="text-xs px-2 py-0.5 bg-[#f0a22e]/20 text-amber-700 dark:text-amber-300 rounded-full font-mono font-bold">40 ball</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Doʻkonlar va xarid cheklari orqali tasdiqlash: <code className="font-mono bg-white/70 dark:bg-black/40 px-1 py-0.5 rounded">min(tasdiq, 10)/10 × 40</code>. 10 ta tasdiq toʻliq 40 ball beradi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>3. Yuridik STIR tasdiqi</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full font-mono font-bold">20 ball</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  STIR tekshirilgan va ombor manzili tasdiqlangan yuridik sotuvchilarga beriladi. Nomaʼlum yoki tekshirilmagan sotuvchiga 0 ball.
                </p>
              </div>
            </div>
          </div>

          {/* Filtering Rules */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Qatʼiy himoya qoidalari:
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>60 balldan past:</strong> "Eng arzon" deb tavsiya qilinmaydi. Chatda "Arzon, lekin ishonch past" deb sariq ogohlantirish beriladi.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>Median narxdan 8% dan ortiq past:</strong> "Gʻayritabiiy narx (anomaliya)" sifatida belgilanadi va qayta tekshiruvga yuboriladi.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#12a198] shrink-0 mt-0.5" />
              <span>
                <strong>BozorNarx maqsadi:</strong> Haqiqiy aniqlik koʻrsatkichi ≥95% boʻlishi xarid cheklari va yuk xatlari suratlari bilan doimiy solishtiriladi.
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 text-[11px] rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Eslatma (Demo):</strong> Ushbu demo platformada barcha hisoblar va yetkazuvchilar namunaviy simulyatsiya qilingan.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#0c1024]/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1c2456] dark:bg-[#12a198] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Tushunarli, yopish
          </button>
        </div>
      </div>
    </div>
  );
};
