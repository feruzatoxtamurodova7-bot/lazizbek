import React from 'react';
import { MessageSquare, TrendingUp, Users, Sparkles, CreditCard } from 'lucide-react';

export type MobileTab = 'chat' | 'market' | 'groups' | 'dilshod' | 'pricing';

interface MobileTabBarProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  unreadCount?: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  onChangeTab,
  unreadCount = 0,
}) => {
  const tabs = [
    {
      id: 'chat' as MobileTab,
      label: 'Chat',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      id: 'market' as MobileTab,
      label: 'Bozor',
      icon: TrendingUp,
    },
    {
      id: 'groups' as MobileTab,
      label: 'Guruhlar',
      icon: Users,
      badge: '−3%',
    },
    {
      id: 'dilshod' as MobileTab,
      label: '4 Qadam',
      icon: Sparkles,
    },
    {
      id: 'pricing' as MobileTab,
      label: 'Tariflar',
      icon: CreditCard,
    },
  ];

  return (
    <nav className="shrink-0 bg-white/95 dark:bg-[#141a38]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around z-30 select-none pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all relative cursor-pointer ${
              isActive
                ? 'text-[#12a198] dark:text-[#19b5ab]'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'
                }`}
              />
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2.5 px-1 min-w-[14px] h-3.5 flex items-center justify-center text-[9px] font-extrabold font-mono rounded-full bg-amber-500 text-white shadow-2xs">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-tight ${
                isActive ? 'font-extrabold text-[#12a198]' : 'font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
