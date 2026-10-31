import React from 'react';
import { UserCheck, Search, Users, Receipt, Clock, Sparkles, TrendingDown, Store, Package, Factory, Truck } from 'lucide-react';

interface MobileDilshodTabProps {
  onStartChat: () => void;
}

export const MobileDilshodTab: React.FC<MobileDilshodTabProps> = ({ onStartChat }) => {
  const steps = [
    {
      num: '1',
      title: 'Chatda 1 daqiqada profil ochish',
      desc: 'Forma toʻldirish yoʻq. Bot 4 ta qisqa savol beradi: doʻkon turi, tumani va tovarlar.',
      icon: UserCheck,
    },
    {
      num: '2',
      title: '5 ta ulgurji bozor narxini solishtirish',
      desc: 'Shakar, un, yogʻ va 20 ta asosiy tovar boʻyicha eng arzon va ishonchli takliflarni topadi.',
      icon: Search,
    },
    {
      num: '3',
      title: 'Qoʻshnilar bilan guruhli xarid',
      desc: 'Chilonzordagi doʻkonlar bilan birlashib, ishlab chiqaruvchidan qoʻshimcha −3% chegirma oladi.',
      icon: Users,
    },
    {
      num: '4',
      title: '1.3 mln soʻm tejalgan chek',
      desc: '2 kunlik sarsonlik oʻrniga 25 daqiqada barcha tovarlar doʻkonga bepul yetkaziladi.',
      icon: Receipt,
    },
  ];

  const roles = [
    { title: 'Doʻkon egasi', desc: 'Narx koʻradi, solishtiradi, guruhli buyurtma qiladi (bepul).', icon: Store },
    { title: 'Optomchi', desc: 'Narx joylashtiradi, yangi xaridor topadi (toʻlaydi).', icon: Package },
    { title: 'Ishlab chiqaruvchi', desc: 'Doʻkonlarga bevosita chiqadi, talabni koʻradi (toʻlaydi).', icon: Factory },
    { title: 'Logistika', desc: 'Guruhli buyurtma yuklarini qabul qiladi (toʻlaydi).', icon: Truck },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#f8fafc]/50 dark:bg-[#0c1024]/40 pb-20">
      {/* Persona Story Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#12a198]/10 text-[#12a198] text-[10px] font-bold uppercase">
          <Sparkles className="w-3 h-3" />
          <span>Kichik biznes hayotidan misol</span>
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          Dilshod uchun 4 qadam
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Dilshod (34 yosh, Chilonzorda oziq-ovqat doʻkoni) haftasiga <strong>2 kunini</strong> bozor kezish va qoʻngʻiroqlarga sarflardi. Narxlar adolatlimi yoki yoʻqligini bilmasdi. <strong>BozorNarx</strong> bilan u quyidagi 4 qadamda tejamkorlikka erishadi:
        </p>
      </div>

      {/* Stats comparison widget */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold block">
            Har haftalik tejamkorlik:
          </span>
          <div className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">
            ~1 322 600 soʻm
          </div>
          <span className="text-[10px] text-slate-500">Umumiy xaridning ~10,7%i</span>
        </div>

        <div className="p-3 rounded-2xl bg-teal-50 dark:bg-[#12a198]/10 border border-teal-200 dark:border-teal-800 space-y-1">
          <span className="text-[10px] text-teal-800 dark:text-teal-300 font-bold block">
            Vaqt tejamkorligi:
          </span>
          <div className="text-base font-mono font-black text-[#12a198]">
            2 kun → 25 daqiqa
          </div>
          <span className="text-[10px] text-slate-500">Barcha jarayon bitta chatda</span>
        </div>
      </div>

      {/* 4 Steps Timeline */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Jarayon qadamlari:
        </h4>
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 flex items-start gap-3 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#12a198]/10 text-[#12a198] flex items-center justify-center shrink-0 font-mono font-bold text-xs mt-0.5">
                {st.num}
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {st.title}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bozorning 4 tomoni */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Bozorning toʻrt tomoni:
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-1 shadow-2xs"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-[#12a198]" />
                  <span className="font-bold text-[11px] text-slate-900 dark:text-white truncate">
                    {r.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={onStartChat}
        className="w-full py-2.5 px-4 bg-[#1c2456] dark:bg-[#12a198] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <span>Chatda sinab koʻrish</span>
      </button>
    </div>
  );
};
