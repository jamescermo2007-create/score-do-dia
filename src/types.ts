export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  founded?: number;
  venue?: string;
  coach?: string;
  website?: string;
  country?: string;
  clubColors?: string;
}

export interface StandingEntry {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form?: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
  area: {
    name: string;
    flag: string;
  };
}

export interface GoalEvent {
  minute: number;
  team: { id: number; name: string };
  player: { name: string };
  assist?: { name: string };
}

export interface CardEvent {
  minute: number;
  team: { id: number; name: string };
  player: { name: string };
  type: 'YELLOW' | 'RED' | 'YELLOW_RED';
}

export interface SubstitutionEvent {
  minute: number;
  team: { id: number; name: string };
  playerOut: { name: string };
  playerIn: { name: string };
}

export interface MatchTimelineEvent {
  minute: number;
  type: 'GOAL' | 'CARD' | 'SUB' | 'VAR' | 'PENALTY_MISSED' | 'KICKOFF' | 'HALFTIME' | 'FULLTIME';
  teamId?: number;
  description: string;
  playerName?: string;
  detail?: string;
}

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  offside: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  expectedGoals?: { home: number; away: number };
}

export interface MatchPlayer {
  id: number;
  name: string;
  position: string;
  shirtNumber: number;
}

export interface MatchLineups {
  home: {
    coach?: string;
    formation: string;
    startingXI: MatchPlayer[];
    bench: MatchPlayer[];
  };
  away: {
    coach?: string;
    formation: string;
    startingXI: MatchPlayer[];
    bench: MatchPlayer[];
  };
}

export interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
    duration: string;
    fullTime: { home: number | null; away: number | null };
    halfTime: { home: number | null; away: number | null };
  };
  competition: {
    id: number;
    name: string;
    code: string;
  };
  // Extended fields for rich features
  minute?: number;
  stats?: MatchStats;
  lineups?: MatchLineups;
  events?: {
    goals: GoalEvent[];
    cards: CardEvent[];
    subs: SubstitutionEvent[];
  };
  timeline?: MatchTimelineEvent[];
}

export interface PlayerStats {
  goals: number;
  assists: number;
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
  passes?: number;
  dribbles?: number;
  tackles?: number;
  cleanSheets?: number;
}

export interface Player {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  position?: string;
  shirtNumber?: number;
  height?: string;
  weight?: string;
  currentClub?: string;
  marketValue?: string;
  biography?: string;
  bio?: string;
  age?: number;
  career?: {
    season: string;
    team: string;
    apps: number;
    goals: number;
  }[];
  stats?: PlayerStats;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  image: string;
  source: string;
  date: string;
  competition: string;
  country: string;
  category: string;
}

export interface Transfer {
  id: string;
  playerName: string;
  playerAge?: number;
  playerPosition?: string;
  fromTeam: { name: string; crest: string };
  toTeam: { name: string; crest: string };
  value: string;
  type: 'Confirmed' | 'Rumour' | 'Free Agent' | 'Loan';
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  groundingLinks?: { title: string; uri: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  favoriteTeams: number[]; // team IDs
  favoritePlayers: number[]; // player IDs
  notifications: {
    goals: boolean;
    kickOff: boolean;
    halfTime: boolean;
    fullTime: boolean;
    transfers: boolean;
    breakingNews: boolean;
  };
  theme: 'dark' | 'light';
  language: string;
}
