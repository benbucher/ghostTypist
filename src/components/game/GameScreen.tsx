import React, { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import GhostCharacter from '../game/GhostCharacter';
import ProgressBar from '../game/ProgressBar';
import WordDisplay from '../game/WordDisplay';
import GameStats from '../game/GameStats';

const GameScreen: React.FC = () => {
  const { currentWord, input, setInput, ghostPosition, isGhostAngry } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only accept input if it's not longer than the current word
    if (newValue.length <= currentWord.length) {
      setInput(newValue);
    }
  };
  
  // Prevent backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
    }
  };
  
  return (
    <div className="flex flex-col min-h-[80vh] relative">
      {/* Background effects */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-full h-full absolute bg-gradient-radial from-indigo-600/30 to-transparent"></div>
      </div>
      
      {/* Mist effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
      
      {/* Game content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="mb-8 text-center">
          <GameStats />
        </div>
        
        <div className="mb-8 text-center">
          <WordDisplay word={currentWord} typedWord={input} />
        </div>
        
        <div className="relative flex-1 flex items-center justify-center">
          <GhostCharacter position={ghostPosition} isAngry={isGhostAngry} />
        </div>
        
        <div className="mt-4 mb-8">
          <ProgressBar ghostPosition={ghostPosition} />
        </div>
        
        <div className="mb-8">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full max-w-lg mx-auto block p-4 text-2xl text-center bg-indigo-950 border-2 border-violet-500/50 rounded-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            placeholder="Type here..."
          />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;