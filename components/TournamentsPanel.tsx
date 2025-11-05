
import React, { useState, useEffect } from 'react';
import { Tournament } from '../types';
import TournamentsTable from './TournamentsTable';
import TournamentBracket from './TournamentBracket';
import { tournaments } from '../data/tournaments';
import { BackArrowIcon } from './Icons';

interface TournamentsPanelProps {
  onTournamentSelect: (tournament: Tournament | null) => void;
  selectedTournament: Tournament | null;
}

const TournamentsPanel: React.FC<TournamentsPanelProps> = ({ onTournamentSelect, selectedTournament }) => {
  const [view, setView] = useState<'list' | 'bracket'>('list');

  useEffect(() => {
    if (selectedTournament) {
      setView('bracket');
    } else {
      setView('list');
    }
  }, [selectedTournament]);

  const handleSelect = (tournament: Tournament) => {
    onTournamentSelect(tournament);
  };

  const handleGoBack = () => {
    onTournamentSelect(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200">
      <header className="p-4 border-b border-gray-700 flex items-center">
        {view === 'bracket' && (
          <button onClick={handleGoBack} className="mr-4 p-2 rounded-full text-gray-200 hover:bg-gray-700 transition-colors">
            <BackArrowIcon className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-semibold text-white">
          {view === 'list' ? 'ATP Tournaments 2025' : selectedTournament?.name}
        </h2>
      </header>
      <div className="flex-1 overflow-y-auto">
        {view === 'list' ? (
          <TournamentsTable tournaments={tournaments} onTournamentSelect={handleSelect} />
        ) : selectedTournament ? (
          <TournamentBracket tournament={selectedTournament} />
        ) : (
          <div className="p-4 text-center text-gray-400">Select a tournament to see details.</div>
        )}
      </div>
    </div>
  );
};

export default TournamentsPanel;
