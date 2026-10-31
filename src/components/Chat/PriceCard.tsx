import React from 'react';
import { ProductData } from '../../types';
import { formatSum } from '../../data/marketData';
import { CheckCircle2, ShieldCheck, Clock, Truck, TrendingUp, AlertCircle, Info, Sparkles } from 'lucide-react';

interface PriceCardProps {
  product: ProductData;
  onAskTrend: () => void;
  onAskBasket: () => void;
  onOpenAccuracyModal: () => void;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  product,
  onAskTrend,
  onAskBasket,
  onOpenAccuracyModal,
}) => {
  // Sort offers by price ascending
  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const bestOffer = sortedOffers.find(o => o.confidenceScore >= 60) || sortedOffers[0];

  // Sparkline calculations
  const minHist = Math.min(...product.history7Days);
  const maxHist = Math.max(...product.history7Days);
  const range = maxHist - minHist || 1;
  const width = 160;
  const height = 36;
  const points = product.history7Days
    .map((val, idx) => {
      const x = (idx / (product.history7Days.length - 1)) * width;
      const y = height - ((val - minHist) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  // Range scale percent for current best price
  const cheapMin = product.fairRange.cheap;
  const expMax = product.fairRange.expensive;
  const currentRatio = Math.min(
    100,
    Math.max(0, ((bestOffer.price - cheapMin) / (expMax - cheapMin)) * 100)
  );

  return (
    <div className="bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 my-2 text-[#1c2456] dark:text-slate-100">
      {/* Product Title & Sparkline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-[#12a198]/10 text-[#12a198]">
              {product.unit}
            </span>
            <span className="text-[11px] text-slate-400">Toshkent ulgurji</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold mt-1 text-[#1c2456] dark:text-white">
            {product.name}
          </h3>
        </div>

        {/* 7-day sparkline badge */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#0c1024]/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold">7 kunlik trend</div>
            <div className={`text-xs font-bold font-mono ${product.change7DaysPercent >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              {product.change7DaysPercent >= 0 ? `▲ +${product.change7DaysPercent}%` : `▼ ${product.change7DaysPercent}%`}
            </div>
          </div>
          <svg className="w-24 sm:w-28 h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke={product.change7DaysPercent >= 0 ? '#ef4444' : '#10b981'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {product.history7Days.map((val, idx) => {
              const x = (idx / (product.history7Days.length - 1)) * width;
              const y = height - ((val - minHist) / range) * (height - 8) - 4;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={idx === product.history7Days.length - 1 ? 3.5 : 1.5}
                  fill={product.change7DaysPercent >= 0 ? '#ef4444' : '#10b981'}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Price scale bar (Arzon / Adolatli / Qimmat) */}
      <div className="space-y-1.5 bg-slate-50 dark:bg-[#0c1024]/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Haftalik shkala:</span>
          <span className="font-bold text-[#12a198]">
            Eng arzon: {formatSum(bestOffer.price)}
          </span>
        </div>
        <div className="relative pt-2 pb-1">
          <div className="h-2 rounded-full w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 opacity-80" />
          {/* Indicator Marker */}
          <div
            className="absolute top-1 transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${Math.max(6, Math.min(94, currentRatio))}%` }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#1c2456] dark:bg-white border-2 border-emerald-400 shadow-sm" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] font-medium text-slate-400 dark:text-slate-500 px-1">
          <span>Arzon ({formatSum(product.fairRange.cheap)})</span>
          <span>Adolatli ({formatSum(product.fairRange.fair)})</span>
          <span>Qimmat ({formatSum(product.fairRange.expensive)})</span>
        </div>
      </div>

      {/* Suppliers Table (5 yetkazuvchi arzondan qimmatga) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            5 ta ulgurji yetkazuvchi (arzondan qimmatga)
          </span>
          <button
            onClick={onOpenAccuracyModal}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#12a198] hover:underline cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>Aniqlik qanday hisoblanadi?</span>
          </button>
        </div>

        <div className="space-y-2">
          {sortedOffers.map((offer, i) => {
            const isLowest = i === 0;
            const isLowConfidence = offer.confidenceScore < 60;

            return (
              <div
                key={offer.id}
                className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                  isLowest
                    ? 'border-[#12a198] bg-[#12a198]/5 dark:bg-[#12a198]/10 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141a38]/80'
                }`}
              >
                {/* Left: Supplier info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {offer.supplierName}
                    </span>
                    {offer.isVerified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tasdiqlangan</span>
                      </span>
                    )}
                    {isLowest && !isLowConfidence && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                        <Sparkles className="w-3 h-3" />
                        <span>Eng arzon taklif</span>
                      </span>
                    )}
                    {isLowConfidence && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3" />
                        <span>Arzon, lekin ishonch past</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {offer.updatedHoursAgo} soat oldin
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-slate-400" />
                      {offer.confirmationsCount} ta tasdiq
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-400" />
                      {offer.deliveryTime}
                    </span>
                  </div>
                </div>

                {/* Right: Price & Confidence */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="font-mono text-base font-extrabold text-[#1c2456] dark:text-white">
                    {formatSum(offer.price)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-slate-400">Aniqlik:</span>
                    <span
                      className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                        offer.confidenceScore >= 85
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : offer.confidenceScore >= 60
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {offer.confidenceScore}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onAskTrend}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Narx oshadimi?</span>
        </button>
        <button
          onClick={onAskBasket}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#12a198]/10 text-[#12a198] hover:bg-[#12a198]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>20 ta tovarlik roʻyxat yuborish</span>
        </button>
      </div>
    </div>
  );
};
