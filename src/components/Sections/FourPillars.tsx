import React from 'react';
import { Store, Package, Factory, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export const FourPillars: React.FC = () => {
  const pillars = [
    {
      role: 'Doʻkon egasi',
      type: 'Foydalanuvchi (bepul)',
      icon: Store,
      color: 'teal',
      headline: 'Narx koʻradi, solishtiradi, guruhli buyurtma qiladi',
      desc: 'Doʻkon egalari barcha yirik ulgurji bozorlardagi eng arzon va ishonchli takliflarni tez topadi. Qoʻshnilar bilan birlashib, ishlab chiqaruvchi ulgurji narxini oladi.',
      benefits: [
        'Shaffof va yangi narxlar reyestri',
        '20 ta tovarlik savatchani optimallashtirish',
        'Guruhli buyurtmada −3% qoʻshimcha chegirma',
        'Kafolatlangan yetkazib berish vaqti',
      ],
    },
    {
      role: 'Optomchi (Sotuvchi)',
      type: 'Hamkor (toʻlaydi)',
      icon: Package,
      color: 'amber',
      headline: 'Narx joylashtiradi, yangi xaridor topadi',
      desc: 'Ulgurji savdogarlar va yirik omborlar oʻz mahsulot narxlarini joylashtirib, Toshkent boʻylab yuzlab kichik doʻkonlarga toʻgʻridan-toʻgʻri chiqadi.',
      benefits: [
        'Aniq tumanlar kesimidagi talab signallari',
        'Doimiy va kafolatlangan yangi xaridorlar oqimi',
        'Orttiqcha dallollarsiz toʻgʻridan-toʻgʻri savdo',
        'Tasdiqlangan sotuvchi reytingi va ishonch',
      ],
    },
    {
      role: 'Ishlab chiqaruvchi',
      type: 'Katta hamkor (toʻlaydi)',
      icon: Factory,
      color: 'indigo',
      headline: 'Doʻkonlarga bevosita chiqadi, talabni koʻradi',
      desc: 'Zavod va fabrikalar oʻz tovarlarini vositachilarsiz chakana doʻkonlar tarmogʻiga taqdim etadi. Oylik talab va narx dinamikasini real vaqtda kuzatadi.',
      benefits: [
        'Yirik dilerlar monopoliyasidan qutulish',
        'Real vaqtda bozor talabini tahlil qilish',
        'Guruhli buyurtmalar orqali toʻgʻridan-toʻgʻri taʼminot',
        'Keng qamrovli brend tanilishi',
      ],
    },
    {
      role: 'Logistika va yetkazib berish',
      type: 'Xizmat koʻrsatuvchi (toʻlaydi)',
      icon: Truck,
      color: 'emerald',
      headline: 'Guruhli buyurtma yuklarini qabul qiladi',
      desc: 'Labo, Isuzu va boshqa yuk mashinalari haydovchilari boʻsh qaytmaydi. Bitta tuman boʻyicha tuzilgan 8–10 ta doʻkonning jamlangan yukini qabul qiladi.',
      benefits: [
        'Oldindan rejalashtirilgan qulay marshrutlar',
        'Bitta reysda bir nechta doʻkonga yetkazish',
        'Kafolatlangan reys toʻlovi',
        'Boʻsh va samarasiz qatnovlarning kamayishi',
      ],
    },
  ];

  return (
    <section id="tort-tomon" className="py-16 sm:py-24 bg-white/60 dark:bg-[#0c1024]/60 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide uppercase">
            <span>Bozor ekotizimi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c2456] dark:text-white tracking-tight">
            Bozorning toʻrt tomoni
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Platforma barcha 4 ta ishtirokchi uchun oʻzaro manfaatli muvozanatni yaratadi:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#141a38] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#1c2456]/5 dark:bg-white/5 flex items-center justify-center text-[#12a198]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {p.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                      {p.role}
                    </h3>
                    <div className="text-xs font-bold text-[#12a198] dark:text-teal-300 mt-0.5">
                      {p.headline}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {p.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
