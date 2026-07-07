import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Bot, Trophy, ArrowLeftRight, HelpCircle, Bell, Mail, Compass, HelpCircle as QuestionIcon, ShieldAlert } from 'lucide-react';

import { TRANSLATIONS, getDeviceLanguage } from './utils/translate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveMatches from './components/LiveMatches';
import MatchDetails from './components/MatchDetails';
import TeamPage from './components/TeamPage';
import PlayerPage from './components/PlayerPage';
import Competitions from './components/Competitions';
import Transfers from './components/Transfers';
import NewsSection from './components/NewsSection';
import AiAssistant from './components/AiAssistant';
import QuizSection from './components/QuizSection';
import AccountPage from './components/AccountPage';
import { About, Contact, PrivacyPolicy, TermsOfService, CookiePolicy, Disclaimer } from './components/AdSensePages';
import { Match } from './types';

function Dashboard({ 
  language, 
  matches, 
  loading, 
  onShare, 
  onOpenSearch 
}: { 
  language: string; 
  matches: Match[]; 
  loading: boolean; 
  onShare: (match: Match) => void;
  onOpenSearch: () => void;
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const trendingPlayers = [
    { id: '101', name: 'Erling Haaland', club: 'Man City', goals: 28, image: 'https://crests.thefootball-data.org/65.png' },
    { id: '202', name: 'Jude Bellingham', club: 'Real Madrid', goals: 16, image: 'https://crests.thefootball-data.org/86.png' },
    { id: '203', name: 'Kylian Mbappé', club: 'Real Madrid', goals: 21, image: 'https://crests.thefootball-data.org/86.png' }
  ];

  const trendingTeams = [
    { id: '1', name: 'Manchester City FC', crest: 'https://crests.thefootball-data.org/65.png', points: 74 },
    { id: '2', name: 'Real Madrid CF', crest: 'https://crests.thefootball-data.org/86.png', points: 78 },
    { id: '3', name: 'FC Bayern München', crest: 'https://crests.thefootball-data.org/4.png', points: 69 }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      
      {/* Hero Banner Section */}
      <Hero 
        language={language} 
        onOpenSearch={onOpenSearch} 
        featuredMatch={matches.find(m => m.status === 'LIVE' || m.status === 'IN_PLAY') || matches[0]} 
      />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Today's Match feeds */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <LiveMatches 
            language={language} 
            matches={matches} 
            loading={loading} 
            onShare={onShare} 
          />
        </div>

        {/* Right Column (4 cols): Trending widgets */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Trending Players Widget */}
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4 shadow-md">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2.5">
              <span className="text-emerald-500 font-bold">🔥</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {t.trendingPlayers}
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {trendingPlayers.map(player => (
                <Link
                  key={player.id}
                  to={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={player.image} alt={player.club} className="h-5 w-5 object-contain" />
                    <div>
                      <span className="block text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                        {player.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">{player.club}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 px-2 py-0.5 rounded bg-emerald-500/10">
                    {player.goals} Goals
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Teams Widget */}
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-4 shadow-md">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2.5">
              <Trophy className="h-4.5 w-4.5 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {t.trendingTeams}
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {trendingTeams.map(team => (
                <Link
                  key={team.id}
                  to={`/teams/${team.id}`}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={team.crest} alt={team.name} className="h-5 w-5 object-contain" />
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {team.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400">
                    {team.points} PTS
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Newsletter Panel */}
          <div className="rounded-2xl border border-zinc-850 bg-gradient-to-br from-emerald-950/20 to-zinc-900/10 p-5 flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 blur-xl rounded-full"></div>
            <h4 className="text-xs font-extrabold uppercase text-emerald-400 font-mono tracking-wider">
              FutIA Intel Weekly
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              Stay ahead of the game with our deep tactical AI reports and expected goals (xG) metrics delivered directly to your inbox.
            </p>
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
              <button 
                onClick={() => alert('Successfully subscribed to FutIA newsletter reports!')}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-colors"
              >
                Join
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('futia_lang');
    return saved || getDeviceLanguage();
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('futia_theme');
    return (saved as any) || 'dark';
  });

  const [favoritesCount, setFavoritesCount] = useState(2); // simulated favorites
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  // Search overlay state
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('futia_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('futia_theme', theme);
  }, [theme]);

  // Fetch live match feeds
  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch('/api/football?action=matches');
        const data = await response.json();
        if (data.success) {
          setMatches(data.matches || []);
        }
      } catch (err) {
        console.error('Failed to load match schedules:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();

    // Setup periodic polling sync
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut binding for quick search trigger (⌘K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleShareMatch = (match: Match) => {
    const shareText = `Check out ${match.homeTeam.shortName} vs ${match.awayTeam.shortName} Live Stats Center on FutIA! ${window.location.origin}/matches/${match.id}`;
    if (navigator.share) {
      navigator.share({
        title: 'FutIA Match Center',
        text: shareText,
        url: `${window.location.origin}/matches/${match.id}`
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Match link copied to clipboard!');
      });
    }
  };

  // Mock index for our local quick search overlay (teams, players, matches)
  const searchMockIndex = [
    { type: 'Player', name: 'Erling Haaland', path: '/players/101' },
    { type: 'Player', name: 'Kevin De Bruyne', path: '/players/102' },
    { type: 'Player', name: 'Phil Foden', path: '/players/103' },
    { type: 'Player', name: 'Vinícius Júnior', path: '/players/201' },
    { type: 'Player', name: 'Jude Bellingham', path: '/players/202' },
    { type: 'Player', name: 'Kylian Mbappé', path: '/players/203' },
    { type: 'Team', name: 'Manchester City FC', path: '/teams/1' },
    { type: 'Team', name: 'Real Madrid CF', path: '/teams/2' },
    { type: 'Team', name: 'FC Bayern München', path: '/teams/3' },
    { type: 'Competition', name: 'Premier League', path: '/competitions' },
    { type: 'Competition', name: 'La Liga', path: '/competitions' },
    { type: 'Competition', name: 'Serie A', path: '/competitions' }
  ];

  const searchResults = searchQuery.trim() === '' ? [] : searchMockIndex.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'} flex flex-col justify-between selection:bg-emerald-500 selection:text-white pb-16 lg:pb-0`}>
        
        {/* Navigation Bar */}
        <Navbar 
          language={language} 
          setLanguage={setLanguage} 
          theme={theme} 
          setTheme={setTheme} 
          onOpenSearch={() => setShowSearch(true)}
          favoritesCount={favoritesCount}
        />

        {/* Search Modal Overlay */}
        {showSearch && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop filter */}
            <div 
              className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm" 
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
            ></div>

            {/* Modal Body */}
            <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl z-20 flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Type to search (e.g., Haaland, Real Madrid)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick helper tip */}
              {searchQuery.trim() === '' && (
                <div className="text-center py-6 text-xs text-zinc-500 flex flex-col gap-1.5 font-sans">
                  <span>Press **ESC** to exit search</span>
                  <span>Type a player, team, or league name above.</span>
                </div>
              )}

              {/* Suggestions results list */}
              {searchResults.length > 0 && (
                <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pt-1">
                  {searchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      to={res.path}
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors text-xs sm:text-sm"
                    >
                      <span className="font-bold text-zinc-300">{res.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10">
                        {res.type}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.trim() !== '' && searchResults.length === 0 && (
                <div className="text-center py-6 text-xs text-zinc-500">
                  No matches found for &quot;{searchQuery}&quot;. Please adjust query terms.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Page content routers */}
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  language={language} 
                  matches={matches} 
                  loading={loading} 
                  onShare={handleShareMatch} 
                  onOpenSearch={() => setShowSearch(true)} 
                />
              } 
            />
            <Route path="/matches/:id" element={<MatchDetails language={language} />} />
            <Route path="/teams/:id" element={<TeamPage language={language} />} />
            <Route path="/players/:id" element={<PlayerPage language={language} />} />
            <Route path="/competitions" element={<Competitions language={language} />} />
            <Route path="/transfers" element={<Transfers language={language} />} />
            <Route path="/news" element={<NewsSection language={language} />} />
            <Route path="/assistant" element={<AiAssistant language={language} />} />
            <Route path="/quiz" element={<QuizSection language={language} />} />
            <Route path="/account" element={<AccountPage language={language} />} />
            
            {/* AdSense SEO routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-8 sm:py-12 text-xs text-zinc-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">FutIA Platform</span>
                <p className="mt-3 leading-relaxed max-w-xs font-sans">
                  The ultimate artificial intelligence fueled football analytics and live scoring system.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Features</span>
                <ul className="mt-3 flex flex-col gap-2">
                  <li><Link to="/" className="hover:text-emerald-400 transition-colors">Live Feeds</Link></li>
                  <li><Link to="/news" className="hover:text-emerald-400 transition-colors">Breaking News</Link></li>
                  <li><Link to="/competitions" className="hover:text-emerald-400 transition-colors">Standings</Link></li>
                  <li><Link to="/transfers" className="hover:text-emerald-400 transition-colors">Transfer market</Link></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Intelligence</span>
                <ul className="mt-3 flex flex-col gap-2">
                  <li><Link to="/assistant" className="hover:text-emerald-400 transition-colors">AI Assistant</Link></li>
                  <li><Link to="/quiz" className="hover:text-emerald-400 transition-colors">Tactics dictionary</Link></li>
                  <li><Link to="/quiz" className="hover:text-emerald-400 transition-colors">Daily Quiz</Link></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Compliance & Legal</span>
                <ul className="mt-3 flex flex-col gap-2">
                  <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                  <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/disclaimer" className="hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <span>© {new Date().getFullYear()} FutIA Platform. All rights reserved. Made for world-class fans.</span>
              <div className="flex gap-4 font-mono text-[10px]">
                <span className="text-emerald-500 font-bold">STATUS: PREMIUM PWA STAGE</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}
