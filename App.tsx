import React, { useState, useCallback, useEffect, useRef } from 'react';
import Globe from './components/Globe';
import TournamentsPanel from './components/TournamentsPanel';
import GlobeControls from './components/GlobeControls';
import { Tournament } from './types';
import { TennisBallIcon } from './components/Icons';
import { tournaments } from './data/tournaments';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [panelWidth, setPanelWidth] = useState(window.innerWidth / 3.5);
  const isResizingRef = useRef(false);

  const minPanelWidth = 360;
  const maxPanelWidth = window.innerWidth * 0.6;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleTournamentSelect = (tournament: Tournament | null) => {
    setSelectedTournament(tournament);
    if (tournament) {
      setSelectedMonth(null); // Clear month selection
    }
  };

  const handleMonthSelect = (month: number | null) => {
    setSelectedMonth(month);
    if (month !== null) {
      setSelectedTournament(null); // Clear tournament selection
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
  };

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) {
      return;
    }
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= minPanelWidth && newWidth <= maxPanelWidth) {
      setPanelWidth(newWidth);
    }
  }, [minPanelWidth, maxPanelWidth]);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, handleMouseMove, handleMouseUp]);


  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white font-sans overflow-hidden">
      <header className="absolute top-0 left-0 w-full p-4 z-30 bg-gradient-to-b from-gray-900/80 to-transparent pointer-events-none">
        <div className="flex items-center space-x-3">
          <TennisBallIcon className="w-8 h-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            2025 ATP Tour Globe
          </h1>
        </div>
      </header>
      
      <main className="flex flex-col md:flex-row flex-1 h-full pt-16">
        <div className="h-1/2 md:h-full relative flex-grow overflow-hidden">
           <Globe 
            pinLocation={selectedTournament?.location}
            selectedMonth={selectedMonth}
            tournaments={tournaments}
            />
           <GlobeControls 
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthSelect}
           />
        </div>
        
        {!isMobile && (
          <div
            className="flex-shrink-0 w-1.5 h-full bg-gray-700 cursor-col-resize hover:bg-green-500 transition-colors duration-200"
            onMouseDown={handleMouseDown}
            aria-label="Resize panel"
          />
        )}
        
        <div 
          style={!isMobile ? { width: `${panelWidth}px` } : {}}
          className={`bg-gray-900 flex-shrink-0 overflow-hidden ${isMobile ? 'h-1/2 w-full border-t' : 'h-full border-l'} border-gray-700`}
        >
          <TournamentsPanel onTournamentSelect={handleTournamentSelect} selectedTournament={selectedTournament} />
        </div>
      </main>
      <AIAssistant selectedTournament={selectedTournament} />
    </div>
  );
};

export default App;