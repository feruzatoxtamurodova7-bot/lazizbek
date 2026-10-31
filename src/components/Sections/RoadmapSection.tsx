import React from 'react';
import { Smartphone, Eye, ShieldAlert, MapPin, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      quarter: '1-bosqich (Hozirgi)',
      title: 'Veb-chat va Toshkent asosiy bozorlari',
      status: 'Ishga tushgan (Demo)',
      statusColor: 'emerald',
      icon: Smartphone,
      points: [
        'Chat-bot orqali 4 ta rol uchun tezkor roʻyxatdan oʻtish',
        'Shakar, un, yogʻ va 20 ta asosiy tovar narxlari solishtiruvi',
        '0–100 aniqlik (ishonch) reytingi algoritmi',
        'Chilonzor va boshqa tumanlar uchun guruhli buyurtma prototipi',
      ],
    },
    {
      quarter: '2-bosqich',
      title: 'Telegram Mini App & Vision AI moduli',
      status: 'Ishlanmoqda',
      statusColor: 'amber',
      icon: Eye,
      points: [
        'Oʻzbekiston foydalanuvchilari uchun Telegram Mini App formati',
        'Doʻkon cheklari va rastadagi narx taxtalarini Vision AI bilan skanerlash',
        'Avtomatik STIR tekshiruvi (Soliq qoʻmitasi bazasi bilan integratsiya)',
        'Doʻkon egalari uchun har kungi narx oʻzgarishi kanali',
      ],
    },
    {
      quarter: '3-bosqich',
      title: 'Anomaliya va bozor firibgarligidan himoya',
      status: 'Rejada',
      statusColor: 'indigo',
      icon: ShieldAlert,
      points: [
        'Median narxdan 8% dan koʻp past boʻlgan soxta narxlarni avtomatik bloklash',
        'Maydon agentlari (market checkers) uchun tekshirish ilovasi',
        'Yetkazib beruvchilarning haqqoniy ishonchlilik reytingi',
        'Optomchilar uchun avtomatlashtirilgan narx yangilash boti',
      ],
    },
    {
      quarter: '4-bosqich',
      title: 'Viloyatlar bozorlari & Logistika marshrutizatsiyasi',
      status: 'Rejada',
      statusColor: 'slate',
      icon: MapPin,
      points: [
        'Samarqand, Vodiy (Andijon, Fargʻona, Namangan) va Buxoro ulgurji bozorlari',
        'Labo va Isuzu haydovchilari uchun reyslarni klasterlashtirish va marshrutizatsiya',
        'Banklar va yirik distribyutorlar uchun B2B analitik API',
        'Eskrou xavfsiz toʻlov tizimi integratsiyasi',
      ],
    },
  ];

  return (
    <section id="yol-xaritasi" className="py-16 sm:py-24 bg-white/60 dark:bg-[#0c1024]/60 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase">
            <span>Rivojlanish bosqichlari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c2456] dark:text-white tracking-tight">
            Yoʻl xaritasi va texnologik arxitektura
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Prototiplardan tortib butun respublika ulgurji savdo ekotizimigacha boʻlgan bosqichlar:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {roadmapItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#141a38] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.quarter}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.statusColor === 'emerald'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : item.statusColor === 'amber'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#12a198]/10 text-[#12a198] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12a198] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
