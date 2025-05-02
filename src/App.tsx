import React from 'react';
import { GameProvider } from './context/GameContext';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <div className="min-h-screen bg-indigo-950 text-gray-100 flex items-center justify-center overflow-hidden">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
}

export default App;