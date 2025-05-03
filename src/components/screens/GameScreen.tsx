import React, { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../game/ProgressBar';
import WordDisplay from '../game/WordDisplay';
import GameStats from '../game/GameStats';

const GameScreen: React.FC = () => {
  const { currentWord, input, setInput, ghostPosition, isGhostAngry } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  return (
    <div className="flex flex-col min-h-[80vh] relative">
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="mb-8 text-center">
          <GameStats />
        </div>
        
        <div className="mb-8 text-center">
          <WordDisplay word={currentWord} typedWord={input} />
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
            className="w-full max-w-lg mx-auto block p-4 text-2xl text-center bg-slate-800 border-2 border-sky-500/50 rounded-lg focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/50 transition-all"
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
}

export default GameScreen;