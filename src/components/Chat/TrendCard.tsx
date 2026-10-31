import React from 'react';
import { AlertTriangle, TrendingUp, Calendar, ArrowRight, BarChart3 } from 'lucide-react';
import { ProductData } from '../../types';
import { formatSum } from '../../data/marketData';

interface TrendCardProps {
  product?: ProductData;
  onSendBasket: () => void;
}

export const TrendCard: React.FC<TrendCardProps> = ({ product, onSendBasket }) => {
  const productName = product ? product.name : 'Shakar 50 kg';
  const changePercent = product ? product.change7DaysPercent : 1.63;
  const isUp = changePercent >= 0;

  return (
    <div className="bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 my-2 text-[#1c2456] dark:text-slate-100">
      {/* Title */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#f0a22e] flex items-center justify-center font-bold">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            {productName}: 7 kunlik trend va prognoz
          </h4>
          <p className="text-[11px] text-slate-400">
            Toshkent ulgurji bozorlari dinamikasi tahlili
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c1024]/50 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[10px] text-slate-400 font-medium">7 kunlik oʻzgarish</div>
          <div className={`font-mono text-base font-extrabold mt-0.5 ${isUp ? 'text-rose-500' : 'text-emerald-500'}`}>
            {isUp ? `+${changePercent}%` : `${changePercent}%`}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {isUp ? 'Moʻtadil koʻtarilish' : 'Kichik pasayish'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0c1024]/50 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[10px] text-slate-400 font-medium">Bozor talabi</div>
          <div className="font-mono text-base font-extrabold text-[#12a198] mt-0.5">
            Yuqori (92%)
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Chilonzor / Abu Saxiy
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
        <p>
          📊 <strong>Bozor tahlili:</strong> Soʻnggi 7 kunda ulgurji omborlarda zaxiralar moʻtadil boʻlib, chakana doʻkonlardan talab ortgan. Baza narxi 490 000 soʻmdan 498 000 soʻmgacha koʻtarildi.
        </p>
        <p>
          🔮 <strong>Keyingi 3–5 kunlik prognoz:</strong> Narx barqaror saqlanadi yoki 0.5%–1.2% ga biroz oshishi mumkin. Agar katta hajmda xarid qilayotgan boʻlsangiz, bugungi narxda yoki guruhli buyurtma orqali zaxira qilish tavsiya etiladi.
        </p>
      </div>

      {/* Disclaimer Badge */}
      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Kafolat emas:</strong> Ushbu tahlil bozor signallari, oʻtmishdagi narx dinamikasi va doʻkonlar faolligiga asoslangan analitik taxmindir.
        </span>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          onClick={onSendBasket}
          className="w-full py-2.5 px-4 bg-[#1c2456] dark:bg-[#12a198] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
        >
          <span>20 ta tovarlik umumiy roʻyxatni solishtirish</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
