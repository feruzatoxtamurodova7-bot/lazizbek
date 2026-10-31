import React from 'react';
import { Users, Truck, Clock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MobileGroupsTabProps {
  onJoinGroup: (district: string) => void;
}

export const MobileGroupsTab: React.FC<MobileGroupsTabProps> = ({ onJoinGroup }) => {
  const pools = [
    {
      id: 'p1',
      district: 'Chilonzor',
      target: 10,
      current: 7,
      eta: 'Ertaga 10:00–12:00',
      discount: '−3%',
      topProducts: 'Shakar, un 50 kg, yogʻ 20 l',
      savingsAvg: '340 000 soʻm/doʻkon',
    },
    {
      id: 'p2',
      district: 'Uchtepa',
      target: 10,
      current: 5,
      eta: 'Ertaga 13:00–15:00',
      discount: '−3%',
      topProducts: 'Guruch, un 50 kg, choy',
      savingsAvg: '290 000 soʻm/doʻkon',
    },
    {
      id: 'p3',
      district: 'Yunusobod',
      target: 10,
      current: 8,
      eta: 'Bugun 17:00–19:00',
      discount: '−3%',
      topProducts: 'Makaron, yogʻ 20 l, shakar',
      savingsAvg: '380 000 soʻm/doʻkon',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#f8fafc]/50 dark:bg-[#0c1024]/40 pb-20">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 text-white">
            Guruhli buyurtmalar hovuzi
          </span>
          <span className="text-xs font-bold font-mono">Qoʻshimcha −3%</span>
        </div>
        <h3 className="text-base font-extrabold">
          Qoʻshni doʻkonlar bilan birlashing
        </h3>
        <p className="text-xs text-amber-100">
          Bitta tuman doʻkonlari bitta marshrutga birlashib, ishlab chiqaruvchi narxini oladi va yetkazish bepul boʻladi.
        </p>
      </div>

      {/* Pools List */}
      <div className="space-y-3">
        {pools.map((pool) => {
          const percent = (pool.current / pool.target) * 100;

          return (
            <div
              key={pool.id}
              className="bg-white dark:bg-[#141a38] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#12a198]" />
                    <span>{pool.district} tumani</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Asosiy tovarlar: {pool.topProducts}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {pool.discount} Chegirma
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">
                    Toʻplandi: {pool.current} / {pool.target} doʻkon
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                    Yana {pool.target - pool.current} ta kerak
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#12a198] rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0c1024]/50 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Yetkazish vaqti:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {pool.eta}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0c1024]/50 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Oʻrtacha tejamkorlik:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{pool.savingsAvg}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onJoinGroup(pool.district)}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#12a198] to-teal-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Guruhga qoʻshilish ({pool.district})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
