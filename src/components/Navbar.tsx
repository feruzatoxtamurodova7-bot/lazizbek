import React from 'react';
import { Store, Moon, Sun, ArrowRight, MessageSquareQuote } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, theme, toggleTheme }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0c1024]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c2456] to-[#12a198] flex items-center justify-center text-white shadow-sm shadow-[#12a198]/20">
            <Store className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-[#1c2456] dark:text-white">
                Bozor<span className="text-[#12a198]">Narx</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80">
                Toshkent Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Ulgurji bozor narxlari chat-boti
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => scrollTo('qanday-ishlaydi')}
            className="hover:text-[#1c2456] dark:hover:text-white transition-colors cursor-pointer"
          >
            Qanday ishlaydi
          </button>
          <button
            onClick={() => scrollTo('tort-tomon')}
            className="hover:text-[#1c2456] dark:hover:text-white transition-colors cursor-pointer"
          >
            4 ta rol
          </button>
          <button
            onClick={() => scrollTo('narxlar')}
            className="hover:text-[#1c2456] dark:hover:text-white transition-colors cursor-pointer"
          >
            Narxlar
          </button>
          <button
            onClick={() => scrollTo('yol-xaritasi')}
            className="hover:text-[#1c2456] dark:hover:text-white transition-colors cursor-pointer"
          >
            Yoʻl xaritasi
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Theme switch */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            title={theme === 'dark' ? 'Yorugʻ rejim' : 'Qorongʻi rejim'}
            aria-label="Rejimni oʻzgartirish"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Chat / Register CTA */}
          <button
            onClick={onRegisterClick}
            className="px-4 py-2 rounded-xl bg-[#1c2456] dark:bg-[#12a198] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:opacity-95 shadow-md shadow-[#1c2456]/15 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Roʻyxatdan oʻtish</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
