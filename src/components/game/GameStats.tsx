import React from 'react';
import { useGame } from '../../context/GameContext';
import { Hourglass, X, Flame } from 'lucide-react';
import { formatTime } from '../../utils/formatting';

const GameStats: React.FC = () => {
  const { score, timeElapsed, mistakesMade } = useGame();
  
  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-lg p-1 md:p-4 border border-zinc-800">
      <div className="flex items-center space-x-1 md:space-x-2">
        <Hourglass size={16} className="text-ghost md:scale-125" />
        <span className="text-base md:text-xl font-medium">{formatTime(timeElapsed)}</span>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <Flame size={18} className="text-green-400 md:scale-125" />
        <span className="text-base md:text-xl font-medium">{score}</span>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <X size={18} className="text-red-400 md:scale-125" />
        <span className="text-base md:text-xl font-medium">{mistakesMade}</span>
      </div>
    </div>
  );
};

export default GameStats;