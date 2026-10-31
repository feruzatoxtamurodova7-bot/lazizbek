import React, { useState } from 'react';
import { Check, ShieldCheck, Clock, MapPin, AlertTriangle, HelpCircle, Sparkles } from 'lucide-react';
import { AccuracyModal } from '../AccuracyModal';

export const MobilePricingTab: React.FC = () => {
  const [isAccuracyModalOpen, setIsAccuracyModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#f8fafc]/50 dark:bg-[#0c1024]/40 pb-20 text-xs">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#1c2456] text-white space-y-1 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
          Shaffof monetizatsiya
        </span>
        <h3 className="text-base font-extrabold">
          Kim nima uchun toʻlaydi?
        </h3>
        <p className="text-xs text-slate-300">
          Doʻkonlar uchun narxlarni koʻrish mutlaqo bepul.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-3">
        {/* Free Plan */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              Doʻkon (Asosiy)
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">(taxmin)</span>
          </div>
          <div className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
            0 soʻm <span className="text-xs font-normal text-slate-400">/ doimiy bepul</span>
          </div>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Barcha bozor narxlarini solishtirish</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Guruhli buyurtmalarga qoʻshilish (−3%)</span>
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1c2456] to-indigo-950 text-white space-y-2 shadow-sm ring-1 ring-[#12a198]">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-white">
              Doʻkon Pro
            </span>
            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#12a198] text-white">
              Eng ommabop (taxmin)
            </span>
          </div>
          <div className="text-lg font-mono font-black text-[#12a198]">
            49 000 soʻm <span className="text-xs font-normal text-slate-300">/ oy</span>
          </div>
          <ul className="space-y-1 text-slate-200 text-[11px]">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#12a198] shrink-0" />
              <span>Narx tushganda shaxsiy Telegram bildirishnoma</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#12a198] shrink-0" />
              <span>20+ tovarlik savatni avtomatik optimallashtirish</span>
            </li>
          </ul>
        </div>

        {/* Wholesaler Plan */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              Sotuvchi (Optomchi)
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">(taxmin)</span>
          </div>
          <div className="text-lg font-mono font-black text-[#1c2456] dark:text-white">
            300 000 soʻm <span className="text-xs font-normal text-slate-400">/ oy</span>
          </div>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#12a198] shrink-0" />
              <span>Tumanlar boʻyicha real talab signallari</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#12a198] shrink-0" />
              <span>"✓ Tasdiqlangan sotuvchi" ishonch belgisi</span>
            </li>
          </ul>
        </div>

        {/* Commission */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200">
          <strong>Guruhli buyurtma komissiyasi:</strong> ~1,5% (taxmin) — ishlab chiqaruvchi va optomchidan katta hajmli guruhli yetkazishdan olinadi (doʻkonga bepul).
        </div>
      </div>

      {/* Accuracy Formula Explainer Button */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#12a198]" />
            <span className="font-bold text-slate-900 dark:text-white">
              Aniqlik bali qanday hisoblanadi?
            </span>
          </div>
          <button
            onClick={() => setIsAccuracyModalOpen(true)}
            className="text-[11px] font-bold text-[#12a198] hover:underline cursor-pointer"
          >
            Batafsil
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          Aniqlik (0–100) = Yangilik (40) + Doʻkon tasdiqlari (40) + STIR (20). 60 dan past narxlar tavsiya qilinmaydi.
        </p>
      </div>

      {/* Roadmap Summary */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
        <span className="text-[10px] font-bold uppercase text-slate-400">
          Yoʻl xaritasi (Bosqichlar)
        </span>
        <div className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
          <div>• <strong>1-bosqich:</strong> Veb-chat va Toshkent asosiy ulgurji bozorlari (faol)</div>
          <div>• <strong>2-bosqich:</strong> Telegram Mini App & Vision AI chek skaneri</div>
          <div>• <strong>3-bosqich:</strong> Anomaliya va soxta narxlarni filtrlash</div>
          <div>• <strong>4-bosqich:</strong> Samarqand va Vodiy ulgurji bozorlarini ulash</div>
        </div>
      </div>

      {/* Mandatory Demo Disclaimer */}
      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Demo:</strong> Ushbu platformadagi barcha narxlar va yetkazib beruvchilar uydirma, tanib olish simulyatsiya qilingan.
        </span>
      </div>

      <AccuracyModal
        isOpen={isAccuracyModalOpen}
        onClose={() => setIsAccuracyModalOpen(false)}
      />
    </div>
  );
};
