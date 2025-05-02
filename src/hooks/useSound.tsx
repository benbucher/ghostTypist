import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'start' | 'correct' | 'mistake' | 'gameOver' | 'victory' | 'background';

interface SoundMap {
  [key: string]: string;
}

// Sound URLs
const SOUNDS: SoundMap = {
  start: 'https://freesound.org/data/previews/536/536108_9538756-lq.mp3',  // Eerie start sound
  correct: 'https://freesound.org/data/previews/382/382310_7089495-lq.mp3',  // Positive tone
  mistake: 'https://freesound.org/data/previews/511/511484_4943963-lq.mp3',  // Error sound
  gameOver: 'https://freesound.org/data/previews/417/417486_8338344-lq.mp3',  // Spooky game over
  victory: 'https://freesound.org/data/previews/319/319997_5304487-lq.mp3',  // Victory fanfare
  background: 'https://freesound.org/data/previews/465/465822_9513963-lq.mp3',  // Eerie background loop
};

// Sound hook for managing game audio
export default function useSound() {
  const audioElements = useRef<{ [key: string]: HTMLAudioElement }>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements on mount
  useEffect(() => {
    // Create audio elements for each sound
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      
      // Set background music to loop
      if (key === 'background') {
        audio.loop = true;
        audio.volume = 0.3;
        backgroundMusicRef.current = audio;
      } else {
        audio.volume = 0.5;
      }
      
      audioElements.current[key] = audio;
    });
    
    return () => {
      // Cleanup audio elements on unmount
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
  // Play a sound effect
  const playSound = useCallback((type: SoundType) => {
    const audio = audioElements.current[type];
    if (audio) {
      // Reset audio to beginning if already playing
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);
  
  // Start background music
  const startBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch(e => 
        console.error("Error playing background music:", e)
      );
    }
  }, []);
  
  // Stop background music
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  }, []);
  
  return { playSound, startBackgroundMusic, stopBackgroundMusic };
}