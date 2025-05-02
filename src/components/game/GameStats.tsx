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
    <div className="flex justify-between items-center max-w-2xl mx-auto mb-4 bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-800/50">
      <div className="flex items-center space-x-2">
        <Clock size={20} className="text-violet-300" />
        <span className="text-xl font-medium">{formatTime(timeElapsed)}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Star size={20} className="text-yellow-300" />
        <span className="text-xl font-medium">{score}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-red-400 text-xs uppercase font-medium">Mistakes</span>
        <span className="text-xl font-medium">{mistakesMade}</span>
      </div>
    </div>
  );
};

export default GameStats;