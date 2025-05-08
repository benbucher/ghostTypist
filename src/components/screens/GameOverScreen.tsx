import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { GhostIcon } from 'lucide-react';

const GameOverScreen: React.FC = () => {
  const { score, mistakesMade, resetGame, timeElapsed } = useGame();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleTryAgain();
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [resetGame]);
  
  const handleTryAgain = () => {
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
          <GhostIcon size={96} className="mx-auto text-red-300/80 animate-pulse" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 tracking-tighter text-red-300">
          The Ghost Caught You!
        </h1>
        
        <div className="text-sky-300 text-xl space-y-2">
          <p>Time Survived: <span className="font-bold">{formatTime(timeElapsed)}</span></p>
          <p>Final Score: <span className="font-bold">{score}</span></p>
          <p>Mistakes Made: <span className="font-bold">{mistakesMade}</span></p>
        </div>
        
        <button 
          onClick={handleTryAgain}
          className="mt-8 px-8 py-3 bg-sky-700 hover:bg-sky-600 text-white rounded-lg text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Try Again
        </button>
        
        <div className="mt-4 text-sky-400/80 text-base hidden md:block">
          <p>Press <kbd className="bg-gray-800 px-2 py-1 rounded font-mono">Enter</kbd> or <kbd className="bg-gray-800 px-2 py-1 rounded font-mono">Space</kbd> to try again</p>
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;