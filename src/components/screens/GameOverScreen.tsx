import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { GhostIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="text-center flex flex-col items-center justify-center min-h-[80vh] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative z-10 space-y-8">
        <div className="mb-8 animate-float">
          <GhostIcon 
            size={128}
            strokeWidth={1.8}
            className="mx-auto text-red-300/80 opacity-90 animate-pulse"
          />
        </div>
        
        <motion.h1 
          // className="text-5xl font-bold mb-4 tracking-tighter text-red-300"
          className="text-7xl font-medium mb-4 tracking-tight text-red-300"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Ghost Got You!
        </motion.h1>
        
        <motion.div 
          className="text-zinc-400 text-xl space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Time Survived: <span className="text-zinc-200">{formatTime(timeElapsed)}</span></p>
          <p>Final Score: <span className="text-zinc-200">{score}</span></p>
          <p>Mistakes Made: <span className="text-zinc-200">{mistakesMade}</span></p>
        </motion.div>
        
        <motion.button 
          onClick={handleTryAgain}
          className="px-8 py-3 bg-ghost-dark/90 hover:bg-ghost-dark text-white rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-ghost-dark/20 focus:outline-none focus:ring-2 focus:ring-ghost/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
        
        <motion.div 
          className="mt-4 text-zinc-500 text-base hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>Press 
            <kbd className="bg-gray-800 px-2 py-1 rounded font-mono mx-1">Enter</kbd>
            or 
            <kbd className="bg-gray-800 px-2 py-1 rounded font-mono mx-1">Space</kbd> 
            to try again
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GameOverScreen;