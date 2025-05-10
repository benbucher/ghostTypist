export const GAME_CONFIG = {
  ghost: {
    BASE_SPEED: 0.4, // Initial speed for ghost movement as percentage
    SPEED_INCREASE: 0.05, // Increase in speed added every interval
    SPEED_INCREASE_INTERVAL: 20, // Time interval for speed increase in seconds
  },
  scoring: {
    SCORE_MULTIPLIER: 0.5, // Multiplier for score to progress bar impact
    PERFECT_WORD_BONUS: 1, // Bonus character for perfect word completion
  },
  audio: {
    VOLUMES: {
      BACKGROUND: 0.1,
      EFFECTS: 0.1,
      GAME_OVER: 0.4,
    },
  },
} as const; 