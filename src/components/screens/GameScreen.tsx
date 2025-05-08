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
    <div className="flex flex-col h-[100dvh] md:h-[80vh] relative p-4">
      <div className="relative z-10 flex flex-col justify-between gap-4 max-h-full">
        <div>
          <GameStats />
        </div>
        
        <div className="flex-shrink-0">
          <WordDisplay word={currentWord} typedWord={input} />
        </div>
        
        <div className="flex-shrink-0">
          <ProgressBar ghostPosition={ghostPosition} />
        </div>
        
        <div className="flex-shrink-0 mt-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full max-w-lg mx-auto block p-3 md:p-4 text-xl md:text-2xl text-center font-mono bg-zinc-900/50 border-2 border-ghost/30 rounded-lg focus:outline-none focus:border-ghost focus:ring-2 focus:ring-ghost/20 transition-all backdrop-blur-sm tracking-wider"
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