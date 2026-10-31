import React from 'react';
import { Check, Sparkles, Building, AlertCircle } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Doʻkon (Asosiy)',
      price: '0 soʻm',
      period: 'doimiy bepul',
      badge: 'Barcha doʻkonlar uchun',
      highlight: false,
      desc: 'Barcha Toshkent ulgurji bozor narxlarini solishtirish va trendlarni koʻrish.',
      features: [
        'Ulgurji narxlarni cheklovsiz qidirish',
        '7 kunlik narx trendlari va tahlil',
        'Guruhli buyurtmalarga qoʻshilish',
        'Ishonch bali va aniqlik maʼlumotlari',
      ],
      tag: 'taxmin',
    },
    {
      name: 'Doʻkon Pro',
      price: '49 000 soʻm',
      period: '/ oy',
      badge: 'Eng ommabop',
      highlight: true,
      desc: 'Doimiy ravishda arzon narxlar haqida shaxsiy Telegram bildirishnomalar va ustuvor yetkazish.',
      features: [
        'Asosiy tovarlar narxi tushganda shaxsiy xabar',
        '20+ tovarlik savatni avtomatik optimallashtirish',
        'Ustuvor guruhli buyurtma navbati',
        'Yetkazib berish xarajatlarini 0 ga tushirish',
      ],
      tag: 'taxmin',
    },
    {
      name: 'Sotuvchi (Optomchi)',
      price: '300 000 soʻm',
      period: '/ oy',
      badge: 'Optomchilar uchun',
      highlight: false,
      desc: 'Doʻkonlar talabini koʻrish, oʻz narxlarini joylashtirish va yangi xaridorlar bazasini kengaytirish.',
      features: [
        'Tumanlar kesimida talab signallariga kirish',
        'Cheksiz tovarlar narxini joylashtirish',
        '"✓ Tasdiqlangan sotuvchi" ishonch belgisi',
        'Guruhli xaridlarga toʻgʻridan-toʻgʻri taklif',
      ],
      tag: 'taxmin',
    },
  ];

  const additionalRevenue = [
    {
      title: 'Guruhli buyurtma komissiyasi',
      rate: '~1,5%',
      note: 'taxmin',
      desc: 'Ishlab chiqaruvchi va optomchi tomonidan amalga oshirilgan katta hajmli guruhli yetkazib berishdan olinadi (doʻkon uchun mutlaqo bepul).',
    },
    {
      title: 'Bank va distribyutorlar tahliliy hisoboti',
      rate: 'Shartnoma asosida',
      note: 'taxmin',
      desc: 'Inflyatsiya, oziq-ovqat mahsulotlari narx indekslari va xarid qobiliyati boʻyicha chuqur tahliliy hisobotlar va API kirish.',
    },
  ];

  return (
    <section id="narxlar" className="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <span>Shaffof monetizatsiya</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c2456] dark:text-white tracking-tight">
            Kim nima uchun toʻlaydi?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Kichik biznes uchun narxlarni koʻrish bepul. Platforma faqat real foyda keltirgandagina xizmat haqi olinadi:
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((pl, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all relative ${
                pl.highlight
                  ? 'bg-gradient-to-b from-[#1c2456] to-indigo-950 text-white shadow-xl ring-2 ring-[#12a198]'
                  : 'bg-white dark:bg-[#141a38] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {pl.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#12a198] text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                  {pl.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg">{pl.name}</h3>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      pl.highlight
                        ? 'bg-white/10 text-teal-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    ({pl.tag})
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold">
                    {pl.price}
                  </span>
                  <span className={`text-xs ${pl.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {pl.period}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm ${pl.highlight ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}`}>
                  {pl.desc}
                </p>

                <div className={`space-y-2.5 pt-4 border-t ${pl.highlight ? 'border-white/15' : 'border-slate-100 dark:border-slate-800'}`}>
                  {pl.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pl.highlight ? 'text-[#12a198]' : 'text-emerald-500'}`} />
                      <span className={pl.highlight ? 'text-slate-100' : 'text-slate-700 dark:text-slate-300'}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div
                  className={`text-center py-2.5 px-4 rounded-xl text-xs font-bold ${
                    pl.highlight
                      ? 'bg-[#12a198] text-white hover:opacity-95'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {pl.name.includes('Asosiy') ? 'Hozir chatda faol' : 'Rejalashtirilgan tarif (taxmin)'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Revenue Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {additionalRevenue.map((rev, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141a38]/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#f0a22e] flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {rev.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {rev.rate}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    ({rev.note})
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
