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
            size={96} 
            className="mx-auto text-red-300/80 cursor-pointer animate-pulse" 
            onClick={handleTryAgain}
          />
        </div>
        
        <motion.h1 
          className="text-5xl font-bold mb-4 tracking-tighter text-red-300"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          The Ghost Caught You!
        </motion.h1>
        
        <motion.div 
          className="text-sky-300 text-xl space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Time Survived: <span className="font-bold">{formatTime(timeElapsed)}</span></p>
          <p>Final Score: <span className="font-bold">{score}</span></p>
          <p>Mistakes Made: <span className="font-bold">{mistakesMade}</span></p>
        </motion.div>
        
        <motion.button 
          onClick={handleTryAgain}
          className="mt-8 px-8 py-3 bg-sky-700 hover:bg-sky-600 text-white rounded-lg text-xl font-medium shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
        
        <motion.div 
          className="mt-4 text-sky-400/80 text-base hidden md:block"
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