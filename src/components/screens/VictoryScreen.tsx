import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { TrophyIcon } from 'lucide-react';

const VictoryScreen: React.FC = () => {
  const { score, mistakesMade, resetGame, timeElapsed } = useGame();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handlePlayAgain();
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [resetGame]);
  
  const handlePlayAgain = () => {
    resetGame();
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[80vh] relative">
      <div className="relative z-10 space-y-8">
        <div className="animate-float mb-8">
          <TrophyIcon size={96} className="mx-auto text-yellow-300/80 animate-pulse" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-300">
          You Survived!
        </h1>
        
        <div className="text-sky-300 text-xl space-y-2">
          <p>Time Survived: <span className="font-bold">{formatTime(timeElapsed)}</span></p>
          <p>Final Score: <span className="font-bold">{score}</span></p>
          <p>Mistakes Made: <span className="font-bold">{mistakesMade}</span></p>
        </div>
        
        <button 
          onClick={handlePlayAgain}
          className="mt-8 px-8 py-3 bg-sky-700 hover:bg-sky-600 text-white rounded-lg text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Play Again
        </button>
        
        <div className="mt-4 text-sky-400/80 text-sm">
          <p>Press Enter to play again</p>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen