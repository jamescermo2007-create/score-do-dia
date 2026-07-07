import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bot, Zap, Trophy, Shield } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface HeroProps {
  language: string;
  onOpenSearch: () => void;
  featuredMatch: any;
}

export default function Hero({ language, onOpenSearch, featuredMatch }: HeroProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="relative overflow-hidden bg-zinc-950 py-12 sm:py-16 border-b border-zinc-900">
      
      {/* Visual Pitch Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-full max-w-7xl rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Branding / Prompt */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide">
              <Zap className="h-3 w-3 animate-pulse" />
              <span>Next-Generation AI Football Analytics</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              The Pitch, Reimagined <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500">
                With Deep Intelligence
              </span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Get real-time live scores, tactical line-ups, and transfer reports. 
              Consult our advanced **FutIA Assistant** for expert match analysis and tactical breakdowns.
            </p>

            {/* Quick Actions Search Bar */}
            <div className="mt-2 max-w-md mx-auto lg:mx-0 w-full">
              <div 
                onClick={onOpenSearch}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300 transition-all cursor-pointer shadow-lg"
              >
                <Search className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-left flex-1">{t.searchPlaceholder}</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[10px] font-mono text-zinc-500">
                  ⌘K
                </kbd>
              </div>

              {/* Trending Searches */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-zinc-500">
                <span className="font-medium">Trending:</span>
                {['Erling Haaland', 'El Clásico', 'Man City', 'Premier League'].map((term) => (
                  <button
                    key={term}
                    onClick={onOpenSearch}
                    className="px-2 py-1 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Match Card (Right Column) */}
          <div className="lg:col-span-5 w-full">
            {featuredMatch ? (
              <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/35 backdrop-blur-md p-6 overflow-hidden shadow-2xl shadow-emerald-950/20">
                {/* Background pitch texture lines */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>

                <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    ★ {t.featuredMatch}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wide">
                      LIVE • {featuredMatch.minute}&apos;
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center text-center py-2">
                  {/* Home Team */}
                  <Link to={`/teams/${featuredMatch.homeTeam.id}`} className="flex flex-col items-center gap-3 group">
                    <img 
                      src={featuredMatch.homeTeam.crest} 
                      alt={featuredMatch.homeTeam.name} 
                      className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {featuredMatch.homeTeam.shortName}
                    </span>
                  </Link>

                  {/* Score */}
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-zinc-500 font-mono tracking-widest leading-none mb-1">
                      {featuredMatch.competition.name}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl font-extrabold font-mono text-white">
                        {featuredMatch.score.fullTime.home}
                      </span>
                      <span className="text-zinc-600 font-extrabold font-mono text-xl">:</span>
                      <span className="text-3xl font-extrabold font-mono text-white">
                        {featuredMatch.score.fullTime.away}
                      </span>
                    </div>
                    <span className="mt-2.5 px-2 py-0.5 rounded-lg bg-zinc-800/50 text-[10px] text-zinc-400 font-mono">
                      Group A
                    </span>
                  </div>

                  {/* Away Team */}
                  <Link to={`/teams/${featuredMatch.awayTeam.id}`} className="flex flex-col items-center gap-3 group">
                    <img 
                      src={featuredMatch.awayTeam.crest} 
                      alt={featuredMatch.awayTeam.name} 
                      className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-300" 
                    />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {featuredMatch.awayTeam.shortName}
                    </span>
                  </Link>
                </div>

                {/* Match Goal Events Scroller */}
                {featuredMatch.events && featuredMatch.events.goals && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/40 text-[11px] text-zinc-400 flex flex-col gap-1.5 font-sans">
                    {featuredMatch.events.goals.slice(0, 2).map((g: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium text-zinc-300">⚽ {g.player.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono font-semibold">{g.minute}&apos; ({g.team.id === featuredMatch.homeTeam.id ? 'H' : 'A'})</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <Link 
                    to={`/matches/${featuredMatch.id}`} 
                    className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
                  >
                    <span>Match Center</span>
                  </Link>
                  <Link 
                    to="/assistant" 
                    className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-emerald-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-colors active:scale-95"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    <span>Analyze Match</span>
                  </Link>
                </div>
              </div>
            ) : (
              // Backup visual skeleton
              <div className="h-60 rounded-3xl border border-zinc-800 bg-zinc-900/20 animate-pulse"></div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
