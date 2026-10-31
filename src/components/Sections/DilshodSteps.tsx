import React from 'react';
import { UserCheck, Search, Users, Receipt, Clock, Sparkles, TrendingDown } from 'lucide-react';

export const DilshodSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Chatda 1 daqiqada boshlash',
      desc: 'Forma toʻldirish yoʻq. Bot 4 ta qisqa savol beradi: doʻkon turi, tumani va eng koʻp olinadigan tovarlar.',
      icon: UserCheck,
      badge: 'Formasiz roʻyxatdan oʻtish',
    },
    {
      num: '02',
      title: 'Real vaqtda narx solishtirish',
      desc: 'Shakar, un, yogʻ va 20 ta asosiy tovar boʻyicha 5 ta yirik Toshkent ulgurji bozor narxlarini solishtiradi.',
      icon: Search,
      badge: 'Shaffof narxlar',
    },
    {
      num: '03',
      title: 'Guruhli buyurtmaga qoʻshilish',
      desc: 'Chilonzordagi boshqa oziq-ovqat doʻkonlari bilan bitta yetkazib berish marshrutiga birlashib, qoʻshimcha −3% chegirma oladi.',
      icon: Users,
      badge: '−3% chegirma',
    },
    {
      num: '04',
      title: '1.3 mln soʻm tejalgan chek',
      desc: '2 kunlik bozor kezish va 30 ta telefon qoʻngʻirogʻi oʻrniga 25 daqiqada barcha tovarlar doʻkonga bepul yetkaziladi.',
      icon: Receipt,
      badge: '~10,7% tejamkorlik',
    },
  ];

  return (
    <section id="qanday-ishlaydi" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Story Persona Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12a198]/10 text-[#12a198] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kichik biznes hayotidan haqiqiy misol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c2456] dark:text-white tracking-tight">
            Dilshod uchun 4 qadam
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Dilshod (34 yosh, Chilonzorda oziq-ovqat doʻkoni egasi) ilgari har hafta 2 kunini bozor kezish, yetkazuvchilarga qoʻngʻiroq qilish va narx surishtirishga sarflardi. Narx har hafta oʻzgarib, bugungi narx adolatlimi yoki yoʻqligini bilolmasdi. <strong>BozorNarx</strong> bilan u quyidagi 4 qadamda vaqt va mablagʻini tejaydi:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white dark:bg-[#141a38] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#12a198]">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1c2456]/5 dark:bg-white/5 flex items-center justify-center text-[#1c2456] dark:text-teal-300 group-hover:bg-[#12a198] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-[#12a198] dark:text-teal-300">
                    ✓ {st.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
