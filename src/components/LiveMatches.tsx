import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tv, Play, Calendar, Share2, Link2, Check, ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';
import { Match } from '../types';

interface LiveMatchesProps {
  language: string;
  matches: Match[];
  loading: boolean;
  onShare: (match: Match) => void;
}

export default function LiveMatches({ language, matches, loading, onShare }: LiveMatchesProps) {
  const [filter, setFilter] = useState<'all' | 'live'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleCopyLink = (e: React.MouseEvent, matchId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const link = `${window.location.origin}/matches/${matchId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(matchId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredMatches = matches.filter(m => {
    if (filter === 'live') {
      return m.status === 'LIVE' || m.status === 'IN_PLAY';
    }
    return true;
  });

  // Group matches by competition name
  const groupedMatches: Record<string, { logo: string; list: Match[] }> = {};
  filteredMatches.forEach(m => {
    const compName = m.competition.name;
    if (!groupedMatches[compName]) {
      let logo = 'https://crests.thefootball-data.org/PL.png'; // default
      if (m.competition.code === 'CL') logo = 'https://crests.thefootball-data.org/CL.png';
      if (m.competition.code === 'PD') logo = 'https://crests.thefootball-data.org/PD.png';
      if (m.competition.code === 'SA') logo = 'https://crests.thefootball-data.org/SA.png';
      groupedMatches[compName] = { logo, list: [] };
    }
    groupedMatches[compName].list.push(m);
  });

  return (
    <div className="flex flex-col gap-6">
      
      {/* Filters Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
              filter === 'all'
                ? 'bg-zinc-900 border-zinc-800 text-white'
                : 'border-transparent text-zinc-500 hover:text-white'
            }`}
          >
            {t.todaysMatches} ({matches.length})
          </button>
          <button
            onClick={() => setFilter('live')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              filter === 'live'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'border-transparent text-zinc-500 hover:text-red-400'
            }`}
          >
            <span className={`h-2 w-2 rounded-full bg-red-500 ${filter === 'live' ? 'animate-pulse' : ''}`}></span>
            {t.live} ({matches.filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY').length})
          </button>
        </div>

        {/* Dynamic Sync state */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
          <span className="relative flex h-1.5 w-1.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>AUTO-REFRESHING LIVE</span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2].map(i => (
            <div key={i} className="rounded-3xl border border-zinc-900 bg-zinc-900/10 p-5 animate-pulse">
              <div className="h-4 w-32 bg-zinc-800 rounded mb-4"></div>
              <div className="h-16 bg-zinc-800/60 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : Object.keys(groupedMatches).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-800 rounded-3xl p-6 bg-zinc-900/10">
          <Calendar className="h-12 w-12 text-zinc-600 mb-3" />
          <h3 className="text-zinc-300 font-bold mb-1">No Active Match Feeds Found</h3>
          <p className="text-zinc-500 text-xs max-w-sm">
            There are no football matches matching your selected filter. Check back shortly for major matches and lineups!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(groupedMatches).map(([compName, compData]) => (
            <div key={compName} className="flex flex-col gap-3">
              
              {/* Competition Header */}
              <div className="flex items-center gap-2.5 px-1">
                <img src={compData.logo} alt={compName} className="h-5 w-5 object-contain" />
                <h3 className="text-xs sm:text-sm font-bold text-zinc-300 uppercase tracking-wide">{compName}</h3>
              </div>

              {/* Matches List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compData.list.map(match => {
                  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
                  const isFinished = match.status === 'FINISHED';
                  const isScheduled = match.status === 'SCHEDULED';

                  return (
                    <Link
                      key={match.id}
                      to={`/matches/${match.id}`}
                      className="relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/25 hover:bg-zinc-900/50 p-5 transition-all group overflow-hidden"
                    >
                      {/* Live background glow indicator */}
                      {isLive && (
                        <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-red-500/5 to-transparent pointer-events-none rounded-tr-2xl"></div>
                      )}

                      {/* Header (Status / Actions) */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 text-[10px] font-mono font-bold tracking-wide uppercase">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                              LIVE • {match.minute}&apos;
                            </span>
                          ) : isFinished ? (
                            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-500 text-[10px] font-mono font-semibold">
                              FINISHED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                              {new Date(match.utcDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>

                        {/* Fast Copy/Share actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleCopyLink(e, match.id)}
                            className="p-1.5 rounded-lg hover:bg-zinc-800/80 text-zinc-500 hover:text-white transition-colors"
                            title="Copy Match Link"
                          >
                            {copiedId === match.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onShare(match);
                            }}
                            className="p-1.5 rounded-lg hover:bg-zinc-800/80 text-zinc-500 hover:text-white transition-colors"
                            title="Share Match"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Scoreboard block */}
                      <div className="grid grid-cols-12 items-center gap-3 my-1">
                        
                        {/* Team Details */}
                        <div className="col-span-10 flex flex-col gap-2.5">
                          <div className="flex items-center gap-3">
                            <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="h-6 w-6 object-contain" />
                            <span className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                              {match.homeTeam.shortName}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="h-6 w-6 object-contain" />
                            <span className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                              {match.awayTeam.shortName}
                            </span>
                          </div>
                        </div>

                        {/* Scores */}
                        <div className="col-span-2 flex flex-col justify-center items-end font-mono text-base font-extrabold pr-1">
                          {!isScheduled ? (
                            <>
                              <span className="text-zinc-200">{match.score.fullTime.home}</span>
                              <span className="text-zinc-200 mt-2.5">{match.score.fullTime.away}</span>
                            </>
                          ) : (
                            <span className="text-zinc-600">-</span>
                          )}
                        </div>

                      </div>

                      {/* Footer Info line */}
                      {!isScheduled && match.events?.goals && (
                        <div className="mt-3 pt-3 border-t border-zinc-800/30 text-[10px] text-zinc-500 truncate">
                          ⚽ {match.events.goals.map(g => g.player.name).join(', ')}
                        </div>
                      )}

                    </Link>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
