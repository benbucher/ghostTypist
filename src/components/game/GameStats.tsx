import React from 'react';
import { useGame } from '../../context/GameContext';
import { Clock, Star } from 'lucide-react';

const GameStats: React.FC = () => {
  const { score, timeElapsed, mistakesMade } = useGame();
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-lg p-2 md:p-4 border border-zinc-800">
      <div className="flex items-center space-x-1 md:space-x-2">
        <Clock size={16} className="text-sky-300 md:scale-125" />
        <span className="text-base md:text-xl font-medium">{formatTime(timeElapsed)}</span>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <Star size={16} className="text-yellow-300 md:scale-125" />
        <span className="text-base md:text-xl font-medium">{score}</span>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <span className="text-red-400 text-[10px] md:text-xs uppercase font-medium">Mistakes</span>
        <span className="text-base md:text-xl font-medium">{mistakesMade}</span>
      </div>
    </div>
  );
};

export default GameStats;