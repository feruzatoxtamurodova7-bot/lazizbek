import React from 'react';
import { TICKER_ITEMS, formatSum } from '../data/marketData';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface TickerBarProps {
  onSelectProduct: (productName: string) => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({ onSelectProduct }) => {
  // Duplicate list to achieve continuous loop marquee
  const repeatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-[#1c2456] text-white border-b border-indigo-950/60 overflow-hidden relative select-none">
      <div className="flex items-center">
        {/* Fixed Title Label */}
        <div className="z-10 shrink-0 px-3 sm:px-4 py-2 bg-[#141a38] text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5 border-r border-indigo-900/50 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12a198] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12a198]"></span>
          </span>
          <span className="text-amber-400 font-extrabold hidden sm:inline">Bugungi tablo</span>
          <span className="text-[10px] text-slate-300 font-medium">(demo)</span>
        </div>

        {/* Marquee Track */}
        <div className="overflow-hidden py-2 whitespace-nowrap w-full">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
            {repeatedItems.map((item, idx) => (
              <button
                key={`${item.name}-${idx}`}
                onClick={() => onSelectProduct(item.name)}
                className="inline-flex items-center gap-2 text-xs text-slate-200 hover:text-white hover:bg-white/10 px-2 py-1 rounded-md transition-all cursor-pointer group"
                title={`${item.name} haqida chatda soʻrash`}
              >
                <span className="font-semibold group-hover:text-amber-300 transition-colors">
                  {item.name}:
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  {formatSum(item.price)}
                </span>
                <span className="text-[10px] text-slate-400">({item.market})</span>
                <span
                  className={`inline-flex items-center text-[11px] font-mono font-bold px-1 rounded ${
                    item.up
                      ? 'text-rose-400 bg-rose-950/50'
                      : 'text-emerald-400 bg-emerald-950/50'
                  }`}
                >
                  {item.up ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {item.up ? `+${item.change}%` : `${item.change}%`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
