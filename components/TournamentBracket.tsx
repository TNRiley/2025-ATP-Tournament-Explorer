import React, { useState } from 'react';
import { Tournament, Match, Player } from '../types';
import MatchDetailsModal from './MatchDetailsModal';

interface TournamentBracketProps {
  tournament: Tournament;
}

const PlayerDisplay: React.FC<{ player: Player; isWinner: boolean }> = ({ player, isWinner }) => (
  <div className={`flex items-center p-2 ${isWinner ? 'font-bold text-white' : 'text-gray-400'}`}>
    <span className="mr-2 text-xs w-5">{player.seed ? `(${player.seed})` : ''}</span>
    <span>{player.name}</span>
    <span className="ml-auto text-xs font-mono">{player.country}</span>
  </div>
);

const TournamentBracket: React.FC<TournamentBracketProps> = ({ tournament }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  if (tournament.draw.length === 0) {
    return <div className="p-8 text-center text-gray-400">Draw not available for this tournament yet.</div>;
  }

  // FIX: The original code used spread syntax `[...]` on a Set, which was causing
  // incorrect type inference (`unknown[]` instead of `number[]`) for `rounds`.
  // Using `Array.from()` provides more reliable type inference in this context,
  // fixing the errors in the sort callback (line 27) and subsequent `.map()` call (line 42).
  const rounds = Array.from(new Set(tournament.draw.map(m => m.round))).sort((a, b) => b - a);

  const getRoundName = (round: number, totalRounds: number): string => {
    if (round === 1) return 'Final';
    if (round === 2) return 'Semi-Finals';
    if (round === 3) return 'Quarter-Finals';
    if (round === 4) return 'Round of 16';
    return `Round ${Math.pow(2, round)}`;
  };
  
  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {rounds.map((round) => (
          <div key={round} className="flex flex-col space-y-4 min-w-[280px]">
            <h3 className="text-lg font-semibold text-center text-gray-300">{getRoundName(round, rounds.length)}</h3>
            {tournament.draw
              .filter((match) => match.round === round)
              .map((match) => (
                <div
                  key={match.id}
                  className="bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => setSelectedMatch(match)}
                >
                  <PlayerDisplay player={match.player1} isWinner={match.winner === match.player1.name} />
                  <div className="border-t border-gray-700"></div>
                  <PlayerDisplay player={match.player2} isWinner={match.winner === match.player2.name} />
                </div>
              ))}
          </div>
        ))}
      </div>
      {selectedMatch && (
        <MatchDetailsModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
};

export default TournamentBracket;
