
export interface Location {
  lat: number;
  lon: number;
}

export interface Player {
  name: string;
  seed?: number;
  country: string;
}

export interface Match {
  id: string;
  round: number;
  player1: Player;
  player2: Player;
  winner: string | null; // Winner's name
  score: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  locationName: string;
  startDate: string; // e.g., '2025-01-12'
  endDate: string;   // e.g., '2025-01-26'
  // Fix: Added 1500 to the points union type to allow for the ATP Finals tournament value.
  points: 250 | 500 | 1000 | 1500 | 2000;
  winner: string | null;
  location: Location;
  draw: Match[];
}
