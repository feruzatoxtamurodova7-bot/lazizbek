/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MobileAppContainer } from './components/Mobile/MobileAppContainer';
import { Navbar } from './components/Navbar';
import { TickerBar } from './components/TickerBar';
import { ChatWindow } from './components/Chat/ChatWindow';
import { DilshodSteps } from './components/Sections/DilshodSteps';
import { FourPillars } from './components/Sections/FourPillars';
import { PricingSection } from './components/Sections/PricingSection';
import { RoadmapSection } from './components/Sections/RoadmapSection';
import { Footer } from './components/Footer';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // Default to true for mobile app presentation requested by the user ("mobile ilova kurinishida")
  const [isMobileAppView, setIsMobileAppView] = useState<boolean>(true);
  const [externalSearch, setExternalSearch] = useState<string | null>(null);

  // Initialize theme based on preference or system
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleRegisterClick = () => {
    const chatEl = document.getElementById('chat-section');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTickerProduct = (productName: string) => {
    setExternalSearch(productName);
    const chatEl = document.getElementById('chat-section');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Mobile App View is active (Default per user request)
  if (isMobileAppView) {
    return (
      <MobileAppContainer
        theme={theme}
        toggleTheme={toggleTheme}
        isDesktopFrame={true}
        onToggleDesktopFrame={() => setIsMobileAppView(false)}
      />
    );
  }

  // Expanded Classic Web View
  return (
    <div className="min-h-screen flex flex-col bg-[#f3f5fb] dark:bg-[#0c1024] text-[#1c2456] dark:text-[#f0f3fa] transition-colors">
      {/* Top Floating Switcher to return to Mobile App view */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileAppView(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#12a198] text-white text-xs font-bold shadow-xl flex items-center gap-2 hover:opacity-95 transition-all cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          <span>Mobil ilova koʻrinishi</span>
        </button>
      </div>

      {/* Sticky Header Navigation */}
      <Navbar
        onRegisterClick={handleRegisterClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Marquee Ticker Bar (Bugungi tablo) */}
      <TickerBar onSelectProduct={handleSelectTickerProduct} />

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="chat-section" className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Hero Content & 3 Badges */}
              <div className="lg:col-span-5 space-y-6 pt-2 lg:pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12a198]/10 text-[#12a198] text-xs font-bold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#12a198] animate-pulse" />
                  <span>Oʻzbekistonda ilk ulgurji chat-bot</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c2456] dark:text-white tracking-tight leading-[1.15]">
                  Bozor narxi: <br />
                  <span className="text-[#12a198]">bitta chatda</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Toshkent ulgurji bozorlaridagi real narxlar, shaffof taqqoslash va qoʻshni doʻkonlar bilan birlashib arzonroq xarid qilish — barchasi bitta qulay chatda.
                </p>

                {/* 3 Key Badges */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 shadow-xs">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Roʻyxatdan oʻtish chatda
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Hech qanday murakkab forma yoʻq, bot 4–5 savol beradi (~1 daqiqa).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 shadow-xs">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        5 yetkazuvchi bir joyda
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chilonzor, Abu Saxiy, Yangiobod, Sergeli va Qoʻyliq narxlari bir vaqtda.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200/90 dark:border-slate-800 shadow-xs">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Guruhli buyurtma (−3% chegirma)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tumandagi qoʻshnilar bilan birlashib ishlab chiqaruvchi ulgurji narxini oling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Chat Window */}
              <div className="lg:col-span-7 w-full">
                <ChatWindow
                  externalSearch={externalSearch}
                  onClearExternalSearch={() => setExternalSearch(null)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4 STEPS OF DILSHOD */}
        <DilshodSteps />

        {/* FOUR PILLARS (4 ROLES) */}
        <FourPillars />

        {/* PRICING (KIM NIMA UCHUN TOʻLAYDI) */}
        <PricingSection />

        {/* ROADMAP & ARCHITECTURE */}
        <RoadmapSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
