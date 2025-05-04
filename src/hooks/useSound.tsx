import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'start' | 'correct' | 'mistake' | 'gameOver' | 'background';

interface SoundMap {
  [key: string]: string;
}

const SOUNDS: SoundMap = {
  start: `${import.meta.env.BASE_URL}sounds/start.mp3`,
  correct: `${import.meta.env.BASE_URL}sounds/correct.wav`,
  mistake: `${import.meta.env.BASE_URL}sounds/mistake.wav`,
  gameOver: `${import.meta.env.BASE_URL}sounds/gameOver.wav`,
  background: `${import.meta.env.BASE_URL}sounds/background.mp3`,
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