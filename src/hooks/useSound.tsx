import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'start' | 'correct' | 'mistake' | 'gameOver' | 'background';

interface SoundMap {
  [key: string]: string;
}

const SOUNDS: SoundMap = {
  start: 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3',
  correct: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  mistake: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  gameOver: 'https://assets.mixkit.co/active_storage/sfx/1996/1996-preview.mp3',
  background: 'https://assets.mixkit.co/active_storage/sfx/151/151-preview.mp3',
};

export default function useSound() {
  const audioElements = useRef<{ [key: string]: HTMLAudioElement }>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      
      if (key === 'background') {
        audio.loop = true;
        audio.volume = 0.2;
        backgroundMusicRef.current = audio;
      } else {
        audio.volume = 0.4;
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