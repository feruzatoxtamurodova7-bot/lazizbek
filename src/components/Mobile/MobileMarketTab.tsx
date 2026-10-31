import React, { useState } from 'react';
import { BASE_PRODUCTS, formatSum } from '../../data/marketData';
import { ProductData } from '../../types';
import { Search, TrendingUp, TrendingDown, ShieldCheck, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface MobileMarketTabProps {
  onAskInChat: (productName: string) => void;
}

export const MobileMarketTab: React.FC<MobileMarketTabProps> = ({ onAskInChat }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Barchasi', 'Oziq-ovqat', 'Ichimliklar'];

  const filteredProducts = BASE_PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'Barchasi' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#f8fafc]/50 dark:bg-[#0c1024]/40 pb-20">
      {/* Top Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1c2456] to-indigo-900 text-white space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Bugungi narxlar tablosu
          </span>
          <span className="text-[10px] text-slate-300 font-mono">5 bozor</span>
        </div>
        <h3 className="text-base font-extrabold tracking-tight">
          Toshkent Ulgurji Bozorlari
        </h3>
        <p className="text-xs text-slate-300">
          Chilonzor, Abu Saxiy, Yangiobod, Sergeli va Qoʻyliq real narxlari.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tovar nomini qidirish (shakar, un, yogʻ)..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#12a198] outline-hidden shadow-2xs"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#12a198] text-white shadow-2xs'
                : 'bg-white dark:bg-[#141a38] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.map((prod) => {
          const isUp = prod.change7DaysPercent >= 0;
          const bestOffer = [...prod.offers].sort((a, b) => a.price - b.price)[0];

          return (
            <div
              key={prod.id}
              className="bg-white dark:bg-[#141a38] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-[#12a198]">
                      {prod.unit}
                    </span>
                    <span className="text-[10px] text-slate-400">{prod.category}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {prod.name}
                  </h4>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-sm text-[#1c2456] dark:text-white">
                    {formatSum(prod.basePrice)}
                  </div>
                  <div
                    className={`inline-flex items-center text-[10px] font-mono font-bold ${
                      isUp ? 'text-rose-500' : 'text-emerald-500'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                    )}
                    {isUp ? `+${prod.change7DaysPercent}%` : `${prod.change7DaysPercent}%`} (7 kun)
                  </div>
                </div>
              </div>

              {/* Best Offer Preview */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1024]/50 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">Eng arzon taklif:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {bestOffer.supplierName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {bestOffer.deliveryTime}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatSum(bestOffer.price)}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#12a198]" />
                    <span>Aniqlik: {bestOffer.confidenceScore}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onAskInChat(prod.name)}
                className="w-full py-2 px-3 bg-[#1c2456] dark:bg-[#12a198] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                <span>Chatda narxni solishtirish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
