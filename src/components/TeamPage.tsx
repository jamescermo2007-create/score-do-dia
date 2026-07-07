import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Shield, Calendar, Landmark, Info, ClipboardList, 
  User, ArrowLeftRight, Image as ImageIcon, AlertTriangle 
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface TeamPageProps {
  language: string;
}

export default function TeamPage({ language }: TeamPageProps) {
  const { id } = useParams<{ id: string }>();
  const [teamData, setTeamData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'squad' | 'fixtures' | 'stats' | 'gallery'>('squad');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    async function fetchTeamDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/football?action=team&id=${id}`);
        const data = await response.json();
        if (data.success) {
          setTeamData(data);
        }
      } catch (err) {
        console.error('Failed to fetch team details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchTeamDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
        <p className="mt-4 text-zinc-500 text-sm">Loading Team Details...</p>
      </div>
    );
  }

  if (!teamData || !teamData.team) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Team Not Found</h2>
        <p className="text-zinc-500 text-sm mb-6">The requested team profile could not be loaded. Please select another team from our league rosters.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 text-sm font-semibold transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const { team, squad, upcoming, recent } = teamData;

  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  // Gallery stock photos curated using sports concepts
  const galleryPhotos = [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400&auto=format&fit=crop'
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Club Profile Header */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img src={team.crest} alt={team.name} className="h-20 w-20 sm:h-24 sm:w-24 object-contain" />
          <div className="flex-1 flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{team.name}</h1>
            <p className="text-xs text-emerald-400 font-bold tracking-widest uppercase font-mono">{team.clubColors || 'Professional Football'}</p>
            
            {/* Club facts */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-xs text-zinc-400 font-sans max-w-md">
              <span>🏟️ {t.stadium}: <strong className="text-zinc-200">{team.venue || 'N/A'}</strong></span>
              <span>📋 {t.coach}: <strong className="text-zinc-200">{team.coach || 'N/A'}</strong></span>
              <span>📅 {t.founded}: <strong className="text-zinc-200">{team.founded || 'N/A'}</strong></span>
              <span>🌍 {t.country}: <strong className="text-zinc-200">{team.country || 'International'}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-900 p-0.5 rounded-xl bg-zinc-950/60 max-w-full overflow-x-auto gap-1">
        {[
          { id: 'squad', label: t.squad, icon: User },
          { id: 'fixtures', label: t.fixtures, icon: Calendar },
          { id: 'stats', label: 'Stats & Transfers', icon: ArrowLeftRight },
          { id: 'gallery', label: 'Gallery', icon: ImageIcon }
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
        
        {/* Squad Tab */}
        {activeTab === 'squad' && (
          <div className="flex flex-col gap-6">
            {squad && squad.length > 0 ? (
              positions.map(pos => {
                const posPlayers = squad.filter((p: any) => p.position.includes(pos) || (pos === 'Goalkeeper' && p.position === 'GK'));
                if (posPlayers.length === 0) return null;
                return (
                  <div key={pos} className="flex flex-col gap-2.5">
                    <h3 className="text-xs font-extrabold uppercase text-emerald-400 font-mono tracking-wider ml-1">
                      {pos}s ({posPlayers.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {posPlayers.map((player: any) => (
                        <Link
                          key={player.id}
                          to={`/players/${player.id}`}
                          className="flex items-center justify-between rounded-xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/50 p-3.5 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-7 w-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-zinc-400 group-hover:text-emerald-400 transition-colors">
                              {player.shirtNumber}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                              {player.name}
                            </span>
                          </div>
                          {player.stats && player.stats.goals > 0 && (
                            <span className="text-[10px] font-mono text-emerald-500 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
                              ⚽ {player.stats.goals} G
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 rounded-2xl border border-zinc-900 bg-zinc-900/15 text-zinc-500 text-sm">
                No squad lists registered. Check again soon for roster confirmations!
              </div>
            )}
          </div>
        )}

        {/* Fixtures Tab */}
        {activeTab === 'fixtures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming fixtures */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-extrabold uppercase text-zinc-500 ml-1">Upcoming Fixtures</h3>
              {upcoming && upcoming.length > 0 ? (
                upcoming.map((m: any) => (
                  <Link
                    key={m.id}
                    to={`/matches/${m.id}`}
                    className="flex flex-col rounded-xl border border-zinc-900 bg-zinc-900/15 hover:bg-zinc-900/30 p-4 transition-all"
                  >
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mb-2">
                      <span>{m.competition.name}</span>
                      <span>{new Date(m.utcDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span>{m.homeTeam.shortName} vs {m.awayTeam.shortName}</span>
                      <span className="font-mono text-emerald-400">{new Date(m.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs">
                  No upcoming fixtures scheduled.
                </div>
              )}
            </div>

            {/* Recent fixtures */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-extrabold uppercase text-zinc-500 ml-1">Recent Match Results</h3>
              {recent && recent.length > 0 ? (
                recent.map((m: any) => (
                  <Link
                    key={m.id}
                    to={`/matches/${m.id}`}
                    className="flex flex-col rounded-xl border border-zinc-900 bg-zinc-900/15 hover:bg-zinc-900/30 p-4 transition-all"
                  >
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mb-2">
                      <span>{m.competition.name}</span>
                      <span>FINISHED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span>{m.homeTeam.shortName} vs {m.awayTeam.shortName}</span>
                      <span className="font-mono text-white bg-zinc-900 px-1.5 py-0.5 rounded">
                        {m.score.fullTime.home} - {m.score.fullTime.away}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-xs">
                  No recent matches registered.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Stats & Transfers Tab */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Players */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
              <h3 className="text-xs uppercase text-zinc-500 font-bold border-b border-zinc-800 pb-2">Key Club Stars</h3>
              {squad && squad.length > 0 ? (
                squad.slice(0, 4).map((p: any) => (
                  <Link 
                    key={p.id} 
                    to={`/players/${p.id}`}
                    className="flex items-center justify-between py-1.5 text-xs hover:text-emerald-400 transition-colors"
                  >
                    <span className="font-semibold text-zinc-300">👤 {p.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{p.position}</span>
                  </Link>
                ))
              ) : (
                <span className="text-xs text-zinc-500">No stats loaded yet.</span>
              )}
            </div>

            {/* Injury tracker */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4">
              <h3 className="text-xs uppercase text-zinc-500 font-bold border-b border-zinc-800 pb-2">Squad Injury Report</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="font-semibold text-zinc-300">🏥 Thibaut Courtois</span>
                  <span className="text-[10px] font-mono font-bold text-red-400 px-1.5 py-0.5 rounded bg-red-500/10">HAMSTRING • 2 WEEKS</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="font-semibold text-zinc-300">🏥 Federico Valverde</span>
                  <span className="text-[10px] font-mono font-bold text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-400/10">KNOCK • DAY-TO-DAY</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryPhotos.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-zinc-800">
                <img 
                  src={url} 
                  alt="Club asset" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                  <span className="text-[10px] font-mono text-zinc-300 font-semibold uppercase">FutIA Stadium View</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
