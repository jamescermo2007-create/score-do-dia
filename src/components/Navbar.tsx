import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bot, Tv, Newspaper, Trophy, ArrowLeftRight, HelpCircle, 
  User, Search, Globe, Moon, Sun, Bell, Settings 
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  onOpenSearch: () => void;
  favoritesCount: number;
}

export default function Navbar({ 
  language, 
  setLanguage, 
  theme, 
  setTheme, 
  onOpenSearch,
  favoritesCount
}: NavbarProps) {
  const location = useLocation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { path: '/', label: t.live, icon: Tv },
    { path: '/news', label: t.news, icon: Newspaper },
    { path: '/competitions', label: t.competitions, icon: Trophy },
    { path: '/transfers', label: t.transfers, icon: ArrowLeftRight },
    { path: '/assistant', label: t.assistant, icon: Bot },
    { path: '/quiz', label: t.quiz, icon: HelpCircle },
    { path: '/account', label: t.account, icon: User }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'ar', label: 'العربية' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' }
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || 'English';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20 group-hover:bg-emerald-400 transition-colors">
              F
              <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-emerald-300"></span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-extrabold tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                {t.logo}
              </span>
              <span className="block text-[10px] text-emerald-500 font-mono tracking-widest leading-none">
                AI PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl border border-zinc-800/40 transition-colors"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl border border-zinc-800/40 transition-colors text-xs sm:text-sm font-medium"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden md:inline">{currentLangLabel}</span>
              </button>
              
              {showLangDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowLangDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-950 p-1 shadow-xl z-20 max-h-80 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                          language === lang.code 
                            ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl border border-zinc-800/40 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notification Dot indicator */}
            <Link
              to="/account"
              className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl border border-zinc-800/40 transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </Link>

            {/* Favorites Count indicator */}
            {favoritesCount > 0 && (
              <Link 
                to="/account" 
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
              >
                <span>★</span>
                <span>{favoritesCount}</span>
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Sticky Tab bar */}
      <div className="lg:hidden border-t border-zinc-800/80 bg-zinc-950/95 fixed bottom-0 left-0 right-0 z-50 flex justify-around py-2">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
        <Link
          to="/account"
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            location.pathname === '/account' ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[9px] font-medium leading-none">{t.account}</span>
        </Link>
      </div>
    </nav>
  );
}
