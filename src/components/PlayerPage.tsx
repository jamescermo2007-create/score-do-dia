import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, Shield, Calendar, ArrowLeftRight, TrendingUp, 
  MapPin, HelpCircle, Activity, Award, AlertTriangle 
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface PlayerPageProps {
  language: string;
}

export default function PlayerPage({ language }: PlayerPageProps) {
  const { id } = useParams<{ id: string }>();
  const [playerData, setPlayerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Player Comparison State
  const [compareId, setCompareId] = useState<string>('');
  const [comparePlayer, setComparePlayer] = useState<any>(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const comparablePlayers = [
    { id: '101', name: 'Erling Haaland' },
    { id: '102', name: 'Kevin De Bruyne' },
    { id: '103', name: 'Phil Foden' },
    { id: '201', name: 'Vinícius Júnior' },
    { id: '202', name: 'Jude Bellingham' },
    { id: '203', name: 'Kylian Mbappé' }
  ];

  useEffect(() => {
    async function fetchPlayerDetails() {
      setLoading(true);
      try {
        const response = await fetch(`/api/football?action=player&id=${id}`);
        const data = await response.json();
        if (data.success) {
          setPlayerData(data);
        }
      } catch (err) {
        console.error('Failed to fetch player details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchPlayerDetails();
      // Reset comparison on player ID swap
      setCompareId('');
      setComparePlayer(null);
    }
  }, [id]);

  useEffect(() => {
    async function fetchComparePlayer() {
      if (!compareId) {
        setComparePlayer(null);
        return;
      }
      setCompareLoading(true);
      try {
        const response = await fetch(`/api/football?action=player&id=${compareId}`);
        const data = await response.json();
        if (data.success) {
          setComparePlayer(data.player);
        }
      } catch (err) {
        console.error('Failed to fetch compare player:', err);
      } finally {
        setCompareLoading(false);
      }
    }
    fetchComparePlayer();
  }, [compareId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
        <p className="mt-4 text-zinc-500 text-sm">Loading Player Details...</p>
      </div>
    );
  }

  if (!playerData || !playerData.player) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Player Not Found</h2>
        <p className="text-zinc-500 text-sm mb-6">The requested player profile is currently unavailable or has been archived.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 text-sm font-semibold transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const { player } = playerData;

  // Curated player image placeholder mapping to ensure visual excellence
  const getPlayerPhoto = (pId: string) => {
    if (pId === '101') return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=300&auto=format&fit=crop'; // Haaland style
    return 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=300&auto=format&fit=crop';
  };

  const statFields = [
    { label: 'Goals Scored', key: 'goals', max: 50 },
    { label: 'Assists Given', key: 'assists', max: 25 },
    { label: 'Minutes Played', key: 'minutes', max: 3500 },
    { label: 'Yellow Cards', key: 'yellowCards', max: 15 },
    { label: 'Red Cards', key: 'redCards', max: 3 }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Player Header Card */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Profile */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950/65 shrink-0 flex items-center justify-center">
            <User className="h-14 w-14 text-zinc-700" />
          </div>

          <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{player.name}</h1>
              {player.shirtNumber && (
                <span className="self-center px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-mono text-xs font-extrabold border border-emerald-500/10">
                  #{player.shirtNumber}
                </span>
              )}
            </div>

            {/* General Bio */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">🌍 Nationality: **{player.nationality}**</span>
              <span className="flex items-center gap-1">📋 Position: **{player.position}**</span>
              <span className="flex items-center gap-1">📅 Age: **{player.age || '25'}**</span>
            </div>

            {/* Heights & Weights */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-zinc-400 mt-1">
              <span>📏 Height: **{player.height || '1.85 m'}**</span>
              <span>⚖️ Weight: **{player.weight || '80 kg'}**</span>
              <span className="text-emerald-400 font-bold">💰 Market Value: {player.marketValue || '€120.00m'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Stats & Biography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Statistics panel */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Activity className="h-4.5 w-4.5 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Season Statistics</h3>
          </div>

          <div className="flex flex-col gap-4">
            {statFields.map((stat, idx) => {
              const val = player.stats?.[stat.key] || 0;
              const pct = Math.min(Math.round((val / stat.max) * 100), 100);
              return (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-semibold px-0.5">
                    <span className="text-zinc-400">{stat.label}</span>
                    <span className="font-mono text-zinc-200">{val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Biography & Achievements */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Award className="h-4.5 w-4.5 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Biography & Awards</h3>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {player.bio || `${player.name} is a professional footballer recognized internationally for their exceptional athletic output, tactical positioning, and core contribution to the squad list.`}
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
                Career Accolades
              </span>
              <ul className="text-xs text-zinc-400 flex flex-col gap-1.5 list-disc pl-4 font-sans">
                <li>1x Football Player of the Year nominee</li>
                <li>Champion of major UEFA/Domestic League titles</li>
                <li>Consistently featured in Team of the Season selections</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Creative Comparison Tool section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4.5 w-4.5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Player Comparison Tool</h3>
          </div>

          <select
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 focus:outline-none focus:border-emerald-500"
          >
            <option value="">Compare with player...</option>
            {comparablePlayers.filter(p => p.id !== player.id).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {compareLoading ? (
          <div className="text-center py-6 text-xs font-mono text-zinc-500">
            LOADING COMPARISON DATA...
          </div>
        ) : comparePlayer ? (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Selected Left Player (This player) */}
            <div className="sm:col-span-4 text-center p-3 rounded-xl bg-zinc-950/40 border border-zinc-900 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-white">{player.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">{player.position}</span>
              <span className="text-[11px] text-zinc-400">Value: {player.marketValue || 'N/A'}</span>
            </div>

            {/* VS separator with stat comparatives */}
            <div className="sm:col-span-4 flex flex-col gap-3">
              {statFields.map((stat, idx) => {
                const homeVal = player.stats?.[stat.key] || 0;
                const awayVal = comparePlayer.stats?.[stat.key] || 0;
                const total = homeVal + awayVal || 1;
                const homePct = Math.round((homeVal / total) * 100);

                return (
                  <div key={idx} className="flex flex-col gap-1 text-[10px]">
                    <div className="flex justify-between font-mono font-bold text-zinc-400">
                      <span>{homeVal}</span>
                      <span className="text-[9px] uppercase font-sans text-zinc-500">{stat.label}</span>
                      <span>{awayVal}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full flex overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: `${homePct}%` }}></div>
                      <div className="bg-emerald-400/50 h-full rounded-r-full" style={{ width: `${100 - homePct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Right Player (Compare target) */}
            <div className="sm:col-span-4 text-center p-3 rounded-xl bg-zinc-950/40 border border-zinc-900 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-white">{comparePlayer.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">{comparePlayer.position}</span>
              <span className="text-[11px] text-zinc-400">Value: {comparePlayer.marketValue || 'N/A'}</span>
            </div>

          </div>
        ) : (
          <div className="text-center py-6 text-xs text-zinc-500 font-sans">
            Select a comparable player from the dropdown to display head-to-side tactical comparison bars.
          </div>
        )}
      </div>

    </div>
  );
}
