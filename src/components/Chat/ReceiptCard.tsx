import React, { useEffect } from 'react';
import { CheckCircle2, Clock, Sparkles, TrendingDown, Database, RotateCcw, Camera } from 'lucide-react';
import { formatSum, FINAL_TOTAL_SAVINGS, BASKET_TOTAL_STANDARD, BASKET_TOTAL_GROUP } from '../../data/marketData';
import { triggerConfetti } from '../../utils/confetti';

interface ReceiptCardProps {
  onRestart: () => void;
  onPhotoScan: () => void;
  onOpenAccuracy: () => void;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  onRestart,
  onPhotoScan,
  onOpenAccuracy,
}) => {
  // Fire confetti upon mounting
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="bg-white dark:bg-[#141a38] text-[#1c2456] dark:text-slate-100 rounded-2xl p-5 shadow-lg space-y-4 my-3 border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden">
      {/* Top watermark / receipt header */}
      <div className="text-center pb-3 border-b border-dashed border-slate-200 dark:border-slate-700">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-1.5">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
          *** XARID VA TEJAMKORLIK CHEKI ***
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
          Buyurtma muvaffaqiyatli topshirildi
        </h3>
        <p className="text-[11px] text-slate-500 font-mono">
          ID: BZ-{Math.floor(100000 + Math.random() * 900000)} • Toshkent, Chilonzor
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Saved Money */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Tejalgan sof summa:</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
            ~{formatSum(FINAL_TOTAL_SAVINGS)}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Umumiy xariddan <strong>~10,7%</strong> iqtisod qilindi
          </div>
        </div>

        {/* Saved Time */}
        <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-[#12a198]/10 border border-teal-200 dark:border-teal-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-teal-800 dark:text-teal-300 font-bold">
            <Clock className="w-4 h-4 text-[#12a198]" />
            <span>Sarflangan vaqt:</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-extrabold text-[#12a198]">
            2 kun → ~25 daqiqa
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Bozor kezish va qoʻngʻiroqlarsiz chatda
          </div>
        </div>
      </div>

      {/* Financial Breakdown Table */}
      <div className="space-y-1.5 text-xs font-mono p-3 bg-slate-50 dark:bg-[#0c1024]/60 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>Odatdagi bozor narxi:</span>
          <span className="line-through">{formatSum(BASKET_TOTAL_STANDARD)}</span>
        </div>
        <div className="flex justify-between text-slate-500 dark:text-slate-400">
          <span>BozorNarx arzon taklifi:</span>
          <span>11 420 000 soʻm</span>
        </div>
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
          <span>Guruhli buyurtma (−3%):</span>
          <span>-342 600 soʻm</span>
        </div>
        <div className="border-t border-dashed border-slate-300 dark:border-slate-700 pt-1.5 flex justify-between text-slate-900 dark:text-white font-extrabold text-sm">
          <span>TOʻLANGAN JAMI:</span>
          <span className="text-[#12a198]">{formatSum(BASKET_TOTAL_GROUP)}</span>
        </div>
      </div>

      {/* Database contribution badge */}
      <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200">
        <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <div>
          <strong>Tizim bazasiga +20 ta narx nuqtasi qoʻshildi:</strong> Sizning tasdiqingiz tufayli boshqa doʻkonlar uchun maʼlumot aniqligi <strong>96%</strong> gacha koʻtarildi!
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="pt-2 flex flex-wrap gap-2 justify-center">
        <button
          onClick={onPhotoScan}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-teal-500/10 text-[#12a198] hover:bg-teal-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>📷 Chek suratini tekshirish</span>
        </button>
        <button
          onClick={onOpenAccuracy}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Aniqlik qanday hisoblanadi?
        </button>
        <button
          onClick={onRestart}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Boshidan boshlash</span>
        </button>
      </div>
    </div>
  );
};
