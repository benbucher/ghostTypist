import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { GhostIcon, Hourglass, Flame, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatting';

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
            size={96}
            strokeWidth={1.8}
            className="mx-auto text-red-300/80 opacity-90 animate-pulse md:w-32 md:h-32 w-24 h-24"
          />
        </div>
          
        <motion.h1 
          className="text-5xl md:text-7xl font-medium mb-4 tracking-tight text-red-300"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Ghost Got You!
        </motion.h1>
          
          <motion.div 
          className="bg-gray-800 text-zinc-400 text-sm md:text-xl space-y-2 rounded-lg p-4 md:p-6 w-full max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
          <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Flame size={20} className="text-green-400" />
                <span>Score</span>
              </div>
              <span className="text-zinc-200">{score}</span>
            </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Hourglass size={20} className="text-ghost" />
              <span>Time</span>
            </div>
            <span className="text-zinc-200">{formatTime(timeElapsed)}</span>
          </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <X size={20} className="text-red-400" />
                <span>Mistakes</span>
              </div>
              <span className="text-zinc-200">{mistakesMade}</span>
            </div>
          </motion.div>
          
          <motion.button 
            onClick={handleTryAgain}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-ghost-dark/90 hover:bg-ghost-dark text-white rounded-lg text-base md:text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-ghost-dark/20 focus:outline-none focus:ring-2 focus:ring-ghost/50"
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