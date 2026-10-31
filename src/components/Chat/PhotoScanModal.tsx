import React, { useState } from 'react';
import { Camera, X, CheckCircle2, Sparkles, AlertCircle, Upload, Eye } from 'lucide-react';
import { formatSum } from '../../data/marketData';

interface PhotoScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export const PhotoScanModal: React.FC<PhotoScanModalProps> = ({
  isOpen,
  onClose,
  onVerified,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#141a38] text-[#1c2456] dark:text-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#12a198]/10 text-[#12a198] flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                Chek yoki narx taxtasi fotosi
              </h3>
              <p className="text-[11px] text-slate-400">
                Vision AI orqali narxni avtomatik aniqlash
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Demo disclaimer banner */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-[11px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Demo rejim:</strong> Haqiqiy foto yuklash oʻrniga aqlli kompyuter koʻrish modeli (Vision AI) simulyatsiyasi ishlaydi.
            </span>
          </div>

          {!scanResult ? (
            <div className="space-y-3">
              {/* Fake Photo Placeholder Box */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center space-y-2 bg-slate-50 dark:bg-[#0c1024]/60">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#1c2456]/5 dark:bg-white/5 flex items-center justify-center text-slate-400">
                  <Upload className="w-6 h-6 text-[#12a198]" />
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Ulgurji doʻkon cheki yoki narx yorligʻi
                </div>
                <p className="text-[11px] text-slate-500">
                  Namuna: "Chilonzor ulgurji - Shakar 50kg kvitansiyasi"
                </p>
              </div>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2.5 px-4 bg-[#12a198] hover:bg-[#12a198]/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Vision AI tasvirni skanerlamoqda...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Namunaviy chekni tahlil qilish</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-300">
              {/* Scan Results Card */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Tasvir muvaffaqiyatli tahlil qilindi!</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-200 pt-1">
                  <div className="flex justify-between border-b border-emerald-200/50 dark:border-emerald-800/50 pb-1">
                    <span className="text-slate-500">Aniqlangan tovar:</span>
                    <strong>Shakar 50 kg (Rossiya)</strong>
                  </div>
                  <div className="flex justify-between border-b border-emerald-200/50 dark:border-emerald-800/50 pb-1">
                    <span className="text-slate-500">Chekdagi narx:</span>
                    <strong className="text-[#12a198]">498 000 soʻm</strong>
                  </div>
                  <div className="flex justify-between border-b border-emerald-200/50 dark:border-emerald-800/50 pb-1">
                    <span className="text-slate-500">Sotuvchi:</span>
                    <strong>Chilonzor ulgurji savdo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Baza bilan moslik:</span>
                    <span className="text-emerald-600 font-bold">100% toʻgʻri</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-700 dark:text-emerald-300 pt-1">
                  🎉 Ushbu tasdiq tufayli Chilonzor bozoridagi shakar narxi ishonch bali <strong>+5 ball</strong>ga oshdi!
                </div>
              </div>

              <button
                onClick={() => {
                  onVerified();
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-[#1c2456] dark:bg-[#12a198] text-white font-bold rounded-xl cursor-pointer"
              >
                Chatga qoʻshish va davom etish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
