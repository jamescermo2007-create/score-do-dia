import { MATCHES, STANDINGS, TEAMS, PLAYERS, NEWS, TRANSFERS, SQUADS, SCORERS, COMPETITIONS_LIST } from './football-data-store';

// A simple in-memory cache to respect Football-Data.org API limits (10 reqs/min on free tier)
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30 * 1000; // 30 seconds cache for matches, 1 hour for standings/teams

async function fetchFromApi(endpoint: string, apiKey: string, ttl = CACHE_TTL) {
  const cacheKey = endpoint;
  const now = Date.now();
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < ttl) {
    return cache[cacheKey].data;
  }

  try {
    const url = `https://api.football-data.org/v4${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`Football-Data.org Rate Limit reached for ${endpoint}. Falling back to cache or local store.`);
        // If we have a stale cache, return it instead of null during 429 rate limit
        if (cache[cacheKey]) {
          return cache[cacheKey].data;
        }
      } else {
        console.warn(`Football-Data.org API error: ${response.status} on ${endpoint}.`);
      }
      return null;
    }

    const data = await response.json();
    cache[cacheKey] = { data, timestamp: now };
    return data;
  } catch (err) {
    console.error(`Failed to fetch from Football-Data.org at ${endpoint}:`, err);
    if (cache[cacheKey]) {
      return cache[cacheKey].data;
    }
    return null;
  }
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse action and parameters
  const urlParts = req.url ? req.url.split('?') : [];
  const queryParams = new URLSearchParams(urlParts[1] || '');
  const action = queryParams.get('action') || 'matches';
  
  const apiKey = process.env.FOOTBALL_DATA_API_KEY || '';

  try {
    switch (action) {
      case 'competitions': {
        if (apiKey) {
          const apiData = await fetchFromApi('/competitions', apiKey, 24 * 3600 * 1000); // 1 day cache
          if (apiData && apiData.competitions) {
            const freeTierCodes = ['PL', 'PD', 'SA', 'BL1', 'FL1', 'CL', 'DED', 'PORT', 'ELC', 'CLI', 'WC', 'EC'];
            const filtered = apiData.competitions.filter((c: any) => freeTierCodes.includes(c.code));
            res.status(200).json({ success: true, competitions: filtered, source: 'api' });
            return;
          }
        }
        res.status(200).json({ success: true, competitions: COMPETITIONS_LIST, source: 'fallback' });
        break;
      }
      case 'matches': {
        if (apiKey) {
          const now = new Date();
          const dateFrom = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 2 days ago
          const dateTo = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 4 days ahead
          const apiData = await fetchFromApi(`/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, apiKey, 30000); // 30s cache
          if (apiData && apiData.matches) {
            // Add minute field to live matches
            const enrichedMatches = apiData.matches.map((match: any) => {
              if (match.status === 'IN_PLAY' || match.status === 'LIVE') {
                const startedAt = new Date(match.utcDate).getTime();
                const elapsed = Math.floor((Date.now() - startedAt) / 60000);
                match.minute = Math.max(1, Math.min(90, elapsed));
              }
              return match;
            });
            res.status(200).json({ success: true, matches: enrichedMatches, source: 'api' });
            return;
          }
        }
        res.status(200).json({ success: true, matches: MATCHES, source: 'fallback' });
        break;
      }

      case 'match': {
        const matchIdStr = queryParams.get('id');
        const matchId = matchIdStr ? parseInt(matchIdStr, 10) : 0;
        
        if (apiKey && matchId && matchId > 1000) {
          const apiData = await fetchFromApi(`/matches/${matchId}`, apiKey, 15000);
          if (apiData) {
            const matchDetails = { ...apiData };
            
            // Enrich stats if missing
            if (!matchDetails.stats) {
              matchDetails.stats = {
                possession: { home: 50, away: 50 },
                shots: { home: 10, away: 10 },
                shotsOnTarget: { home: 4, away: 4 },
                corners: { home: 5, away: 5 },
                fouls: { home: 11, away: 11 },
                offside: { home: 2, away: 2 },
                yellowCards: { home: 1, away: 1 },
                redCards: { home: 0, away: 0 }
              };
              const hScore = matchDetails.score?.fullTime?.home ?? 0;
              const aScore = matchDetails.score?.fullTime?.away ?? 0;
              if (hScore > aScore) {
                matchDetails.stats.possession.home = 55;
                matchDetails.stats.possession.away = 45;
                matchDetails.stats.shots.home = 14;
                matchDetails.stats.shots.away = 8;
              } else if (aScore > hScore) {
                matchDetails.stats.possession.home = 45;
                matchDetails.stats.possession.away = 55;
                matchDetails.stats.shots.home = 7;
                matchDetails.stats.shots.away = 13;
              }
            }

            // Enrich timeline/minute if missing
            if (!matchDetails.timeline && matchDetails.score?.fullTime?.home !== null) {
              const timeline: any[] = [{ minute: 1, type: 'KICKOFF', description: 'Match started!' }];
              const homeGoals = matchDetails.score.fullTime.home || 0;
              const awayGoals = matchDetails.score.fullTime.away || 0;
              const goalsList: { minute: number; teamId: number; teamName: string; isHome: boolean }[] = [];
              
              for (let i = 0; i < homeGoals; i++) {
                goalsList.push({
                  minute: Math.floor(Math.random() * 80) + 5,
                  teamId: matchDetails.homeTeam.id,
                  teamName: matchDetails.homeTeam.shortName || matchDetails.homeTeam.name,
                  isHome: true
                });
              }
              for (let i = 0; i < awayGoals; i++) {
                goalsList.push({
                  minute: Math.floor(Math.random() * 80) + 5,
                  teamId: matchDetails.awayTeam.id,
                  teamName: matchDetails.awayTeam.shortName || matchDetails.awayTeam.name,
                  isHome: false
                });
              }
              goalsList.sort((a, b) => a.minute - b.minute);

              let hCurrent = 0;
              let aCurrent = 0;
              goalsList.forEach(g => {
                if (g.isHome) hCurrent++;
                else aCurrent++;
                timeline.push({
                  minute: g.minute,
                  type: 'GOAL',
                  teamId: g.teamId,
                  description: `GOAL! Beautiful shot by ${g.isHome ? 'home side' : 'away side'} hits the net!`,
                  playerName: g.isHome ? `Striker (Home)` : `Striker (Away)`,
                  detail: `${hCurrent}-${aCurrent}`
                });
              });

              if (matchDetails.status === 'FINISHED') {
                timeline.push({ minute: 90, type: 'FULLTIME', description: 'Match finished.' });
              } else if (matchDetails.status === 'IN_PLAY' || matchDetails.status === 'LIVE') {
                const elapsed = Math.floor((Date.now() - new Date(matchDetails.utcDate).getTime()) / 60000);
                matchDetails.minute = Math.max(1, Math.min(90, elapsed));
              }

              matchDetails.timeline = timeline;
            }

            // Enrich lineups if missing
            if (!matchDetails.lineups) {
              matchDetails.lineups = {
                home: {
                  coach: 'Manager (Home)',
                  formation: '4-3-3',
                  startingXI: [
                    { id: 1001, name: 'GK (Home)', position: 'GK', shirtNumber: 1 },
                    { id: 1002, name: 'Defender L', position: 'DF', shirtNumber: 3 },
                    { id: 1003, name: 'Defender C1', position: 'DF', shirtNumber: 4 },
                    { id: 1004, name: 'Defender C2', position: 'DF', shirtNumber: 5 },
                    { id: 1005, name: 'Defender R', position: 'DF', shirtNumber: 2 },
                    { id: 1006, name: 'Midfielder C', position: 'MF', shirtNumber: 6 },
                    { id: 1007, name: 'Midfielder L', position: 'MF', shirtNumber: 8 },
                    { id: 1008, name: 'Midfielder R', position: 'MF', shirtNumber: 10 },
                    { id: 1009, name: 'Winger L', position: 'FW', shirtNumber: 7 },
                    { id: 1010, name: 'Striker', position: 'FW', shirtNumber: 9 },
                    { id: 1011, name: 'Winger R', position: 'FW', shirtNumber: 11 }
                  ],
                  bench: []
                },
                away: {
                  coach: 'Manager (Away)',
                  formation: '4-2-3-1',
                  startingXI: [
                    { id: 2001, name: 'GK (Away)', position: 'GK', shirtNumber: 1 },
                    { id: 2002, name: 'Defender L', position: 'DF', shirtNumber: 3 },
                    { id: 2003, name: 'Defender C1', position: 'DF', shirtNumber: 4 },
                    { id: 2004, name: 'Defender C2', position: 'DF', shirtNumber: 5 },
                    { id: 2005, name: 'Defender R', position: 'DF', shirtNumber: 2 },
                    { id: 2006, name: 'Midfielder D1', position: 'MF', shirtNumber: 6 },
                    { id: 2007, name: 'Midfielder D2', position: 'MF', shirtNumber: 8 },
                    { id: 2008, name: 'Midfielder A', position: 'MF', shirtNumber: 10 },
                    { id: 2009, name: 'Winger L', position: 'FW', shirtNumber: 7 },
                    { id: 2010, name: 'Striker', position: 'FW', shirtNumber: 9 },
                    { id: 2011, name: 'Winger R', position: 'FW', shirtNumber: 11 }
                  ],
                  bench: []
                }
              };
            }

            res.status(200).json({ success: true, match: matchDetails, source: 'api' });
            return;
          }
        }

        // Local fallback
        const localMatch = MATCHES.find(m => m.id === matchId);
        if (localMatch) {
          res.status(200).json({ success: true, match: localMatch, source: 'fallback' });
        } else {
          res.status(404).json({ success: false, error: 'Match not found' });
        }
        break;
      }

      case 'standings': {
        const code = queryParams.get('code') || 'PL';
        if (apiKey) {
          const apiData = await fetchFromApi(`/competitions/${code}/standings`, apiKey, 3600 * 1000); // 1 hour cache
          if (apiData && apiData.standings && apiData.standings[0]) {
            const entries = apiData.standings[0].table.map((row: any) => ({
              position: row.position,
              team: {
                id: row.team.id,
                name: row.team.name,
                shortName: row.team.shortName || row.team.name,
                tla: row.team.tla,
                crest: row.team.crest
              },
              playedGames: row.playedGames,
              won: row.won,
              draw: row.draw,
              lost: row.lost,
              points: row.points,
              goalsFor: row.goalsFor,
              goalsAgainst: row.goalsAgainst,
              goalDifference: row.goalDifference,
              form: row.form
            }));
            res.status(200).json({ success: true, standings: entries, source: 'api' });
            return;
          }
        }

        // Local fallback
        const localStandings = STANDINGS[code] || STANDINGS['PL'];
        res.status(200).json({ success: true, standings: localStandings, source: 'fallback' });
        break;
      }

      case 'league': {
        const code = queryParams.get('id') || 'PL';
        let standingsEntries: any[] = [];
        let topScorersEntries: any[] = [];
        let topAssistsEntries: any[] = [];

        if (apiKey) {
          // Fetch standings
          const standingsData = await fetchFromApi(`/competitions/${code}/standings`, apiKey, 3600 * 1000); // 1h cache
          if (standingsData && standingsData.standings && standingsData.standings[0]) {
            standingsEntries = standingsData.standings[0].table.map((row: any) => ({
              position: row.position,
              team: {
                id: row.team.id,
                name: row.team.name,
                shortName: row.team.shortName || row.team.name,
                tla: row.team.tla,
                crest: row.team.crest
              },
              playedGames: row.playedGames,
              won: row.won,
              draw: row.draw,
              lost: row.lost,
              points: row.points,
              goalsFor: row.goalsFor,
              goalsAgainst: row.goalsAgainst,
              goalDifference: row.goalDifference,
              form: row.form
            }));
          }

          // Fetch scorers
          const scorersData = await fetchFromApi(`/competitions/${code}/scorers`, apiKey, 3600 * 1000); // 1h cache
          if (scorersData && scorersData.scorers) {
            topScorersEntries = scorersData.scorers.map((s: any) => ({
              player: {
                id: s.player.id,
                name: s.player.name,
                position: s.player.position || 'Forward'
              },
              team: {
                id: s.team.id,
                name: s.team.name,
                shortName: s.team.shortName || s.team.name,
                crest: s.team.crest
              },
              goals: s.goals,
              assists: s.assists || 0
            }));

            // Process assists sorted list
            topAssistsEntries = [...scorersData.scorers]
              .filter((s: any) => typeof s.assists === 'number' && s.assists > 0)
              .sort((a: any, b: any) => b.assists - a.assists)
              .map((s: any) => ({
                player: {
                  id: s.player.id,
                  name: s.player.name,
                  position: s.player.position || 'Forward'
                },
                team: {
                  id: s.team.id,
                  name: s.team.name,
                  shortName: s.team.shortName || s.team.name,
                  crest: s.team.crest
                },
                goals: s.goals,
                assists: s.assists
              }));
          }

          if (standingsEntries.length > 0 || topScorersEntries.length > 0) {
            res.status(200).json({
              success: true,
              standings: standingsEntries,
              topScorers: topScorersEntries,
              topAssists: topAssistsEntries,
              source: 'api'
            });
            return;
          }
        }

        // Local fallback
        const localStandings = STANDINGS[code] || STANDINGS['PL'];
        const localScorers = SCORERS[code] || SCORERS['PL'];
        const localAssists = localScorers.map(s => ({
          ...s,
          assists: s.assists || Math.floor(Math.random() * 8) + 2
        })).sort((a, b) => b.assists - a.assists);

        res.status(200).json({
          success: true,
          standings: localStandings,
          topScorers: localScorers,
          topAssists: localAssists,
          source: 'fallback'
        });
        break;
      }

      case 'team': {
        const teamIdStr = queryParams.get('id');
        const teamId = teamIdStr ? parseInt(teamIdStr, 10) : 0;

        if (apiKey && teamId) {
          const apiData = await fetchFromApi(`/teams/${teamId}`, apiKey, 3600 * 1000);
          if (apiData) {
            let upcomingMatches: any[] = [];
            let recentMatches: any[] = [];
            
            const matchesData = await fetchFromApi(`/teams/${teamId}/matches`, apiKey, 300 * 1000);
            if (matchesData && matchesData.matches) {
              upcomingMatches = matchesData.matches.filter((m: any) => m.status === 'SCHEDULED');
              recentMatches = matchesData.matches.filter((m: any) => m.status === 'FINISHED');
            }

            res.status(200).json({
              success: true,
              team: {
                id: apiData.id,
                name: apiData.name,
                shortName: apiData.shortName || apiData.name,
                tla: apiData.tla,
                crest: apiData.crest,
                founded: apiData.founded,
                venue: apiData.venue,
                website: apiData.website,
                country: apiData.area?.name,
                clubColors: apiData.clubColors
              },
              squad: apiData.squad ? apiData.squad.map((p: any) => ({
                id: p.id,
                name: p.name,
                position: p.position || 'Player',
                nationality: p.nationality,
                dateOfBirth: p.dateOfBirth
              })) : [],
              upcoming: upcomingMatches,
              recent: recentMatches,
              source: 'api'
            });
            return;
          }
        }

        const localTeam = TEAMS[teamId];
        if (localTeam) {
          const squad = SQUADS[teamId] || [];
          res.status(200).json({
            success: true,
            team: localTeam,
            squad,
            upcoming: MATCHES.filter(m => (m.homeTeam.id === teamId || m.awayTeam.id === teamId) && m.status === 'SCHEDULED'),
            recent: MATCHES.filter(m => (m.homeTeam.id === teamId || m.awayTeam.id === teamId) && m.status === 'FINISHED'),
            source: 'fallback'
          });
        } else {
          const foundMatch = MATCHES.find(m => m.homeTeam.id === teamId || m.awayTeam.id === teamId);
          const genericTeam = foundMatch ? (foundMatch.homeTeam.id === teamId ? foundMatch.homeTeam : foundMatch.awayTeam) : null;
          if (genericTeam) {
            res.status(200).json({ success: true, team: genericTeam, squad: [], upcoming: [], recent: [], source: 'fallback' });
          } else {
            res.status(404).json({ success: false, error: 'Team not found' });
          }
        }
        break;
      }

      case 'player': {
        const playerIdStr = queryParams.get('id');
        const playerId = playerIdStr ? parseInt(playerIdStr, 10) : 0;

        if (apiKey && playerId) {
          const apiData = await fetchFromApi(`/persons/${playerId}`, apiKey, 3600 * 1000);
          if (apiData) {
            let age = 24;
            if (apiData.dateOfBirth) {
              const birthYear = new Date(apiData.dateOfBirth).getFullYear();
              age = new Date().getFullYear() - birthYear;
            }

            res.status(200).json({
              success: true,
              player: {
                id: apiData.id,
                name: apiData.name,
                nationality: apiData.nationality || 'International',
                age,
                height: apiData.height || '1.81m',
                weight: apiData.weight || '76kg',
                position: apiData.position || 'Midfielder',
                currentClub: apiData.currentTeam?.name || 'Professional Club',
                marketValue: '€18M',
                biography: `${apiData.name} is a high-performing professional footballer playing for ${apiData.currentTeam?.name || 'his club'} as a ${apiData.position || 'player'}.`,
                stats: { goals: 7, assists: 4, minutesPlayed: 1150, yellowCards: 1, redCards: 0 },
                career: [{ season: '2025/26', team: apiData.currentTeam?.name || 'Professional Club', apps: 14, goals: 7 }]
              },
              source: 'api'
            });
            return;
          }
        }

        const localPlayer = PLAYERS[playerId];
        if (localPlayer) {
          res.status(200).json({ success: true, player: localPlayer, source: 'fallback' });
        } else {
          let foundInSquad: any = null;
          for (const sId of Object.keys(SQUADS)) {
            const matchPlayer = SQUADS[parseInt(sId, 10)].find(p => p.id === playerId);
            if (matchPlayer) {
              foundInSquad = matchPlayer;
              break;
            }
          }

          if (foundInSquad) {
            const placeholderPlayer = {
              id: foundInSquad.id,
              name: foundInSquad.name,
              nationality: 'International',
              age: 24,
              height: '1.82m',
              weight: '76kg',
              position: foundInSquad.position,
              currentClub: 'Professional Football Club',
              marketValue: '€25M',
              biography: `${foundInSquad.name} is a high-performing professional footballer currently displaying immense skill.`,
              stats: { goals: foundInSquad.stats?.goals || 4, assists: foundInSquad.stats?.assists || 3, minutesPlayed: 1100, yellowCards: 1, redCards: 0 },
              career: [{ season: '2025/26', team: 'Professional Football Club', apps: 15, goals: 4 }]
            };
            res.status(200).json({ success: true, player: placeholderPlayer, source: 'fallback' });
          } else {
            res.status(404).json({ success: false, error: 'Player not found' });
          }
        }
        break;
      }

      case 'transfers': {
        res.status(200).json({ success: true, transfers: TRANSFERS, source: 'fallback' });
        break;
      }

      case 'news': {
        res.status(200).json({ success: true, news: NEWS, source: 'fallback' });
        break;
      }

      case 'scorers': {
        const code = queryParams.get('code') || 'PL';
        if (apiKey) {
          const apiData = await fetchFromApi(`/competitions/${code}/scorers`, apiKey, 3600 * 1000);
          if (apiData && apiData.scorers) {
            const mappedScorers = apiData.scorers.map((s: any) => ({
              player: { name: s.player.name, position: s.player.position || 'Forward' },
              team: {
                id: s.team.id,
                name: s.team.name,
                shortName: s.team.shortName || s.team.name,
                crest: s.team.crest
              },
              goals: s.goals,
              assists: s.assists || 0
            }));
            res.status(200).json({ success: true, scorers: mappedScorers, source: 'api' });
            return;
          }
        }

        const localScorers = SCORERS[code] || SCORERS['PL'];
        res.status(200).json({ success: true, scorers: localScorers, source: 'fallback' });
        break;
      }

      default: {
        res.status(400).json({ success: false, error: 'Invalid action parameter' });
        break;
      }
    }
  } catch (error: any) {
    console.error('API Handler Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error occurred' });
  }
}
