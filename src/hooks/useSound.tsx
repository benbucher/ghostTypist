import { useCallback, useEffect, useRef } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { useSoundStore } from '../store/soundStore';

type SoundType = 'start' | 'correct' | 'mistake' | 'gameOver' | 'background';

type SoundMap = {
  [K in SoundType]: string;
};

const SOUNDS: SoundMap = {
  start: `${import.meta.env.BASE_URL}sounds/start.mp3`,
  correct: `${import.meta.env.BASE_URL}sounds/correct.wav`,
  mistake: `${import.meta.env.BASE_URL}sounds/mistake.wav`,
  gameOver: `${import.meta.env.BASE_URL}sounds/gameOver.wav`,
  background: `${import.meta.env.BASE_URL}sounds/background.mp3`,
};

interface AudioRefs {
  [key: string]: HTMLAudioElement;
}

export default function useSound() {
  const audioElements = useRef<AudioRefs>({});
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const startMusicRef = useRef<HTMLAudioElement | null>(null);
  const { playAudio } = useSoundStore()

  const initializeAudio = useCallback((key: SoundType, url: string) => {
    const audio = new Audio(url);
    
    if (key === 'background') {
      audio.loop = true;
      audio.volume = GAME_CONFIG.audio.VOLUMES.BACKGROUND;
      backgroundMusicRef.current = audio;
    } else if (key === 'start') {
      audio.loop = true;
      audio.volume = GAME_CONFIG.audio.VOLUMES.BACKGROUND;
      startMusicRef.current = audio;
    } else if (key === 'gameOver') {
      audio.volume = GAME_CONFIG.audio.VOLUMES.GAME_OVER;
      audio.addEventListener('ended', () => {
        if (audio === audioElements.current.gameOver) {
          audio.currentTime = 0;
        }
      });
    } else {
      audio.volume = GAME_CONFIG.audio.VOLUMES.EFFECTS;
    }
    
    audioElements.current[key] = audio;
  }, []);

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      initializeAudio(key as SoundType, url);
    });
    
    return () => {
      Object.values(audioElements.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [initializeAudio]);

  const playSound = useCallback(async (type: SoundType) => {
    const audio = audioElements.current[type];

    if (type !== 'start' && type !== 'background') {
      audio.currentTime = 0;
      return playAudio(audio)
        .then(() => audio)
        .catch(e => console.error("Error playing sound:", e));
    }
  }, [playAudio]);

  const startBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      playAudio(backgroundMusicRef.current).catch(e => 
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

  const startMenuMusic = useCallback(() => {
    if (startMusicRef.current) {
      playAudio(startMusicRef.current).catch(e => 
        console.error("Error playing menu music:", e)
      );
    }
  }, []);

  const stopMenuMusic = useCallback(() => {
    if (startMusicRef.current) {
      startMusicRef.current.pause();
      startMusicRef.current.currentTime = 0;
    }
  }, []);

  return { 
    playSound, 
    startBackgroundMusic, 
    stopBackgroundMusic,
    startMenuMusic,
    stopMenuMusic
  };
}