import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../store/soundStore';

const SoundToggle: React.FC = () => {
  const { volume, toggleSound } = useSoundStore();

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 p-2 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ghost/50"
      aria-label={volume === 0 ? 'Unmute sound' : 'Mute sound'}
    >
      {volume !== 0 ? (
        <Volume2 size={20} className="text-ghost" />
      ) : (
        <VolumeX size={20} className="text-zinc-500" />
      )}
    </button>
  );
};

export default SoundToggle; 