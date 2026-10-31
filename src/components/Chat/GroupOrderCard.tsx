import React, { useState, useEffect } from 'react';
import { Users, Truck, Check, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { BASKET_TOTAL_OPTIMIZED, BASKET_TOTAL_GROUP, formatSum } from '../../data/marketData';

interface GroupOrderCardProps {
  district?: string;
  onConfirmDelivered: () => void;
}

export const GroupOrderCard: React.FC<GroupOrderCardProps> = ({
  district = 'Chilonzor',
  onConfirmDelivered,
}) => {
  const [joined, setJoined] = useState(false);
  const [count, setCount] = useState(7);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleJoin = () => {
    if (joined || isAnimating) return;
    setIsAnimating(true);
    // Smooth step-up animation 7 -> 8 -> 9 -> 10
    setTimeout(() => setCount(8), 250);
    setTimeout(() => setCount(9), 550);
    setTimeout(() => {
      setCount(10);
      setJoined(true);
      setIsAnimating(false);
    }, 900);
  };

  return (
    <div className="bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 my-2 text-[#1c2456] dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#f0a22e] flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Guruhli buyurtma: {district} tumani
            </h4>
            <p className="text-[11px] text-slate-400">
              Qoʻshni doʻkonlar bilan birlashib, ishlab chiqaruvchi narxini oling
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          −3% Chegirma
        </span>
      </div>

      {/* Progress Pool */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c1024]/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#12a198]" />
            Guruh holati:
          </span>
          <span className="font-mono font-extrabold text-[#12a198]">
            {count} / 10 doʻkon toʻplandi
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-teal-400 to-[#12a198] transition-all duration-500 ease-out"
            style={{ width: `${(count / 10) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            {count === 10
              ? '🎉 Guruh toʻliq shakllandi!'
              : `Yana ${10 - count} ta doʻkon kerak (avtomatik yigʻilmoqda)`}
          </span>
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {count === 10 ? 'Maksimal chegirma faollashdi' : 'Tejamkorlik: −3%'}
          </span>
        </div>
      </div>

      {/* Price Impact Card */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c1024]/40 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[10px] text-slate-400 font-medium">BozorNarx odatiy narx:</div>
          <div className="font-mono font-bold text-slate-500 dark:text-slate-400 line-through text-sm mt-0.5">
            {formatSum(BASKET_TOTAL_OPTIMIZED)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-teal-50 dark:bg-[#12a198]/10 border border-teal-200 dark:border-teal-800/60">
          <div className="text-[10px] text-teal-800 dark:text-teal-300 font-bold">Guruhli yangi jami:</div>
          <div className="font-mono font-extrabold text-sm sm:text-base text-[#12a198] mt-0.5">
            {formatSum(BASKET_TOTAL_GROUP)}
          </div>
        </div>
      </div>

      {/* Delivery Schedule */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs">
        <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Rejalashtirilgan yetkazish vaqti:
          </span>{' '}
          <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            Ertaga 10:00–12:00
          </span>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Bitta marshrut orqali {district} tumanidagi 10 ta doʻkonga tekin yetkazish
          </div>
        </div>
      </div>

      {/* Actions */}
      {!joined ? (
        <button
          onClick={handleJoin}
          disabled={isAnimating}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#12a198] to-teal-600 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-teal-500/20 transition-all cursor-pointer active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isAnimating ? 'Guruhga ulanmoqda...' : 'Guruhga qoʻshilish (−3% chegirma)'}</span>
        </button>
      ) : (
        <div className="space-y-2 animate-in fade-in duration-300">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
            <span>
              Siz guruhga muvaffaqiyatli qoʻshildingiz! Yangi summa: <strong>{formatSum(BASKET_TOTAL_GROUP)}</strong>
            </span>
          </div>
          <button
            onClick={onConfirmDelivered}
            className="w-full py-2.5 px-4 bg-[#1c2456] dark:bg-[#12a198] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer shadow-sm"
          >
            <span>Yetkazildi, narx toʻgʻri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
