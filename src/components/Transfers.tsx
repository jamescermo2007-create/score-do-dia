import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Link2, Check, HelpCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translate';

interface TransfersProps {
  language: string;
}

export default function Transfers({ language }: TransfersProps) {
  const [filter, setFilter] = useState<'confirmed' | 'rumours' | 'loans' | 'freeAgents'>('confirmed');
  const [transfers, setTransfers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    async function fetchTransfers() {
      setLoading(true);
      try {
        const response = await fetch(`/api/football?action=transfers`);
        const data = await response.json();
        if (data.success) {
          setTransfers(data.transfers || []);
        }
      } catch (err) {
        console.error('Failed to fetch transfers:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransfers();
  }, []);

  const filteredTransfers = transfers.filter(tr => tr.type === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 flex flex-col gap-8 pb-20">
      
      {/* Header Visual Banner */}
      <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
            <ArrowLeftRight className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{t.transferMarket}</h1>
            <p className="text-zinc-500 text-xs mt-0.5">Explore rumors, loans, and official contract signoffs across European football.</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-zinc-900 p-0.5 rounded-xl bg-zinc-950/60 max-w-full overflow-x-auto gap-1">
        {[
          { id: 'confirmed', label: t.confirmedTransfers },
          { id: 'rumours', label: t.rumours },
          { id: 'loans', label: t.loans },
          { id: 'freeAgents', label: t.freeAgents }
        ].map(tab => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-zinc-900 text-white border-b border-emerald-500 shadow-md' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid: Transfers List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-zinc-500 text-sm">Mapping transfer rosters...</p>
        </div>
      ) : filteredTransfers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/10 p-6">
          <AlertTriangle className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-zinc-300 font-bold mb-1">No Active Deals</h4>
          <p className="text-zinc-500 text-xs">There are no transfer records registered under this category at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTransfers.map((tr) => (
            <div 
              key={tr.id}
              className="relative rounded-2xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 p-5 transition-all flex flex-col justify-between"
            >
              {/* Top Details (Player Name, Date) */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-extrabold text-white">{tr.playerName}</h4>
                  <span className="block text-[10px] text-zinc-500 font-mono font-bold uppercase mt-0.5">{tr.position}</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-600">{tr.date}</span>
              </div>

              {/* Clubs Exchange panel */}
              <div className="grid grid-cols-3 items-center text-center py-2 border-y border-zinc-900/60 my-2">
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono uppercase font-semibold mb-1">From</span>
                  <span className="text-xs font-bold text-zinc-300 truncate block px-1">{tr.fromClub}</span>
                </div>
                <div className="flex justify-center text-emerald-500">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 font-mono uppercase font-semibold mb-1">To</span>
                  <span className="text-xs font-bold text-zinc-300 truncate block px-1">{tr.toClub}</span>
                </div>
              </div>

              {/* Bottom (Fee, Rumor probability, detail) */}
              <div className="flex justify-between items-center mt-3 pt-2">
                <span className="text-xs font-extrabold text-emerald-400 font-mono">
                  {tr.fee || 'Free Agent'}
                </span>
                {tr.probability ? (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      {tr.probability}% Prob
                    </span>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold">
                    <Check className="h-2.5 w-2.5" />
                    OFFICIAL
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
