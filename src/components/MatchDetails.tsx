import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Shield, Calendar, MapPin, UserCheck, Users, 
  BarChart3, ListOrdered, ClipboardList, Bot, AlertTriangle, Play 
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';
import { Match } from '../types';

interface MatchDetailsProps {
  language: string;
}

export default function MatchDetails({ language }: MatchDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'lineups' | 'stats' | 'h2h' | 'ai'>('timeline');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ type: 'summary' | 'prediction' | null; text: string | null }>({ type: null, text: null });
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    async function fetchMatchDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/football?action=match&id=${id}`);
        const data = await response.json();
        if (data.success) {
          setMatch(data.match);
        }
      } catch (err) {
        console.error('Failed to fetch match details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchMatchDetails();
      // Reset AI
      setAiResult({ type: null, text: null });
    }
  }, [id]);

  const generateAiInsight = async (type: 'summary' | 'prediction') => {
    if (!match) return;
    setAiLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: '',
          context: {
            type,
            matchData: match
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiResult({ type, text: data.text });
      }
    } catch (err) {
      console.error('Failed to generate AI insight:', err);
      setAiResult({ type, text: 'Failed to generate insight. Please verify your internet connection and try again.' });
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
        <p className="mt-4 text-zinc-500 text-sm">Loading Match Details...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Match Not Found</h2>
        <p className="text-zinc-500 text-sm mb-6">The match details you requested could not be retrieved. It may have been archived.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 text-sm font-semibold transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Visual Header Scoreboard */}
      <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 sm:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none"></div>

        {/* Competition Banner */}
        <div className="flex justify-between items-center border-b border-zinc-800/50 pb-4 mb-6">
          <span className="text-xs font-bold text-zinc-400 font-mono tracking-wider flex items-center gap-1.5">
            🏆 {match.competition.name}
          </span>
          <div className="flex items-center gap-1.5">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-mono font-bold uppercase animate-pulse">
                LIVE • {match.minute}&apos;
              </span>
            ) : isFinished ? (
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono font-bold uppercase">
                FINISHED
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold uppercase">
                UPCOMING
              </span>
            )}
          </div>
        </div>

        {/* Scoreboard Block */}
        <div className="grid grid-cols-12 items-center text-center py-4">
          
          {/* Home Team */}
          <Link to={`/teams/${match.homeTeam.id}`} className="col-span-4 flex flex-col items-center gap-4 group">
            <img 
              src={match.homeTeam.crest} 
              alt={match.homeTeam.name} 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
              {match.homeTeam.shortName}
            </span>
          </Link>

          {/* Scores/Status block */}
          <div className="col-span-4 flex flex-col items-center">
            {isScheduled ? (
              <div className="flex flex-col items-center">
                <span className="text-zinc-500 text-xs font-mono mb-1">
                  {new Date(match.utcDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  {new Date(match.utcDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-zinc-600 text-[10px] mt-1.5 font-mono uppercase">Kickoff</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tighter">
                    {match.score.fullTime.home}
                  </span>
                  <span className="text-zinc-700 font-extrabold font-mono text-2xl sm:text-3xl">:</span>
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tighter">
                    {match.score.fullTime.away}
                  </span>
                </div>
                {match.score.halfTime.home !== null && (
                  <span className="mt-2 text-[10px] text-zinc-500 font-mono tracking-wider">
                    HT ({match.score.halfTime.home} - {match.score.halfTime.away})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Away Team */}
          <Link to={`/teams/${match.awayTeam.id}`} className="col-span-4 flex flex-col items-center gap-4 group">
            <img 
              src={match.awayTeam.crest} 
              alt={match.awayTeam.name} 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
              {match.awayTeam.shortName}
            </span>
          </Link>

        </div>

        {/* Stadium details */}
        <div className="mt-6 pt-5 border-t border-zinc-800/40 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-zinc-500">
          <span className="flex items-center justify-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-zinc-600" />
            Stadium: **{match.homeTeam.venue || 'N/A'}**
          </span>
          <span className="flex items-center justify-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-zinc-600" />
            Referee: **{match.status === 'IN_PLAY' || match.status === 'LIVE' || isFinished ? 'P. Collina (AI)' : 'TBD'}**
          </span>
          <span className="flex items-center justify-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-zinc-600" />
            Attendance: **{isFinished ? '62,500' : isLive ? '58,400' : 'Expected: 60,000+'}**
          </span>
        </div>

      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-900 p-0.5 rounded-xl bg-zinc-950/60 max-w-full overflow-x-auto gap-1">
        {[
          { id: 'timeline', label: t.timeline, icon: ClipboardList },
          { id: 'lineups', label: t.formations, icon: Users },
          { id: 'stats', label: t.statistics, icon: BarChart3 },
          { id: 'h2h', label: t.headToHead, icon: ListOrdered },
          { id: 'ai', label: 'AI Coach Insights', icon: Bot }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-zinc-900 text-white border-b border-emerald-500 shadow-md' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex flex-col gap-6">
        
        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5">
            {isScheduled ? (
              <div className="text-center py-10 text-zinc-500 text-sm">
                No timeline available. Match has not kicked off.
              </div>
            ) : match.timeline && match.timeline.length > 0 ? (
              <div className="relative pl-6 border-l border-zinc-800 flex flex-col gap-8 py-3">
                {match.timeline.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Event Dot */}
                    <div className="absolute -left-[31px] top-1 h-4.5 w-4.5 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center font-mono text-[9px] font-bold text-zinc-400 group-hover:border-emerald-500 transition-colors">
                      {evt.minute}
                    </div>
                    {/* Event Description */}
                    <div>
                      <span className="font-mono text-emerald-500 font-extrabold text-[10px] mr-2">
                        {evt.type}
                      </span>
                      <p className="text-zinc-300 text-xs sm:text-sm font-medium mt-0.5">
                        {evt.description}
                      </p>
                      {evt.playerName && (
                        <span className="block text-[11px] text-zinc-500 mt-0.5 font-medium">
                          👤 {evt.playerName} {evt.detail ? `(${evt.detail})` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-zinc-500 text-sm">
                Match timeline is being calculated.
              </div>
            )}
          </div>
        )}

        {/* Lineups Tab */}
        {activeTab === 'lineups' && (
          <div className="flex flex-col gap-6">
            {match.lineups ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Home Lineup */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-bold text-emerald-400">{match.homeTeam.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono font-bold text-zinc-400">
                      {match.lineups.home.formation}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider mb-1">
                      Starting XI
                    </span>
                    {match.lineups.home.startingXI.map(player => (
                      <Link 
                        key={player.id} 
                        to={`/players/${player.id}`}
                        className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg hover:bg-zinc-900/80 transition-colors"
                      >
                        <span className="text-zinc-300 font-medium">
                          <span className="font-mono text-zinc-500 mr-2.5">{player.shirtNumber}</span>
                          {player.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">{player.position}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Bench */}
                  {match.lineups.home.bench && match.lineups.home.bench.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4 border-t border-zinc-800/50 pt-4">
                      <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider mb-1">
                        {t.bench}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {match.lineups.home.bench.map(player => (
                          <Link 
                            key={player.id} 
                            to={`/players/${player.id}`}
                            className="text-zinc-400 py-1 hover:text-emerald-400 transition-colors truncate"
                          >
                            <span className="font-mono text-zinc-600 mr-1.5">{player.shirtNumber}</span>
                            {player.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Away Lineup */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-bold text-emerald-400">{match.awayTeam.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono font-bold text-zinc-400">
                      {match.lineups.away.formation}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider mb-1">
                      Starting XI
                    </span>
                    {match.lineups.away.startingXI.map(player => (
                      <Link 
                        key={player.id} 
                        to={`/players/${player.id}`}
                        className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg hover:bg-zinc-900/80 transition-colors"
                      >
                        <span className="text-zinc-300 font-medium">
                          <span className="font-mono text-zinc-500 mr-2.5">{player.shirtNumber}</span>
                          {player.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">{player.position}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Bench */}
                  {match.lineups.away.bench && match.lineups.away.bench.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4 border-t border-zinc-800/50 pt-4">
                      <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider mb-1">
                        {t.bench}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {match.lineups.away.bench.map(player => (
                          <Link 
                            key={player.id} 
                            to={`/players/${player.id}`}
                            className="text-zinc-400 py-1 hover:text-emerald-400 transition-colors truncate"
                          >
                            <span className="font-mono text-zinc-600 mr-1.5">{player.shirtNumber}</span>
                            {player.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-10 rounded-2xl border border-zinc-900 bg-zinc-900/15 text-zinc-500 text-sm">
                Starting XI and squads are updated 1 hour before kickoff.
              </div>
            )}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-6 flex flex-col gap-5">
            {isScheduled ? (
              <div className="text-center py-10 text-zinc-500 text-sm">
                Stats comparison are available once the match begins.
              </div>
            ) : match.stats ? (
              <div className="flex flex-col gap-5">
                {[
                  { label: t.possession, home: match.stats.possession.home, away: match.stats.possession.away, suffix: '%' },
                  { label: t.shots, home: match.stats.shots.home, away: match.stats.shots.away },
                  { label: 'Shots on Target', home: match.stats.shotsOnTarget.home, away: match.stats.shotsOnTarget.away },
                  { label: t.corners, home: match.stats.corners.home, away: match.stats.corners.away },
                  { label: t.fouls, home: match.stats.fouls.home, away: match.stats.fouls.away },
                  { label: t.offside, home: match.stats.offside.home, away: match.stats.offside.away },
                  { label: 'Expected Goals (xG)', home: match.stats.expectedGoals?.home || 0, away: match.stats.expectedGoals?.away || 0 }
                ].map((stat, idx) => {
                  const total = stat.home + stat.away || 1;
                  const homePercent = Math.round((stat.home / total) * 100);
                  const awayPercent = Math.round((stat.away / total) * 100);

                  return (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold px-1">
                        <span className="font-mono text-base font-bold text-zinc-200">
                          {stat.home}{stat.suffix || ''}
                        </span>
                        <span className="text-[10px] uppercase text-zinc-500 font-bold font-sans">
                          {stat.label}
                        </span>
                        <span className="font-mono text-base font-bold text-zinc-200">
                          {stat.away}{stat.suffix || ''}
                        </span>
                      </div>
                      
                      {/* Meter bar */}
                      <div className="h-2 w-full bg-zinc-950 rounded-full flex overflow-hidden">
                        <div 
                          className="bg-emerald-500 transition-all duration-500" 
                          style={{ width: `${homePercent}%` }}
                        ></div>
                        <div 
                          className="bg-zinc-800 transition-all duration-500" 
                          style={{ width: `${100 - homePercent - awayPercent}%` }}
                        ></div>
                        <div 
                          className="bg-emerald-400/60 transition-all duration-500" 
                          style={{ width: `${awayPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-zinc-500 text-sm">
                Stats calculations are currently calculating.
              </div>
            )}
          </div>
        )}

        {/* H2H Tab */}
        {activeTab === 'h2h' && (
          <div className="flex flex-col gap-6">
            
            {/* H2H Meter */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 text-center flex flex-col gap-4">
              <h3 className="text-xs uppercase text-zinc-500 font-bold">Historical Record (Past 10 Matchups)</h3>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-zinc-300">4</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{match.homeTeam.shortName} Wins</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-zinc-500">3</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">Draws</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold font-mono text-zinc-300">3</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{match.awayTeam.shortName} Wins</span>
                </div>
              </div>
            </div>

            {/* Recent Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5">
                <span className="block text-xs uppercase text-zinc-500 font-bold mb-3">{match.homeTeam.shortName} Recent Form</span>
                <div className="flex gap-2.5">
                  {['W', 'W', 'W', 'D', 'W'].map((f, idx) => (
                    <span 
                      key={idx} 
                      className={`h-7 w-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                        f === 'W' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5">
                <span className="block text-xs uppercase text-zinc-500 font-bold mb-3">{match.awayTeam.shortName} Recent Form</span>
                <div className="flex gap-2.5">
                  {['W', 'L', 'D', 'W', 'W'].map((f, idx) => (
                    <span 
                      key={idx} 
                      className={`h-7 w-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                        f === 'W' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : f === 'L' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* AI COACH INSIGHTS Tab */}
        {activeTab === 'ai' && (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/10">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">FutIA Football Advisor</h3>
                  <span className="block text-[10px] text-zinc-500 font-mono">POWERED BY GEMINI AI</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Consult FutIA&apos;s football analytics algorithms to draft live tactically structured match overviews or predict big-match win percentages, scoreline margins, and core player battles.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => generateAiInsight('summary')}
                  disabled={aiLoading}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>{t.summary}</span>
                </button>
                <button
                  onClick={() => generateAiInsight('prediction')}
                  disabled={aiLoading}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-emerald-400 font-bold text-xs hover:text-white transition-all disabled:opacity-50"
                >
                  <Bot className="h-4 w-4" />
                  <span>{t.predict}</span>
                </button>
              </div>

              {/* AI result visualization */}
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-solid border-emerald-500 border-r-transparent"></div>
                  <span className="text-[11px] font-mono text-zinc-500 mt-3">CONSULTING FUTIA ADVANCED MODELS...</span>
                </div>
              ) : aiResult.text ? (
                <div className="rounded-xl border border-zinc-850 bg-zinc-950/80 p-5 font-sans leading-relaxed text-zinc-300 text-xs sm:text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {aiResult.text}
                </div>
              ) : null}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
