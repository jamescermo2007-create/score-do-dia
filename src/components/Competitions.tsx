import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, TrendingUp, HelpCircle, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface CompetitionsProps {
  language: string;
}

export default function Competitions({ language }: CompetitionsProps) {
  const [selectedLeague, setSelectedLeague] = useState('PL'); // default Premier League
  const [standings, setStandings] = useState<any[]>([]);
  const [scorers, setScorers] = useState<any[]>([]);
  const [assists, setAssists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const leagues = [
    { code: 'PL', name: 'Premier League', logo: 'https://crests.thefootball-data.org/PL.png' },
    { code: 'PD', name: 'La Liga', logo: 'https://crests.thefootball-data.org/PD.png' },
    { code: 'SA', name: 'Serie A', logo: 'https://crests.thefootball-data.org/SA.png' },
    { code: 'BL1', name: 'Bundesliga', logo: 'https://crests.thefootball-data.org/BL1.png' },
    { code: 'FL1', name: 'Ligue 1', logo: 'https://crests.thefootball-data.org/FL1.png' }
  ];

  useEffect(() => {
    async function fetchLeagueDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/football?action=league&id=${selectedLeague}`);
        const data = await response.json();
        if (data.success) {
          setStandings(data.standings || []);
          setScorers(data.topScorers || []);
          setAssists(data.topAssists || []);
        }
      } catch (err) {
        console.error('Failed to fetch league data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeagueDetails();
  }, [selectedLeague]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Visual Header Banner */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-full max-w-lg rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{t.competitions}</h1>
              <p className="text-zinc-500 text-xs mt-0.5">Explore standings, scorers, and historical database lists.</p>
            </div>
          </div>

          {/* League selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {leagues.map((lg) => (
              <button
                key={lg.code}
                onClick={() => setSelectedLeague(lg.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  selectedLeague === lg.code 
                    ? 'bg-zinc-900 border-zinc-800 text-white' 
                    : 'border-transparent text-zinc-500 hover:text-white'
                }`}
              >
                <img src={lg.logo} alt={lg.name} className="h-4 w-4 object-contain" />
                <span>{lg.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-zinc-500 text-sm">Synchronizing Table Rosters...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* League Table Standings (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider ml-1">Standings Table</h3>
            
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-900/40 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 text-center">Pos</th>
                      <th className="py-3 px-3">Club</th>
                      <th className="py-3 px-2 text-center">PL</th>
                      <th className="py-3 px-2 text-center">W</th>
                      <th className="py-3 px-2 text-center">D</th>
                      <th className="py-3 px-2 text-center">L</th>
                      <th className="py-3 px-2 text-center">GD</th>
                      <th className="py-3 px-4 text-center">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((row) => (
                      <tr key={row.team.id} className="border-b border-zinc-900/45 hover:bg-zinc-900/20 transition-colors">
                        <td className="py-3 px-4 text-center font-mono font-bold text-zinc-400">
                          {row.position}
                        </td>
                        <td className="py-3 px-3">
                          <Link to={`/teams/${row.team.id}`} className="flex items-center gap-2.5 font-bold text-zinc-200 hover:text-emerald-400 transition-colors truncate max-w-[150px] sm:max-w-none">
                            <img src={row.team.crest} alt={row.team.name} className="h-5 w-5 object-contain" />
                            <span>{row.team.shortName}</span>
                          </Link>
                        </td>
                        <td className="py-3 px-2 text-center text-zinc-400 font-mono">{row.playedGames}</td>
                        <td className="py-3 px-2 text-center text-zinc-400 font-mono">{row.won}</td>
                        <td className="py-3 px-2 text-center text-zinc-400 font-mono">{row.draw}</td>
                        <td className="py-3 px-2 text-center text-zinc-400 font-mono">{row.lost}</td>
                        <td className="py-3 px-2 text-center text-zinc-400 font-mono">{row.goalDifference}</td>
                        <td className="py-3 px-4 text-center font-mono font-extrabold text-emerald-400">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stats Sidebars (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Scorers */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2.5">
                <Award className="h-4.5 w-4.5 text-emerald-400" />
                <h3 className="text-xs uppercase font-extrabold text-zinc-400">{t.topScorers}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {scorers.slice(0, 5).map((scorer, index) => (
                  <div key={index} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-zinc-600 font-bold">{index + 1}</span>
                      <Link to={`/players/${scorer.player.id}`} className="font-bold text-zinc-200 hover:text-emerald-400 transition-colors">
                        {scorer.player.name}
                      </Link>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{scorer.goals} Goals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Assists */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2.5">
                <Award className="h-4.5 w-4.5 text-emerald-400" />
                <h3 className="text-xs uppercase font-extrabold text-zinc-400">{t.topAssists}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {assists.slice(0, 5).map((assist, index) => (
                  <div key={index} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-zinc-600 font-bold">{index + 1}</span>
                      <Link to={`/players/${assist.player.id}`} className="font-bold text-zinc-200 hover:text-emerald-400 transition-colors">
                        {assist.player.name}
                      </Link>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{assist.assists} Assists</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
