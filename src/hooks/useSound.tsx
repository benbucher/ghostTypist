import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'start' | 'correct' | 'mistake' | 'gameOver' | 'background';

interface SoundMap {
  [key: string]: string;
}

const SOUNDS: SoundMap = {
  start: 'https://freesound.org/data/previews/536/536108_9538756-lq.mp3',
  correct: 'https://freesound.org/data/previews/382/382310_7089495-lq.mp3',
  mistake: 'https://freesound.org/data/previews/511/511484_4943963-lq.mp3',
  gameOver: 'https://freesound.org/data/previews/417/417486_8338344-lq.mp3',
  background: 'https://freesound.org/data/previews/465/465822_9513963-lq.mp3',
};

export default function useSound() {
  const audioElements = useRef<{ [key: string]: HTMLAudioElement }>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      
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
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
  const playSound = useCallback((type: SoundType) => {
    const audio = audioElements.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Error playing sound:", e));
    }
  }, []);
  
  const startBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch(e => 
        console.error("Error playing background music:", e)
      );
    }
  }, []);
  
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  }, []);
  
  return { playSound, startBackgroundMusic, stopBackgroundMusic };
}