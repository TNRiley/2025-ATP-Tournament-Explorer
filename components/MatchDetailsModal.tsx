
import React from 'react';
import { Match } from '../types';

interface MatchDetailsModalProps {
  match: Match;
  onClose: () => void;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Match Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="space-y-3">
            <div className={`p-3 rounded ${match.winner === match.player1.name ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                <p className="font-semibold text-lg">{match.player1.name} {match.player1.seed ? `(${match.player1.seed})` : ''}</p>
                <p className="text-sm text-gray-400">{match.player1.country}</p>
            </div>
            <div className="text-center font-bold text-gray-400">VS</div>
             <div className={`p-3 rounded ${match.winner === match.player2.name ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                <p className="font-semibold text-lg">{match.player2.name} {match.player2.seed ? `(${match.player2.seed})` : ''}</p>
                <p className="text-sm text-gray-400">{match.player2.country}</p>
            </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="text-md font-semibold text-gray-300">Result</h4>
            <p className="text-2xl font-mono text-green-400 mt-2">{match.score || 'Not available'}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsModal;
