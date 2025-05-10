import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateWord } from '../utils/wordGenerator';
import useSound from '../hooks/useSound';
import { GAME_CONFIG } from '../config/gameConfig';

export type GameState = 'start' | 'playing' | 'dying' | 'gameover';

export interface GameContextType {
  state: GameState;
  currentWord: string;
  input: string;
  ghostPosition: number;
  score: number;
  timeElapsed: number;
  mistakesMade: number;
  isGhostAngry: boolean;
  setInput: (input: string) => void;
  startGame: () => void;
  resetGame: () => void;
}

const initialContext: GameContextType = {
  state: 'start',
  currentWord: '',
  input: '',
  ghostPosition: 100,
  score: 0,
  timeElapsed: 0,
  mistakesMade: 0,
  isGhostAngry: false,
  setInput: () => {},
  startGame: () => {},
  resetGame: () => {},
};

const GameContext = createContext<GameContextType>(initialContext);

const calculateWordScore = (input: string, target: string): number => {
  return input.split('').reduce((score, char, index) => 
    score + (char === target[index] ? 1 : 0), 0
  );
};

const countMistakes = (input: string, target: string): number => {
  return input.split('').reduce((mistakes, char, index) => 
    mistakes + (char !== target[index] ? 1 : 0), 0
  );
};

const calculateGhostSpeed = (timeElapsed: number): number => {
  const speedIncrements = Math.floor(timeElapsed / GAME_CONFIG.ghost.SPEED_INCREASE_INTERVAL);
  return GAME_CONFIG.ghost.BASE_SPEED + (speedIncrements * GAME_CONFIG.ghost.SPEED_INCREASE);
};

type Action =
  | { type: 'START_GAME' }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'WORD_COMPLETED'; payload: { input: string; target: string } }
  | { type: 'UPDATE_GHOST' }
  | { type: 'UPDATE_TIMER' }
  | { type: 'START_DYING' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET_GAME' };

const gameReducer = (state: GameContextType, action: Action): GameContextType => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        state: 'playing',
        currentWord: generateWord(),
        ghostPosition: 100,
        score: 0,
        timeElapsed: 0,
        mistakesMade: 0,
        isGhostAngry: false,
        input: '',
      };
    case 'SET_INPUT':
      if (action.payload.length > state.currentWord.length) {
        return state;
      }
      return {
        ...state,
        input: action.payload,
        isGhostAngry: false,
      };
    case 'WORD_COMPLETED': {
      const wordScore = calculateWordScore(action.payload.input, action.payload.target);
      const mistakes = countMistakes(action.payload.input, action.payload.target);
      const isPerfectWord = action.payload.input === action.payload.target;
      const positionChange = (wordScore * GAME_CONFIG.scoring.SCORE_MULTIPLIER) + 
        (isPerfectWord ? GAME_CONFIG.scoring.PERFECT_WORD_BONUS : 0);
      
      return {
        ...state,
        currentWord: generateWord(),
        input: '',
        ghostPosition: Math.min(100, Math.max(0, state.ghostPosition + positionChange)),
        score: state.score + wordScore,
        mistakesMade: state.mistakesMade + mistakes,
        isGhostAngry: mistakes > 0,
      };
    }
    case 'UPDATE_GHOST': {
      const currentSpeed = calculateGhostSpeed(state.timeElapsed);
      const newPosition = state.ghostPosition - currentSpeed;
      
      if (newPosition <= 0 && state.state === 'playing') {
        return {
          ...state,
          ghostPosition: 0,
          state: 'dying',
        };
      }
      
      return {
        ...state,
        ghostPosition: Math.max(0, newPosition),
      };
    }
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeElapsed: state.timeElapsed + 1,
      };
    case 'START_DYING':
      return {
        ...state,
        state: 'dying',
      };
    case 'GAME_OVER':
      return {
        ...state,
        state: 'gameover',
      };
    case 'RESET_GAME':
      return {
        ...initialContext,
        state: 'start',
      };
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialContext);
  const { playSound, stopBackgroundMusic } = useSound();
  
  useEffect(() => {
    let timerInterval: number;
    let ghostInterval: number;
    
    if (gameState.state === 'playing') {
      timerInterval = window.setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
      
      ghostInterval = window.setInterval(() => {
        dispatch({ type: 'UPDATE_GHOST' });
      }, 100);
    }
    
    return () => {
      clearInterval(timerInterval);
      clearInterval(ghostInterval);
    };
  }, [gameState.state]);
  
  useEffect(() => {
    if (gameState.state !== 'playing') return;
    
    if (gameState.input.length === gameState.currentWord.length) {
      if (gameState.input === gameState.currentWord) {
        playSound('correct');
      } else {
        playSound('mistake');
      }
      dispatch({ 
        type: 'WORD_COMPLETED',
        payload: { input: gameState.input, target: gameState.currentWord }
      });
    }
  }, [gameState.input, gameState.currentWord, gameState.state, playSound]);

  useEffect(() => {
    if (gameState.state === 'dying') {
      stopBackgroundMusic();
      
      playSound('gameOver')
        .then(audio => {
          audio!.addEventListener('ended', () => {
            dispatch({ type: 'GAME_OVER' });
          });
        })
        .catch(e => {
          console.error("Error playing game over sound:", e);
          dispatch({ type: 'GAME_OVER' });
        });
    }
  }, [gameState.state, stopBackgroundMusic]);

  const value = {
    ...gameState,
    setInput: (input: string) => dispatch({ type: 'SET_INPUT', payload: input }),
    startGame: () => {
      playSound('start');
      dispatch({ type: 'START_GAME' });
    },
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};