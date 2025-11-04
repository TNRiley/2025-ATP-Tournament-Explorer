
import React, { useState, useMemo } from 'react';
import { Tournament } from '../types';
import { SortIcon, CheckmarkIcon } from './Icons';

interface TournamentsTableProps {
  tournaments: Tournament[];
  onTournamentSelect: (tournament: Tournament) => void;
}

type SortKey = 'name' | 'points' | 'startDate';
type SortOrder = 'asc' | 'desc';

const TournamentsTable: React.FC<TournamentsTableProps> = ({ tournaments, onTournamentSelect }) => {
  const [sortKey, setSortKey] = useState<SortKey>('startDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedTournaments = useMemo(() => {
    return [...tournaments].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      
      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [tournaments, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder(key === 'points' ? 'desc' : 'asc');
    }
  };

  const getPointCategory = (points: number) => {
    if (points === 2000) return 'bg-purple-500/20 text-purple-300';
    if (points === 1500) return 'bg-indigo-500/20 text-indigo-300';
    if (points === 1000) return 'bg-blue-500/20 text-blue-300';
    if (points === 500) return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-green-500/20 text-green-300';
  };

  const isCompleted = (endDate: string) => new Date(endDate) < new Date();
  
  const formatDateRange = (start: string, end: string) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startMonth = startDate.toLocaleString('default', { month: 'short' });
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();

      if (startMonth === endMonth) {
          return `${startMonth} ${startDay} - ${endDay}`;
      }
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  };


  return (
    <div className="w-full">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('name')}>
              <div className="flex items-center">
                Tournament
                <SortIcon className="w-4 h-4 ml-1" />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('startDate')}>
              <div className="flex items-center">
                Date
                <SortIcon className="w-4 h-4 ml-1" />
              </div>
            </th>
            <th scope="col" className="px-4 py-3 cursor-pointer text-center" onClick={() => handleSort('points')}>
              <div className="flex items-center justify-center">
                Points
                <SortIcon className="w-4 h-4 ml-1" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTournaments.map((tournament) => (
            <tr
              key={tournament.id}
              className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors"
              onClick={() => onTournamentSelect(tournament)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center">
                    {isCompleted(tournament.endDate) && (
                        <CheckmarkIcon className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" title="Completed"/>
                    )}
                    <div>
                        <div className="font-medium">{tournament.name}</div>
                        <div className="text-xs text-gray-400">{tournament.locationName}</div>
                    </div>
                </div>
              </td>
              <td className="px-4 py-3 text-xs font-mono text-gray-400">
                {formatDateRange(tournament.startDate, tournament.endDate)}
              </td>
              <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPointCategory(tournament.points)}`}>
                    {tournament.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentsTable;
