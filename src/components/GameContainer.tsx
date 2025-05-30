import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import useSound from '../hooks/useSound';
import SoundToggle from './SoundToggle';

const GameContainer: React.FC = () => {
  const { state } = useGame();
  const { startBackgroundMusic, stopBackgroundMusic, startMenuMusic, stopMenuMusic } = useSound();
  
  useEffect(() => {
    if (state === 'playing') {
      stopMenuMusic();
      startBackgroundMusic();
    } else if (state === 'start') {
      stopBackgroundMusic();
      startMenuMusic();
    } else if (state === 'gameover') {
      stopBackgroundMusic();
      startMenuMusic();
    }
    
    return () => {
      if (state === 'playing') {
        stopBackgroundMusic();
      }
    };
  }, [state, startBackgroundMusic, stopBackgroundMusic, startMenuMusic, stopMenuMusic]);
  
  return (
    <div className="w-full max-w-4xl relative">
      {state === 'start' && <StartScreen />}
      {(state === 'playing' || state === 'dying') && <GameScreen />}
      {state === 'gameover' && <GameOverScreen />}
      <SoundToggle/>
    </div>
  );
};

export default GameContainer;