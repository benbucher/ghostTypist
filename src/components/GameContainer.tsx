import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import VictoryScreen from './screens/VictoryScreen';
import useSound from '../hooks/useSound';

const GameContainer: React.FC = () => {
  const { state } = useGame();
  const { startBackgroundMusic, stopBackgroundMusic } = useSound();
  
  // Start background music when the component mounts
  useEffect(() => {
    if (state === 'start') {
      startBackgroundMusic();
    }
    
    return () => {
      stopBackgroundMusic();
    };
  }, [state, startBackgroundMusic, stopBackgroundMusic]);
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative">
      {state === 'start' && <StartScreen />}
      {state === 'playing' && <GameScreen />}
      {state === 'gameover' && <GameOverScreen />}
      {state === 'victory' && <VictoryScreen />}
    </div>
  );
};

export default GameContainer;