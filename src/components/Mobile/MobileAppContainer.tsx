import React, { useState } from 'react';
import { MobileTab, MobileTabBar } from './MobileTabBar';
import { MobileMarketTab } from './MobileMarketTab';
import { MobileGroupsTab } from './MobileGroupsTab';
import { MobileDilshodTab } from './MobileDilshodTab';
import { MobilePricingTab } from './MobilePricingTab';
import { ChatWindow } from '../Chat/ChatWindow';
import {
  Wifi,
  Battery,
  Moon,
  Sun,
  ShieldCheck,
  CheckCircle2,
  X,
  Share2,
  MoreVertical,
  Smartphone,
  Monitor,
} from 'lucide-react';

interface MobileAppContainerProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDesktopFrame: boolean;
  onToggleDesktopFrame: () => void;
}

export const MobileAppContainer: React.FC<MobileAppContainerProps> = ({
  theme,
  toggleTheme,
  isDesktopFrame,
  onToggleDesktopFrame,
}) => {
  const [activeTab, setActiveTab] = useState<MobileTab>('chat');
  const [externalSearch, setExternalSearch] = useState<string | null>(null);

  const handleAskInChat = (productName: string) => {
    setExternalSearch(productName);
    setActiveTab('chat');
  };

  const handleJoinGroupFromTab = (district: string) => {
    setExternalSearch('Guruhli buyurtma taklifi');
    setActiveTab('chat');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-0 sm:py-6 bg-[#0c1024]/10 dark:bg-[#070a18] transition-colors">
      {/* Top Floating Controls on Desktop */}
      <div className="hidden sm:flex items-center gap-3 mb-4 select-none">
        <div className="bg-white dark:bg-[#141a38] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={onToggleDesktopFrame}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              isDesktopFrame
                ? 'bg-[#12a198] text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobil ilova koʻrinishi</span>
          </button>
          <button
            onClick={onToggleDesktopFrame}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              !isDesktopFrame
                ? 'bg-[#1c2456] text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Kengaytirilgan veb</span>
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:bg-slate-50 transition-colors cursor-pointer"
          title="Rejimni oʻzgartirish"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>

      {/* Main App Frame */}
      <div
        className={`w-full bg-[#f8fafc] dark:bg-[#0c1024] flex flex-col overflow-hidden transition-all duration-300 relative ${
          isDesktopFrame
            ? 'sm:max-w-[420px] sm:h-[860px] sm:rounded-[44px] sm:border-[8px] sm:border-slate-800 sm:dark:border-slate-700 sm:shadow-2xl sm:ring-1 sm:ring-black/20'
            : 'max-w-4xl h-screen sm:h-[880px] sm:rounded-3xl sm:border border-slate-200 dark:border-slate-800 sm:shadow-xl'
        }`}
      >
        {/* Mobile Phone Speaker & Dynamic Island (visible in desktop mockup) */}
        {isDesktopFrame && (
          <div className="hidden sm:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-50 items-center justify-center">
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-between px-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
            </div>
          </div>
        )}

        {/* Mobile Status Bar (Time, Battery, Wifi) */}
        <div className="px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-slate-200 select-none shrink-0 bg-white/80 dark:bg-[#0c1024]/80 backdrop-blur-xs z-40 border-b border-slate-100 dark:border-slate-800/40">
          <span className="font-mono font-bold tracking-tight">09:41</span>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Telegram Mini App / Mobile App Header */}
        <div className="px-4 py-2.5 bg-white dark:bg-[#141a38] text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 select-none z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1c2456] to-[#12a198] flex items-center justify-center text-white shadow-xs">
              <span className="font-black text-xs text-amber-300">BN</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm tracking-tight">
                  BozorNarx
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#12a198] fill-[#12a198]/20" />
              </div>
              <p className="text-[10px] text-[#12a198] dark:text-teal-300 font-medium leading-none">
                Bozorchi bot • online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors sm:hidden"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
              Demo
            </span>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {/* TAB 1: CHAT */}
          <div
            className={`w-full h-full flex flex-col ${
              activeTab === 'chat' ? 'flex' : 'hidden'
            }`}
          >
            <ChatWindow
              externalSearch={externalSearch}
              onClearExternalSearch={() => setExternalSearch(null)}
            />
          </div>

          {/* TAB 2: MARKET / BOZOR TABLO */}
          {activeTab === 'market' && (
            <MobileMarketTab onAskInChat={handleAskInChat} />
          )}

          {/* TAB 3: GROUPS / GURUHLI XARID */}
          {activeTab === 'groups' && (
            <MobileGroupsTab onJoinGroup={handleJoinGroupFromTab} />
          )}

          {/* TAB 4: DILSHOD / 4 QADAM */}
          {activeTab === 'dilshod' && (
            <MobileDilshodTab onStartChat={() => setActiveTab('chat')} />
          )}

          {/* TAB 5: PRICING / TARIFLAR */}
          {activeTab === 'pricing' && <MobilePricingTab />}
        </div>

        {/* Bottom Tab Bar (5 Mobile Tabs) */}
        <MobileTabBar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      </div>
    </div>
  );
};
