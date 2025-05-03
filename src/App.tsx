import React from 'react';
import { GameProvider } from './context/GameContext';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <GameProvider>
          <GameContainer />
        </GameProvider>
      </div>
    </div>
  );
}

export default App;