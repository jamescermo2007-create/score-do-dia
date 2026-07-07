import { Match, StandingEntry, Transfer, NewsArticle, Player, Team } from '../src/types';

export const COMPETITIONS_LIST = [
  { id: 2021, name: 'Premier League', code: 'PL', emblem: 'https://crests.thefootball-data.org/PL.png', area: { name: 'England', flag: 'https://crests.thefootball-data.org/770.svg' } },
  { id: 2014, name: 'La Liga', code: 'PD', emblem: 'https://crests.thefootball-data.org/PD.png', area: { name: 'Spain', flag: 'https://crests.thefootball-data.org/760.svg' } },
  { id: 2019, name: 'Serie A', code: 'SA', emblem: 'https://crests.thefootball-data.org/SA.png', area: { name: 'Italy', flag: 'https://crests.thefootball-data.org/784.svg' } },
  { id: 2002, name: 'Bundesliga', code: 'BL1', emblem: 'https://crests.thefootball-data.org/BL1.png', area: { name: 'Germany', flag: 'https://crests.thefootball-data.org/762.svg' } },
  { id: 2015, name: 'Ligue 1', code: 'FL1', emblem: 'https://crests.thefootball-data.org/FL1.png', area: { name: 'France', flag: 'https://crests.thefootball-data.org/773.svg' } },
  { id: 2001, name: 'UEFA Champions League', code: 'CL', emblem: 'https://crests.thefootball-data.org/CL.png', area: { name: 'Europe', flag: 'https://crests.thefootball-data.org/EUR.svg' } },
  { id: 2152, name: 'Copa Libertadores', code: 'CLI', emblem: 'https://crests.thefootball-data.org/CLI.png', area: { name: 'South America', flag: 'https://crests.thefootball-data.org/CLI.png' } },
  { id: 2013, name: 'Brasileirão Série A', code: 'BSA', emblem: 'https://crests.thefootball-data.org/BSA.png', area: { name: 'Brazil', flag: 'https://crests.thefootball-data.org/764.svg' } },
  { id: 2149, name: 'Major League Soccer', code: 'MLS', emblem: 'https://crests.thefootball-data.org/MLS.png', area: { name: 'United States', flag: 'https://crests.thefootball-data.org/769.svg' } },
  { id: 2034, name: 'Saudi Pro League', code: 'SPL', emblem: 'https://crests.thefootball-data.org/SPL.png', area: { name: 'Saudi Arabia', flag: 'https://crests.thefootball-data.org/822.svg' } }
];

export const TEAMS: Record<number, Team> = {
  86: { id: 86, name: 'Real Madrid CF', shortName: 'Real Madrid', tla: 'RMA', crest: 'https://crests.thefootball-data.org/86.png', founded: 1902, venue: 'Santiago Bernabéu', coach: 'Carlo Ancelotti', website: 'https://www.realmadrid.com', country: 'Spain', clubColors: 'White / Gold' },
  65: { id: 65, name: 'FC Barcelona', shortName: 'Barcelona', tla: 'FCB', crest: 'https://crests.thefootball-data.org/65.png', founded: 1899, venue: 'Camp Nou', coach: 'Hansi Flick', website: 'https://www.fcbarcelona.com', country: 'Spain', clubColors: 'Blue / Garnet' },
  64: { id: 64, name: 'Liverpool FC', shortName: 'Liverpool', tla: 'LIV', crest: 'https://crests.thefootball-data.org/64.png', founded: 1892, venue: 'Anfield', coach: 'Arne Slot', website: 'https://www.liverpoolfc.com', country: 'England', clubColors: 'Red / White' },
  61: { id: 61, name: 'Chelsea FC', shortName: 'Chelsea', tla: 'CHE', crest: 'https://crests.thefootball-data.org/61.png', founded: 1905, venue: 'Stamford Bridge', coach: 'Enzo Maresca', website: 'https://www.chelseafc.com', country: 'England', clubColors: 'Blue / White' },
  57: { id: 57, name: 'Arsenal FC', shortName: 'Arsenal', tla: 'ARS', crest: 'https://crests.thefootball-data.org/57.png', founded: 1886, venue: 'Emirates Stadium', coach: 'Mikel Arteta', website: 'https://www.arsenal.com', country: 'England', clubColors: 'Red / White' },
  62: { id: 62, name: 'Manchester United FC', shortName: 'Man United', tla: 'MUN', crest: 'https://crests.thefootball-data.org/62.png', founded: 1878, venue: 'Old Trafford', coach: 'Rúben Amorim', website: 'https://www.manutd.com', country: 'England', clubColors: 'Red / Black' },
  67: { id: 67, name: 'Newcastle United FC', shortName: 'Newcastle', tla: 'NEW', crest: 'https://crests.thefootball-data.org/67.png', founded: 1892, venue: 'St. James\' Park', coach: 'Eddie Howe', website: 'https://www.nufc.co.uk', country: 'England', clubColors: 'Black / White' },
  73: { id: 73, name: 'FC Bayern München', shortName: 'Bayern', tla: 'FCB', crest: 'https://crests.thefootball-data.org/73.png', founded: 1900, venue: 'Allianz Arena', coach: 'Vincent Kompany', website: 'https://www.fcbayern.com', country: 'Germany', clubColors: 'Red / White' },
  109: { id: 109, name: 'Juventus FC', shortName: 'Juventus', tla: 'JUV', crest: 'https://crests.thefootball-data.org/109.png', founded: 1897, venue: 'Allianz Stadium', coach: 'Thiago Motta', website: 'https://www.juventus.com', country: 'Italy', clubColors: 'Black / White' },
  108: { id: 108, name: 'FC Internazionale Milano', shortName: 'Inter', tla: 'INT', crest: 'https://crests.thefootball-data.org/108.png', founded: 1908, venue: 'San Siro', coach: 'Simone Inzaghi', website: 'https://www.inter.it', country: 'Italy', clubColors: 'Blue / Black' },
  654: { id: 654, name: 'Manchester City FC', shortName: 'Man City', tla: 'MCI', crest: 'https://crests.thefootball-data.org/654.png', founded: 1880, venue: 'Etihad Stadium', coach: 'Pep Guardiola', website: 'https://www.mancity.com', country: 'England', clubColors: 'Sky Blue / White' },
  113: { id: 113, name: 'SSC Napoli', shortName: 'Napoli', tla: 'NAP', crest: 'https://crests.thefootball-data.org/113.png', founded: 1926, venue: 'Diego Armando Maradona', coach: 'Antonio Conte', website: 'https://www.sscnapoli.it', country: 'Italy', clubColors: 'Sky Blue / White' },
  524: { id: 524, name: 'Paris Saint-Germain FC', shortName: 'PSG', tla: 'PSG', crest: 'https://crests.thefootball-data.org/524.png', founded: 1970, venue: 'Parc des Princes', coach: 'Luis Enrique', website: 'https://www.psg.fr', country: 'France', clubColors: 'Blue / Red' },
  1107: { id: 1107, name: 'Inter Miami CF', shortName: 'Inter Miami', tla: 'MIA', crest: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=150&auto=format&fit=crop', founded: 2018, venue: 'Chase Stadium', coach: 'Javier Mascherano', website: 'https://www.intermiamicf.com', country: 'United States', clubColors: 'Pink / Black' },
  1108: { id: 1108, name: 'Al Nassr FC', shortName: 'Al Nassr', tla: 'NAS', crest: 'https://crests.thefootball-data.org/SPL.png', founded: 1955, venue: 'Al-Awwal Park', coach: 'Stefano Pioli', website: 'https://www.alnassr.sa', country: 'Saudi Arabia', clubColors: 'Yellow / Blue' }
};

export const STANDINGS: Record<string, StandingEntry[]> = {
  PL: [
    { position: 1, team: TEAMS[64], playedGames: 20, won: 15, draw: 3, lost: 2, points: 48, goalsFor: 44, goalsAgainst: 16, goalDifference: 28, form: 'W,W,W,D,W' },
    { position: 2, team: TEAMS[57], playedGames: 20, won: 13, draw: 4, lost: 3, points: 43, goalsFor: 40, goalsAgainst: 18, goalDifference: 22, form: 'W,L,W,W,D' },
    { position: 3, team: TEAMS[654], playedGames: 20, won: 12, draw: 5, lost: 3, points: 41, goalsFor: 48, goalsAgainst: 22, goalDifference: 26, form: 'L,W,D,W,W' },
    { position: 4, team: TEAMS[61], playedGames: 20, won: 11, draw: 5, lost: 4, points: 38, goalsFor: 38, goalsAgainst: 24, goalDifference: 14, form: 'W,W,D,L,W' },
    { position: 5, team: TEAMS[67], playedGames: 20, won: 10, draw: 5, lost: 5, points: 35, goalsFor: 32, goalsAgainst: 22, goalDifference: 10, form: 'L,W,W,D,L' },
    { position: 6, team: TEAMS[62], playedGames: 20, won: 9, draw: 4, lost: 7, points: 31, goalsFor: 28, goalsAgainst: 26, goalDifference: 2, form: 'W,D,L,W,L' }
  ],
  PD: [
    { position: 1, team: TEAMS[65], playedGames: 19, won: 16, draw: 1, lost: 2, points: 49, goalsFor: 52, goalsAgainst: 15, goalDifference: 37, form: 'W,W,W,D,W' },
    { position: 2, team: TEAMS[86], playedGames: 19, won: 14, draw: 3, lost: 2, points: 45, goalsFor: 42, goalsAgainst: 14, goalDifference: 28, form: 'W,W,L,W,W' },
    { position: 3, team: { id: 78, name: 'Club Atlético de Madrid', shortName: 'Atleti', tla: 'ATM', crest: 'https://crests.thefootball-data.org/78.png' }, playedGames: 19, won: 12, draw: 5, lost: 2, points: 41, goalsFor: 32, goalsAgainst: 13, goalDifference: 19, form: 'D,W,W,W,L' },
    { position: 4, team: { id: 90, name: 'Real Betis Balompié', shortName: 'Real Betis', tla: 'BET', crest: 'https://crests.thefootball-data.org/90.png' }, playedGames: 19, won: 10, draw: 5, lost: 4, points: 35, goalsFor: 28, goalsAgainst: 20, goalDifference: 8, form: 'W,D,W,L,D' }
  ],
  SA: [
    { position: 1, team: TEAMS[108], playedGames: 19, won: 14, draw: 3, lost: 2, points: 45, goalsFor: 40, goalsAgainst: 12, goalDifference: 28, form: 'W,W,D,W,W' },
    { position: 2, team: TEAMS[109], playedGames: 19, won: 13, draw: 5, lost: 1, points: 44, goalsFor: 35, goalsAgainst: 11, goalDifference: 24, form: 'W,W,W,D,D' },
    { position: 3, team: TEAMS[113], playedGames: 19, won: 12, draw: 4, lost: 3, points: 40, goalsFor: 31, goalsAgainst: 15, goalDifference: 16, form: 'W,L,W,W,W' }
  ],
  BL1: [
    { position: 1, team: TEAMS[73], playedGames: 17, won: 13, draw: 3, lost: 1, points: 42, goalsFor: 48, goalsAgainst: 14, goalDifference: 34, form: 'W,W,W,D,W' },
    { position: 2, team: { id: 4, name: 'Borussia Dortmund', shortName: 'Dortmund', tla: 'BVB', crest: 'https://crests.thefootball-data.org/4.png' }, playedGames: 17, won: 11, draw: 3, lost: 3, points: 36, goalsFor: 38, goalsAgainst: 20, goalDifference: 18, form: 'L,W,W,D,W' },
    { position: 3, team: { id: 721, name: 'RB Leipzig', shortName: 'RB Leipzig', tla: 'RBL', crest: 'https://crests.thefootball-data.org/721.png' }, playedGames: 17, won: 10, draw: 4, lost: 3, points: 34, goalsFor: 31, goalsAgainst: 16, goalDifference: 15, form: 'W,D,L,W,W' }
  ],
  FL1: [
    { position: 1, team: TEAMS[524], playedGames: 18, won: 14, draw: 3, lost: 1, points: 45, goalsFor: 45, goalsAgainst: 12, goalDifference: 33, form: 'W,W,D,W,W' },
    { position: 2, team: { id: 548, name: 'AS Monaco FC', shortName: 'Monaco', tla: 'ASM', crest: 'https://crests.thefootball-data.org/548.png' }, playedGames: 18, won: 12, draw: 3, lost: 3, points: 39, goalsFor: 34, goalsAgainst: 16, goalDifference: 18, form: 'W,L,W,W,D' }
  ]
};

export const PLAYERS: Record<number, Player> = {
  1: {
    id: 1, name: 'Erling Haaland', nationality: 'Norway', age: 25, height: '1.94m', weight: '88kg', position: 'Forward', currentClub: 'Manchester City FC', marketValue: '€180M',
    biography: 'Erling Haaland is a Norwegian professional footballer who plays as a striker for Premier League club Manchester City and the Norway national team. Known for his speed, strength, and clinical finishing inside the box, he is widely regarded as one of the best strikers in world football.',
    stats: { goals: 22, assists: 4, minutesPlayed: 1680, yellowCards: 2, redCards: 0, passes: 310, dribbles: 45, tackles: 12 },
    career: [
      { season: '2024/25', team: 'Manchester City', apps: 38, goals: 35 },
      { season: '2023/24', team: 'Manchester City', apps: 45, goals: 38 },
      { season: '2022/23', team: 'Manchester City', apps: 53, goals: 52 }
    ]
  },
  2: {
    id: 2, name: 'Kylian Mbappé', nationality: 'France', age: 27, height: '1.78m', weight: '75kg', position: 'Forward', currentClub: 'Real Madrid CF', marketValue: '€180M',
    biography: 'Kylian Mbappé Lottin is a French professional footballer who plays as a forward for La Liga club Real Madrid and captains the France national team. Renowned for his dribbling abilities, exceptional speed, and lethal finishing, he has won multiple Ligue 1 titles, a FIFA World Cup, and a Champions League.',
    stats: { goals: 18, assists: 7, minutesPlayed: 1520, yellowCards: 1, redCards: 0, passes: 480, dribbles: 110, tackles: 8 },
    career: [
      { season: '2024/25', team: 'Real Madrid', apps: 36, goals: 24 },
      { season: '2023/24', team: 'Paris Saint-Germain', apps: 48, goals: 44 },
      { season: '2022/23', team: 'Paris Saint-Germain', apps: 43, goals: 41 }
    ]
  },
  3: {
    id: 3, name: 'Jude Bellingham', nationality: 'England', age: 22, height: '1.86m', weight: '75kg', position: 'Midfielder', currentClub: 'Real Madrid CF', marketValue: '€180M',
    biography: 'Jude Bellingham is an English professional footballer who plays as a midfielder for La Liga club Real Madrid and the England national team. He is highly praised for his maturity, technical skill, vision, and box-to-box capabilities, winning the Kopa Trophy and Golden Boy award.',
    stats: { goals: 10, assists: 9, minutesPlayed: 1610, yellowCards: 4, redCards: 0, passes: 890, dribbles: 75, tackles: 42 },
    career: [
      { season: '2024/25', team: 'Real Madrid', apps: 38, goals: 15 },
      { season: '2023/24', team: 'Real Madrid', apps: 42, goals: 23 },
      { season: '2022/23', team: 'Borussia Dortmund', apps: 42, goals: 14 }
    ]
  },
  4: {
    id: 4, name: 'Kevin De Bruyne', nationality: 'Belgium', age: 34, height: '1.81m', weight: '70kg', position: 'Midfielder', currentClub: 'Manchester City FC', marketValue: '€50M',
    biography: 'Kevin De Bruyne is a Belgian professional footballer who plays as a midfielder for Premier League club Manchester City and captains the Belgium national team. He is widely considered one of the greatest midfielders of his generation and one of the best playmakers in the history of football.',
    stats: { goals: 5, assists: 14, minutesPlayed: 1220, yellowCards: 1, redCards: 0, passes: 1150, dribbles: 35, tackles: 18 },
    career: [
      { season: '2024/25', team: 'Manchester City', apps: 28, goals: 6 },
      { season: '2023/24', team: 'Manchester City', apps: 26, goals: 6 },
      { season: '2022/23', team: 'Manchester City', apps: 49, goals: 10 }
    ]
  },
  5: {
    id: 5, name: 'Vinícius Júnior', nationality: 'Brazil', age: 25, height: '1.76m', weight: '73kg', position: 'Forward', currentClub: 'Real Madrid CF', marketValue: '€160M',
    biography: 'Vinícius José Paixão de Oliveira Júnior, commonly known as Vinícius Júnior or Vini Jr., is a Brazilian professional footballer who plays as a winger for La Liga club Real Madrid and the Brazil national team. He is known for his explosive acceleration, dribbling skills, and playmaking ability.',
    stats: { goals: 15, assists: 11, minutesPlayed: 1480, yellowCards: 3, redCards: 0, passes: 650, dribbles: 145, tackles: 15 },
    career: [
      { season: '2024/25', team: 'Real Madrid', apps: 39, goals: 21 },
      { season: '2023/24', team: 'Real Madrid', apps: 39, goals: 24 },
      { season: '2022/23', team: 'Real Madrid', apps: 55, goals: 23 }
    ]
  },
  6: {
    id: 6, name: 'Lionel Messi', nationality: 'Argentina', age: 38, height: '1.70m', weight: '72kg', position: 'Forward', currentClub: 'Inter Miami CF', marketValue: '€30M',
    biography: 'Lionel Andrés Messi, also known as Leo Messi, is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team. Widely regarded as one of the greatest players of all time, Messi has won a record eight Ballon d\'Or awards.',
    stats: { goals: 19, assists: 12, minutesPlayed: 1400, yellowCards: 0, redCards: 0, passes: 750, dribbles: 95, tackles: 4 },
    career: [
      { season: '2024', team: 'Inter Miami', apps: 25, goals: 23 },
      { season: '2023', team: 'Inter Miami', apps: 14, goals: 11 },
      { season: '2022/23', team: 'Paris Saint-Germain', apps: 41, goals: 21 }
    ]
  },
  7: {
    id: 7, name: 'Cristiano Ronaldo', nationality: 'Portugal', age: 41, height: '1.87m', weight: '83kg', position: 'Forward', currentClub: 'Al Nassr FC', marketValue: '€15M',
    biography: 'Cristiano Ronaldo dos Santos Aveiro is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team. He has won five Ballon d\'Or awards and holds the records for most appearances, goals, and assists in the Champions League.',
    stats: { goals: 25, assists: 5, minutesPlayed: 1550, yellowCards: 2, redCards: 0, passes: 410, dribbles: 30, tackles: 2 },
    career: [
      { season: '24/25', team: 'Al Nassr', apps: 31, goals: 28 },
      { season: '23/24', team: 'Al Nassr', apps: 41, goals: 42 },
      { season: '22/23', team: 'Al Nassr', apps: 19, goals: 14 }
    ]
  }
};

export const SQUADS: Record<number, Player[]> = {
  86: [PLAYERS[2], PLAYERS[3], PLAYERS[5], { id: 8601, name: 'Thibaut Courtois', position: 'Goalkeeper', shirtNumber: 1, stats: { goals: 0, assists: 0, minutesPlayed: 1440, yellowCards: 0, redCards: 0, cleanSheets: 11 } }, { id: 8602, name: 'Antonio Rüdiger', position: 'Defender', shirtNumber: 22 }, { id: 8603, name: 'Federico Valverde', position: 'Midfielder', shirtNumber: 8 }, { id: 8604, name: 'Rodrygo Goes', position: 'Forward', shirtNumber: 11 }],
  654: [PLAYERS[1], PLAYERS[4], { id: 65401, name: 'Ederson Moraes', position: 'Goalkeeper', shirtNumber: 31, stats: { goals: 0, assists: 0, minutesPlayed: 1530, yellowCards: 1, redCards: 0, cleanSheets: 9 } }, { id: 65402, name: 'Rúben Dias', position: 'Defender', shirtNumber: 3 }, { id: 65403, name: 'Rodri (Rodrigo Hernández)', position: 'Midfielder', shirtNumber: 16 }, { id: 65404, name: 'Bernardo Silva', position: 'Midfielder', shirtNumber: 20 }, { id: 65405, name: 'Phil Foden', position: 'Forward', shirtNumber: 47 }],
  64: [{ id: 6401, name: 'Mohamed Salah', position: 'Forward', shirtNumber: 11, nationality: 'Egypt', stats: { goals: 16, assists: 10, minutesPlayed: 1580, yellowCards: 1, redCards: 0 } }, { id: 6402, name: 'Alisson Becker', position: 'Goalkeeper', shirtNumber: 1, stats: { goals: 0, assists: 0, minutesPlayed: 1350, yellowCards: 0, redCards: 0, cleanSheets: 10 } }, { id: 6403, name: 'Virgil van Dijk', position: 'Defender', shirtNumber: 4 }, { id: 6404, name: 'Alexis Mac Allister', position: 'Midfielder', shirtNumber: 10 }, { id: 6405, name: 'Luis Díaz', position: 'Forward', shirtNumber: 7 }],
  57: [{ id: 5701, name: 'Bukayo Saka', position: 'Forward', shirtNumber: 7, stats: { goals: 12, assists: 11, minutesPlayed: 1620, yellowCards: 1, redCards: 0 } }, { id: 5702, name: 'David Raya', position: 'Goalkeeper', shirtNumber: 22, stats: { goals: 0, assists: 0, minutesPlayed: 1800, yellowCards: 1, redCards: 0, cleanSheets: 12 } }, { id: 5703, name: 'William Saliba', position: 'Defender', shirtNumber: 2 }, { id: 5704, name: 'Declan Rice', position: 'Midfielder', shirtNumber: 41 }, { id: 5705, name: 'Martin Ødegaard', position: 'Midfielder', shirtNumber: 8 }],
  73: [{ id: 7301, name: 'Harry Kane', position: 'Forward', shirtNumber: 9, stats: { goals: 21, assists: 6, minutesPlayed: 1490, yellowCards: 1, redCards: 0 } }, { id: 7302, name: 'Manuel Neuer', position: 'Goalkeeper', shirtNumber: 1 }, { id: 7303, name: 'Jamal Musiala', position: 'Midfielder', shirtNumber: 42 }, { id: 7304, name: 'Joshua Kimmich', position: 'Midfielder', shirtNumber: 6 }],
  1107: [PLAYERS[6], { id: 110701, name: 'Luis Suárez', position: 'Forward', shirtNumber: 9 }, { id: 110702, name: 'Sergio Busquets', position: 'Midfielder', shirtNumber: 5 }, { id: 110703, name: 'Jordi Alba', position: 'Defender', shirtNumber: 18 }],
  1108: [PLAYERS[7], { id: 110801, name: 'Sadio Mané', position: 'Forward', shirtNumber: 10 }, { id: 110802, name: 'Aymeric Laporte', position: 'Defender', shirtNumber: 27 }, { id: 110803, name: 'Marcelo Brozović', position: 'Midfielder', shirtNumber: 77 }]
};

export const NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Ancelotti Confirms Mbappe Fully Fit for UCL Clash with Man City',
    summary: 'Real Madrid manager Carlo Ancelotti has put all fitness concerns to rest, confirming Kylian Mbappé is in optimal condition and will spearhead the Merengues attack in tomorrow\'s blockbuster Champions League clash against Manchester City.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
    source: 'FutIA News',
    date: '2026-07-06T15:00:00Z',
    competition: 'UEFA Champions League',
    country: 'Europe',
    category: 'Match Preview'
  },
  {
    id: 'n2',
    title: 'Erling Haaland Breaks Yet Another Premier League Scoring Benchmark',
    summary: 'With his magnificent hat-trick against Chelsea at the Stamford Bridge, Manchester City striker Erling Haaland has set a brand new benchmark for the fastest player to score 80 Premier League goals, cementing his name in English football lore.',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop',
    source: 'Premier League Gazette',
    date: '2026-07-06T12:30:00Z',
    competition: 'Premier League',
    country: 'England',
    category: 'Records'
  },
  {
    id: 'n3',
    title: 'Inter Miami Eyes Major Summer Reinforcements Around Lionel Messi',
    summary: 'Rumours in South Florida suggest Inter Miami is actively negotiating with several high-profile European free agents to reinforce their defensive line and midfield before the Leagues Cup campaign kicks off in August, aiming to secure another trophy for Lionel Messi.',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop',
    source: 'MLS Updates',
    date: '2026-07-05T18:45:00Z',
    competition: 'Major League Soccer',
    country: 'United States',
    category: 'Transfers'
  },
  {
    id: 'n4',
    title: 'Tactical Breakdown: How Hansi Flick Revitalized Barcelona\'s High Press',
    summary: 'We take a deep look at the tactical adjustments and high-intensity counter-pressing structure introduced by Hansi Flick at Barcelona, which has seen the Blaugrana ascend to the top of La Liga with a massive goal differential.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
    source: 'FutIA Tactical Board',
    date: '2026-07-05T09:15:00Z',
    competition: 'La Liga',
    country: 'Spain',
    category: 'Tactics'
  },
  {
    id: 'n5',
    title: 'Saudi Pro League Sets Sights on Top Premier League Captains For Summer Window',
    summary: 'Multiple Saudi Arabian delegates have reportedly arrived in London to initiate contact with at least three high-profile Premier League captains, preparing staggering salary proposals to continue the league\'s aggressive globalization.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop',
    source: 'Global Football Insider',
    date: '2026-07-04T16:20:00Z',
    competition: 'Saudi Pro League',
    country: 'Saudi Arabia',
    category: 'Transfers'
  },
  {
    id: 'n6',
    title: 'Flamengo Dominate Palmeiras in Classic Brasileirão Série A Showdown',
    summary: 'A packed Maracanã Stadium witnessed a masterclass of South American football, as Flamengo outclassed defending champions Palmeiras 3-1, with a spectacular brace from their star forward to move within two points of the top.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
    source: 'Samba Football Daily',
    date: '2026-07-04T02:10:00Z',
    competition: 'Brasileirão Série A',
    country: 'Brazil',
    category: 'Match Report'
  }
];

export const TRANSFERS: Transfer[] = [
  { id: 't1', playerName: 'Kylian Mbappé', playerAge: 25, playerPosition: 'Forward', fromTeam: { name: 'Paris Saint-Germain', crest: 'https://crests.thefootball-data.org/524.png' }, toTeam: { name: 'Real Madrid CF', crest: 'https://crests.thefootball-data.org/86.png' }, value: 'Free', type: 'Confirmed', date: '2025-07-01' },
  { id: 't2', playerName: 'Viktor Gyökeres', playerAge: 27, playerPosition: 'Forward', fromTeam: { name: 'Sporting CP', crest: 'https://crests.thefootball-data.org/507.png' }, toTeam: { name: 'Arsenal FC', crest: 'https://crests.thefootball-data.org/57.png' }, value: '€85M', type: 'Rumour', date: '2026-07-06' },
  { id: 't3', playerName: 'Trent Alexander-Arnold', playerAge: 27, playerPosition: 'Defender', fromTeam: { name: 'Liverpool FC', crest: 'https://crests.thefootball-data.org/64.png' }, toTeam: { name: 'Real Madrid CF', crest: 'https://crests.thefootball-data.org/86.png' }, value: 'Free', type: 'Rumour', date: '2026-07-05' },
  { id: 't4', playerName: 'Alphonso Davies', playerAge: 25, playerPosition: 'Defender', fromTeam: { name: 'FC Bayern München', crest: 'https://crests.thefootball-data.org/73.png' }, toTeam: { name: 'Real Madrid CF', crest: 'https://crests.thefootball-data.org/86.png' }, value: 'Free', type: 'Confirmed', date: '2025-07-01' },
  { id: 't5', playerName: 'Leroy Sané', playerAge: 30, playerPosition: 'Midfielder', fromTeam: { name: 'FC Bayern München', crest: 'https://crests.thefootball-data.org/73.png' }, toTeam: { name: 'Newcastle United FC', crest: 'https://crests.thefootball-data.org/67.png' }, value: 'Free', type: 'Confirmed', date: '2026-07-01' },
  { id: 't6', playerName: 'Neymar Jr', playerAge: 34, playerPosition: 'Forward', fromTeam: { name: 'Al Hilal SFC', crest: 'https://crests.thefootball-data.org/SPL.png' }, toTeam: { name: 'Santos FC', crest: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=150&auto=format&fit=crop' }, value: 'Free', type: 'Rumour', date: '2026-07-04' },
  { id: 't7', playerName: 'Paul Pogba', playerAge: 33, playerPosition: 'Midfielder', fromTeam: { name: 'Free Agent', crest: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=150&auto=format&fit=crop' }, toTeam: { name: 'Inter Miami CF', crest: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=150&auto=format&fit=crop' }, value: 'Free', type: 'Confirmed', date: '2026-06-30' },
  { id: 't8', playerName: 'Claudio Echeverri', playerAge: 20, playerPosition: 'Midfielder', fromTeam: { name: 'River Plate', crest: 'https://crests.thefootball-data.org/CLI.png' }, toTeam: { name: 'Manchester City FC', crest: 'https://crests.thefootball-data.org/654.png' }, value: 'Loan Return', type: 'Loan', date: '2026-07-01' }
];

export const MATCHES: Match[] = [
  {
    id: 101,
    utcDate: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // Started 35 mins ago
    status: 'IN_PLAY',
    matchday: 4,
    stage: 'GROUP_STAGE',
    group: 'Group A',
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[86], // Real Madrid
    awayTeam: TEAMS[654], // Man City
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: { home: 2, away: 1 },
      halfTime: { home: 1, away: 1 }
    },
    competition: { id: 2001, name: 'UEFA Champions League', code: 'CL' },
    minute: 35,
    stats: {
      possession: { home: 44, away: 56 },
      shots: { home: 8, away: 9 },
      shotsOnTarget: { home: 5, away: 3 },
      corners: { home: 3, away: 4 },
      fouls: { home: 5, away: 4 },
      offside: { home: 1, away: 2 },
      yellowCards: { home: 1, away: 0 },
      redCards: { home: 0, away: 0 },
      expectedGoals: { home: 1.45, away: 1.12 }
    },
    lineups: {
      home: {
        coach: 'Carlo Ancelotti',
        formation: '4-3-3',
        startingXI: [
          { id: 8601, name: 'Courtois', position: 'GK', shirtNumber: 1 },
          { id: 8611, name: 'Carvajal', position: 'DF', shirtNumber: 2 },
          { id: 8602, name: 'Rüdiger', position: 'DF', shirtNumber: 22 },
          { id: 8612, name: 'Militão', position: 'DF', shirtNumber: 3 },
          { id: 8613, name: 'Mendy', position: 'DF', shirtNumber: 23 },
          { id: 8603, name: 'Valverde', position: 'MF', shirtNumber: 8 },
          { id: 8614, name: 'Tchouaméni', position: 'MF', shirtNumber: 14 },
          { id: 3, name: 'Jude Bellingham', position: 'MF', shirtNumber: 5 },
          { id: 8604, name: 'Rodrygo', position: 'FW', shirtNumber: 11 },
          { id: 2, name: 'Kylian Mbappé', position: 'FW', shirtNumber: 9 },
          { id: 5, name: 'Vinícius Jr', position: 'FW', shirtNumber: 7 }
        ],
        bench: [
          { id: 8615, name: 'Lunin', position: 'GK', shirtNumber: 13 },
          { id: 8616, name: 'Modrić', position: 'MF', shirtNumber: 10 },
          { id: 8617, name: 'Camavinga', position: 'MF', shirtNumber: 6 },
          { id: 8618, name: 'Güler', position: 'MF', shirtNumber: 15 },
          { id: 8619, name: 'Endrick', position: 'FW', shirtNumber: 16 }
        ]
      },
      away: {
        coach: 'Pep Guardiola',
        formation: '4-2-3-1',
        startingXI: [
          { id: 65401, name: 'Ederson', position: 'GK', shirtNumber: 31 },
          { id: 65411, name: 'Walker', position: 'DF', shirtNumber: 2 },
          { id: 65402, name: 'Rúben Dias', position: 'DF', shirtNumber: 3 },
          { id: 65412, name: 'Akanji', position: 'DF', shirtNumber: 25 },
          { id: 65413, name: 'Gvardiol', position: 'DF', shirtNumber: 24 },
          { id: 65403, name: 'Rodri', position: 'MF', shirtNumber: 16 },
          { id: 65414, name: 'Kovačić', position: 'MF', shirtNumber: 8 },
          { id: 65404, name: 'Bernardo Silva', position: 'MF', shirtNumber: 20 },
          { id: 4, name: 'Kevin De Bruyne', position: 'MF', shirtNumber: 17 },
          { id: 65405, name: 'Phil Foden', position: 'FW', shirtNumber: 47 },
          { id: 1, name: 'Erling Haaland', position: 'FW', shirtNumber: 9 }
        ],
        bench: [
          { id: 65415, name: 'Ortega', position: 'GK', shirtNumber: 18 },
          { id: 65416, name: 'Stones', position: 'DF', shirtNumber: 5 },
          { id: 65417, name: 'Grealish', position: 'FW', shirtNumber: 10 },
          { id: 65418, name: 'Doku', position: 'FW', shirtNumber: 11 },
          { id: 65419, name: 'Savinho', position: 'FW', shirtNumber: 26 }
        ]
      }
    },
    events: {
      goals: [
        { minute: 12, team: TEAMS[654], player: { name: 'Erling Haaland' }, assist: { name: 'Kevin De Bruyne' } },
        { minute: 21, team: TEAMS[86], player: { name: 'Kylian Mbappé' }, assist: { name: 'Vinícius Jr' } },
        { minute: 32, team: TEAMS[86], player: { name: 'Jude Bellingham' } }
      ],
      cards: [
        { minute: 28, team: TEAMS[86], player: { name: 'Antonio Rüdiger' }, type: 'YELLOW' }
      ],
      subs: []
    },
    timeline: [
      { minute: 1, type: 'KICKOFF', description: 'Match started!' },
      { minute: 12, type: 'GOAL', teamId: 654, description: 'GOAL! Erling Haaland drills it home after a beautiful pass from Kevin De Bruyne.', playerName: 'Erling Haaland', detail: '0-1' },
      { minute: 21, type: 'GOAL', teamId: 86, description: 'GOAL! Kylian Mbappé equalizes with a superb curling effort into the top corner.', playerName: 'Kylian Mbappé', detail: '1-1' },
      { minute: 28, type: 'CARD', teamId: 86, description: 'Yellow Card for Antonio Rüdiger for a late challenge on Erling Haaland.', playerName: 'Antonio Rüdiger', detail: 'YELLOW' },
      { minute: 32, type: 'GOAL', teamId: 86, description: 'GOAL! Jude Bellingham pounces on a defensive mistake to put Real Madrid in front.', playerName: 'Jude Bellingham', detail: '2-1' }
    ]
  },
  {
    id: 102,
    utcDate: new Date(Date.now() - 75 * 60 * 1000).toISOString(), // Started 75 mins ago (paused / half-time or late 2nd half)
    status: 'IN_PLAY',
    matchday: 4,
    stage: 'GROUP_STAGE',
    group: 'Group B',
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[65], // Barcelona
    awayTeam: TEAMS[73], // Bayern
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: { home: 2, away: 2 },
      halfTime: { home: 1, away: 2 }
    },
    competition: { id: 2001, name: 'UEFA Champions League', code: 'CL' },
    minute: 75,
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 14, away: 8 },
      shotsOnTarget: { home: 7, away: 4 },
      corners: { home: 6, away: 2 },
      fouls: { home: 8, away: 11 },
      offside: { home: 3, away: 5 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
      expectedGoals: { home: 1.82, away: 1.05 }
    },
    lineups: {
      home: {
        coach: 'Hansi Flick',
        formation: '4-2-3-1',
        startingXI: [
          { id: 6501, name: 'Ter Stegen', position: 'GK', shirtNumber: 1 },
          { id: 6511, name: 'Koundé', position: 'DF', shirtNumber: 23 },
          { id: 6512, name: 'Cubarsí', position: 'DF', shirtNumber: 2 },
          { id: 6513, name: 'Iñigo Martínez', position: 'DF', shirtNumber: 5 },
          { id: 6514, name: 'Balde', position: 'DF', shirtNumber: 3 },
          { id: 6515, name: 'Pedri', position: 'MF', shirtNumber: 8 },
          { id: 6516, name: 'Casadó', position: 'MF', shirtNumber: 17 },
          { id: 6517, name: 'Lamine Yamal', position: 'FW', shirtNumber: 19 },
          { id: 6518, name: 'Dani Olmo', position: 'MF', shirtNumber: 10 },
          { id: 6519, name: 'Raphinha', position: 'FW', shirtNumber: 11 },
          { id: 6520, name: 'Lewandowski', position: 'FW', shirtNumber: 9 }
        ],
        bench: []
      },
      away: {
        coach: 'Vincent Kompany',
        formation: '4-2-3-1',
        startingXI: [
          { id: 7302, name: 'Neuer', position: 'GK', shirtNumber: 1 },
          { id: 7311, name: 'Guerreiro', position: 'DF', shirtNumber: 22 },
          { id: 7312, name: 'Upamecano', position: 'DF', shirtNumber: 2 },
          { id: 7313, name: 'Kim Min-jae', position: 'DF', shirtNumber: 3 },
          { id: 7314, name: 'Davies', position: 'DF', shirtNumber: 19 },
          { id: 7304, name: 'Kimmich', position: 'MF', shirtNumber: 6 },
          { id: 7315, name: 'Pavlović', position: 'MF', shirtNumber: 45 },
          { id: 7316, name: 'Sané', position: 'FW', shirtNumber: 10 },
          { id: 7303, name: 'Musiala', position: 'MF', shirtNumber: 42 },
          { id: 7317, name: 'Gnabry', position: 'FW', shirtNumber: 7 },
          { id: 7301, name: 'Harry Kane', position: 'FW', shirtNumber: 9 }
        ],
        bench: []
      }
    },
    events: {
      goals: [
        { minute: 5, team: TEAMS[73], player: { name: 'Harry Kane' } },
        { minute: 28, team: TEAMS[73], player: { name: 'Jamal Musiala' }, assist: { name: 'Harry Kane' } },
        { minute: 42, team: TEAMS[65], player: { name: 'Raphinha' }, assist: { name: 'Lamine Yamal' } },
        { minute: 61, team: TEAMS[65], player: { name: 'Robert Lewandowski' }, assist: { name: 'Pedri' } }
      ],
      cards: [],
      subs: []
    },
    timeline: [
      { minute: 1, type: 'KICKOFF', description: 'Match started!' },
      { minute: 5, type: 'GOAL', teamId: 73, description: 'GOAL! Harry Kane opens the scoring with a thunderous strike.', playerName: 'Harry Kane', detail: '0-1' },
      { minute: 28, type: 'GOAL', teamId: 73, description: 'GOAL! Jamal Musiala doubles the lead after a slick combination with Harry Kane.', playerName: 'Jamal Musiala', detail: '0-2' },
      { minute: 42, type: 'GOAL', teamId: 65, description: 'GOAL! Raphinha pulls one back for Barcelona with a superb run and finish.', playerName: 'Raphinha', detail: '1-2' },
      { minute: 45, type: 'HALFTIME', description: 'Halftime whistle' },
      { minute: 61, type: 'GOAL', teamId: 65, description: 'GOAL! Robert Lewandowski scores the equalizer against his former club!', playerName: 'Robert Lewandowski', detail: '2-2' }
    ]
  },
  {
    id: 103,
    utcDate: new Date(Date.now() + 120 * 60 * 1000).toISOString(), // Starts in 2 hours
    status: 'SCHEDULED',
    matchday: 21,
    stage: 'REGULAR_SEASON',
    group: null,
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[64], // Liverpool
    awayTeam: TEAMS[57], // Arsenal
    score: { winner: null, duration: 'REGULAR', fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
    competition: { id: 2021, name: 'Premier League', code: 'PL' }
  },
  {
    id: 104,
    utcDate: new Date(Date.now() + 240 * 60 * 1000).toISOString(), // Starts in 4 hours
    status: 'SCHEDULED',
    matchday: 21,
    stage: 'REGULAR_SEASON',
    group: null,
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[62], // Man United
    awayTeam: TEAMS[61], // Chelsea
    score: { winner: null, duration: 'REGULAR', fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
    competition: { id: 2021, name: 'Premier League', code: 'PL' }
  },
  {
    id: 105,
    utcDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // Finished 3 days ago
    status: 'FINISHED',
    matchday: 20,
    stage: 'REGULAR_SEASON',
    group: null,
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[654], // Man City
    awayTeam: TEAMS[62], // Man United
    score: {
      winner: 'HOME_TEAM',
      duration: 'REGULAR',
      fullTime: { home: 3, away: 1 },
      halfTime: { home: 1, away: 1 }
    },
    competition: { id: 2021, name: 'Premier League', code: 'PL' },
    minute: 90,
    stats: {
      possession: { home: 65, away: 35 },
      shots: { home: 22, away: 6 },
      shotsOnTarget: { home: 9, away: 2 },
      corners: { home: 11, away: 2 },
      fouls: { home: 7, away: 12 },
      offside: { home: 2, away: 3 },
      yellowCards: { home: 0, away: 3 },
      redCards: { home: 0, away: 0 }
    },
    events: {
      goals: [
        { minute: 8, team: TEAMS[62], player: { name: 'Bruno Fernandes' } },
        { minute: 56, team: TEAMS[654], player: { name: 'Erling Haaland' }, assist: { name: 'Kevin De Bruyne' } },
        { minute: 71, team: TEAMS[654], player: { name: 'Phil Foden' }, assist: { name: 'Bernardo Silva' } },
        { minute: 88, team: TEAMS[654], player: { name: 'Erling Haaland' } }
      ],
      cards: [],
      subs: []
    }
  },
  {
    id: 106,
    utcDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Finished 2 days ago
    status: 'FINISHED',
    matchday: 19,
    stage: 'REGULAR_SEASON',
    group: null,
    lastUpdated: new Date().toISOString(),
    homeTeam: TEAMS[86], // Real Madrid
    awayTeam: TEAMS[65], // Barcelona
    score: {
      winner: 'DRAW',
      duration: 'REGULAR',
      fullTime: { home: 2, away: 2 },
      halfTime: { home: 1, away: 0 }
    },
    competition: { id: 2014, name: 'La Liga', code: 'PD' },
    minute: 90,
    stats: {
      possession: { home: 48, away: 52 },
      shots: { home: 15, away: 16 },
      shotsOnTarget: { home: 6, away: 8 },
      corners: { home: 5, away: 6 },
      fouls: { home: 14, away: 13 },
      offside: { home: 4, away: 2 },
      yellowCards: { home: 3, away: 2 },
      redCards: { home: 0, away: 0 }
    },
    events: {
      goals: [
        { minute: 32, team: TEAMS[86], player: { name: 'Jude Bellingham' } },
        { minute: 52, team: TEAMS[65], player: { name: 'Robert Lewandowski' } },
        { minute: 67, team: TEAMS[65], player: { name: 'Lamine Yamal' } },
        { minute: 85, team: TEAMS[86], player: { name: 'Vinícius Jr' } }
      ],
      cards: [],
      subs: []
    }
  }
];

export const SCORERS: Record<string, { player: { name: string; position: string }; team: Team; goals: number; assists: number }[]> = {
  PL: [
    { player: { name: 'Erling Haaland', position: 'Forward' }, team: TEAMS[654], goals: 22, assists: 4 },
    { player: { name: 'Mohamed Salah', position: 'Forward' }, team: TEAMS[64], goals: 16, assists: 10 },
    { player: { name: 'Cole Palmer', position: 'Forward' }, team: TEAMS[61], goals: 14, assists: 8 },
    { player: { name: 'Bukayo Saka', position: 'Forward' }, team: TEAMS[57], goals: 12, assists: 11 },
    { player: { name: 'Ollie Watkins', position: 'Forward' }, team: { id: 58, name: 'Aston Villa FC', shortName: 'Aston Villa', crest: 'https://crests.thefootball-data.org/58.png', tla: 'AVL' }, goals: 11, assists: 5 }
  ],
  PD: [
    { player: { name: 'Robert Lewandowski', position: 'Forward' }, team: TEAMS[65], goals: 19, assists: 3 },
    { player: { name: 'Kylian Mbappé', position: 'Forward' }, team: TEAMS[86], goals: 18, assists: 7 },
    { player: { name: 'Vinícius Júnior', position: 'Forward' }, team: TEAMS[86], goals: 15, assists: 11 },
    { player: { name: 'Raphinha', position: 'Forward' }, team: TEAMS[65], goals: 12, assists: 8 },
    { player: { name: 'Antoine Griezmann', position: 'Forward' }, team: { id: 78, name: 'Club Atlético de Madrid', shortName: 'Atleti', crest: 'https://crests.thefootball-data.org/78.png', tla: 'ATM' }, goals: 11, assists: 6 }
  ],
  CL: [
    { player: { name: 'Harry Kane', position: 'Forward' }, team: TEAMS[73], goals: 8, assists: 2 },
    { player: { name: 'Erling Haaland', position: 'Forward' }, team: TEAMS[654], goals: 7, assists: 1 },
    { player: { name: 'Kylian Mbappé', position: 'Forward' }, team: TEAMS[86], goals: 6, assists: 2 },
    { player: { name: 'Raphinha', position: 'Forward' }, team: TEAMS[65], goals: 5, assists: 4 }
  ]
};

export const QUIZ_QUESTIONS = [
  { id: 1, question: 'Which country won the first FIFA World Cup in 1930?', options: ['Argentina', 'Brazil', 'Uruguay', 'Italy'], answer: 'Uruguay', explanation: 'Uruguay won the inaugural FIFA World Cup on home soil, defeating Argentina 4-2 in the final in Montevideo.' },
  { id: 2, question: 'Who is the all-time top scorer in UEFA Champions League history?', options: ['Lionel Messi', 'Cristiano Ronaldo', 'Robert Lewandowski', 'Raúl'], answer: 'Cristiano Ronaldo', explanation: 'Cristiano Ronaldo is the Champions League top goalscorer of all time with 140 goals.' },
  { id: 3, question: 'Which club has won the most UEFA Champions League titles?', options: ['AC Milan', 'FC Bayern München', 'FC Barcelona', 'Real Madrid CF'], answer: 'Real Madrid CF', explanation: 'Real Madrid holds the record for the most Champions League victories, having won the prestigious tournament 15 times.' },
  { id: 4, question: 'Who was known as "The Divine Baldy" and refereed the 2002 World Cup final?', options: ['Pierluigi Collina', 'Howard Webb', 'Mark Clattenburg', 'Nestor Pitana'], answer: 'Pierluigi Collina', explanation: 'Pierluigi Collina is widely considered the greatest football referee of all time and refereed the 2002 World Cup final.' },
  { id: 5, question: 'Which player holds the record for the most goals scored in a single calendar year?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Pelé', 'Gerd Müller'], answer: 'Lionel Messi', explanation: 'Lionel Messi scored an unbelievable 91 goals in 2012 for Barcelona and Argentina.' }
];

export const FOOTBALL_DICTIONARY = [
  { term: 'Offside', definition: 'A player is in an offside position if they are nearer to the opponent\'s goal line than both the ball and the second-last opponent when the ball is played to them.' },
  { term: 'VAR (Video Assistant Referee)', definition: 'An assistant referee who reviews decisions made by the head referee with the use of video footage and a headset for communication.' },
  { term: 'Hat-trick', definition: 'The achievement of a single player scoring three goals in a single match.' },
  { term: 'Clean sheet', definition: 'A match in which a team prevents their opponents from scoring any goals.' },
  { term: 'Expected Goals (xG)', definition: 'A statistical metric used in football to measure the probability that a shot will result in a goal based on historical data.' },
  { term: 'False Nine', definition: 'A striker who drops deep into midfield, drawing opposition defenders out of position and creating space for wingers to run into.' }
];

export const FACT_OF_THE_DAY = "The fastest goal in World Cup history was scored after just 11 seconds by Turkey's Hakan Şükür against South Korea in the 2002 tournament's third-place match.";
