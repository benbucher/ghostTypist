import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { GhostIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const StartScreen: React.FC = () => {
  const { startGame } = useGame();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        startGame();
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [startGame]);
  
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
            className="mx-auto text-sky-300/80 cursor-pointer animate-pulse" 
            onClick={startGame}
          />
        </div>
        
        <motion.h1 
          className="text-7xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-300"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Ghost Typist
        </motion.h1>
        
        <motion.p 
          className="text-sky-300 text-xl max-w-lg mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Type words correctly to keep the ghost away.<br />
          Make too many mistakes and it will catch you!
        </motion.p>
        
        <motion.button 
          onClick={startGame}
          className="px-8 py-3 bg-sky-700 hover:bg-sky-600 text-white rounded-lg text-xl font-medium shadow-lg hover:shadow-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
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
            to start
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StartScreen;