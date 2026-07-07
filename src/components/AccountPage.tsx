import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Star, Bell, Shield, Laptop, 
  HelpCircle, Check, ArrowRight, Download, Globe 
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface AccountPageProps {
  language: string;
}

export default function AccountPage({ language }: AccountPageProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  
  // Custom states for notifications
  const [kickoffAlert, setKickoffAlert] = useState(true);
  const [goalAlert, setGoalAlert] = useState(true);
  const [transferAlert, setTransferAlert] = useState(false);
  const [newsAlert, setNewsAlert] = useState(true);

  // Simulated PWA install state
  const [installed, setInstalled] = useState(false);

  // Curated favorites loaded from static DB state
  const favoriteTeams = [
    { id: '1', name: 'Manchester City FC', crest: 'https://crests.thefootball-data.org/65.png' },
    { id: '2', name: 'Real Madrid CF', crest: 'https://crests.thefootball-data.org/86.png' }
  ];

  const favoritePlayers = [
    { id: '101', name: 'Erling Haaland', position: 'Forward' },
    { id: '202', name: 'Jude Bellingham', position: 'Midfielder' }
  ];

  const handleInstall = () => {
    setInstalled(true);
    setTimeout(() => {
      alert('FutIA App installed successfully onto your workspace!');
    }, 600);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Profile Header */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-600">
            <User className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-black text-white">Guest Supporter</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">MEMBER SINCE JULY 2026</p>
            <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold">
              ★ FUTIA PRO MEMBER
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Favorites & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Saved Favorites Section (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <h3 className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider ml-1">{t.favorites}</h3>
          
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-5">
            {/* Teams */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider mb-1">
                Starred Teams
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {favoriteTeams.map(tm => (
                  <Link
                    key={tm.id}
                    to={`/teams/${tm.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 transition-colors"
                  >
                    <img src={tm.crest} alt={tm.name} className="h-6 w-6 object-contain" />
                    <span className="text-xs font-bold text-zinc-300 truncate">{tm.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Players */}
            <div className="flex flex-col gap-2.5 border-t border-zinc-900/50 pt-4">
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider mb-1">
                Starred Players
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {favoritePlayers.map(pl => (
                  <Link
                    key={pl.id}
                    to={`/players/${pl.id}`}
                    className="flex flex-col p-3 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 transition-colors"
                  >
                    <span className="text-xs font-bold text-zinc-300 truncate">👤 {pl.name}</span>
                    <span className="text-[9px] text-zinc-500 font-mono mt-0.5">{pl.position}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Notifications (5 Cols) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h3 className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider ml-1">{t.notifications}</h3>
          
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
            {[
              { label: 'Match Kickoff Reminders', val: kickoffAlert, set: setKickoffAlert },
              { label: 'Live Goal Alert popups', val: goalAlert, set: setGoalAlert },
              { label: 'Transfer Rumour trackers', val: transferAlert, set: setTransferAlert },
              { label: 'Daily Quiz reminder', val: newsAlert, set: setNewsAlert }
            ].map((cfg, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-zinc-400 font-medium">{cfg.label}</span>
                <button
                  onClick={() => cfg.set(!cfg.val)}
                  className={`h-5 w-9 rounded-full relative transition-colors ${cfg.val ? 'bg-emerald-500' : 'bg-zinc-850'}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-all ${cfg.val ? 'right-0.5' : 'left-0.5'}`}></span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PWA Install Promo Section */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none"></div>

        <div className="flex-1 flex flex-col gap-1.5 text-center sm:text-left relative z-10">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <Download className="h-3.5 w-3.5 animate-bounce" />
            {t.installApp}
          </span>
          <h3 className="text-base sm:text-lg font-black text-white">Install FutIA on Your Home Screen</h3>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-sans">
            Enjoy lightning-fast load speeds, offline scoring access, and instant notification updates about your favorite clubs.
          </p>
        </div>

        <button
          onClick={handleInstall}
          disabled={installed}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-colors shadow-lg shadow-emerald-500/10 relative z-10 disabled:opacity-50"
        >
          {installed ? '✓ INSTALLED' : 'INSTALL NOW'}
        </button>
      </div>

    </div>
  );
}
