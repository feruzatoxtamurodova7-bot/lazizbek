import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, ChevronUp, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DEMO_BASKET_20, BASKET_TOTAL_STANDARD, BASKET_TOTAL_OPTIMIZED, formatSum } from '../../data/marketData';

interface BasketCardProps {
  onJoinGroupOrder: () => void;
}

export const BasketCard: React.FC<BasketCardProps> = ({ onJoinGroupOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const savings = BASKET_TOTAL_STANDARD - BASKET_TOTAL_OPTIMIZED; // 980 000 soʻm

  // Display top 5 items initially or all 20 if expanded
  const displayItems = isExpanded ? DEMO_BASKET_20 : DEMO_BASKET_20.slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 my-2 text-[#1c2456] dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#12a198]/10 text-[#12a198] flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              20 ta asosiy tovar savatchasi
            </h4>
            <p className="text-[11px] text-slate-400">
              Oʻrtacha bozor narxi vs BozorNarx optimallashtirilgan
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          20 tovar
        </span>
      </div>

      {/* Comparison Totals Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-teal-50/40 dark:from-[#0c1024] dark:to-[#12a198]/10 border border-teal-100 dark:border-teal-900/40 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-500 dark:text-slate-400">Odatdagi bozor narxi:</span>
          <span className="font-mono text-slate-500 dark:text-slate-400 line-through font-semibold">
            {formatSum(BASKET_TOTAL_STANDARD)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm sm:text-base">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#12a198]" />
            BozorNarx eng arzon taklifi:
          </span>
          <span className="font-mono font-extrabold text-lg sm:text-xl text-[#12a198]">
            {formatSum(BASKET_TOTAL_OPTIMIZED)}
          </span>
        </div>
        <div className="pt-2 border-t border-teal-100 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <span>Sizning birinchi tejamkorligingiz:</span>
          <span className="font-mono px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 rounded-md">
            +{formatSum(savings)} (7.9%)
          </span>
        </div>
      </div>

      {/* Items list preview */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          {isExpanded ? 'Barcha 20 ta tovar boʻyicha taqsimot' : 'Eng asosiy tovarlar (namuna)'}:
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {displayItems.map((item) => (
            <div key={item.id} className="py-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {item.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {item.qty} • <span className="text-[#12a198]">{item.supplier}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatSum(item.optimizedPrice)}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                  -{formatSum(item.savings)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Kamroq koʻrsatish</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Barcha 20 ta tovarni koʻrish ({DEMO_BASKET_20.length - 5} ta qoldi)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Next Step CTA: Group order */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onJoinGroupOrder}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-[#f0a22e] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span>Guruhli buyurtmaga qoʻshilish (−3% qoʻshimcha chegirma)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
