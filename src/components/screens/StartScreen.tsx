import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { GhostIcon } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { startGame } = useGame();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startGame();
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [startGame]);
  
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[80vh] relative">
      <div className="relative z-10 space-y-8">
        <div className="animate-float mb-8">
          <GhostIcon size={96} className="mx-auto text-violet-300/80 animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
          Ghost Typist
        </h1>
        
        <p className="text-violet-300 text-xl max-w-lg mx-auto mb-8">
          Type words correctly to keep the ghost away. 
          Make too many mistakes and it will catch you!
        </p>
        
        <button 
          onClick={startGame}
          className="px-8 py-3 bg-violet-700 hover:bg-violet-600 text-white rounded-lg text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          Start Game
        </button>
        
        <div className="mt-4 text-violet-400/80 text-sm">
          <p>Press Enter to start</p>
        </div>
      </div>
    </div>
  );
}

export default StartScreen