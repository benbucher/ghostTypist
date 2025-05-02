// List of words with varying difficulty levels
const easyWords = [
  'cat', 'dog', 'run', 'jump', 'play', 'fast', 'slow', 'good', 'bad', 'happy',
  'sad', 'hot', 'cold', 'big', 'small', 'tall', 'short', 'old', 'new', 'red',
  'blue', 'green', 'black', 'white', 'gold', 'silver', 'up', 'down', 'left', 'right'
];

const mediumWords = [
  'ghost', 'spooky', 'haunted', 'eerie', 'scary', 'creepy', 'shadow', 'night',
  'darkness', 'monster', 'vampire', 'zombie', 'witch', 'wizard', 'spirit',
  'phantom', 'poltergeist', 'apparition', 'spectre', 'wraith', 'paranormal',
  'mysterious', 'frightening', 'sinister', 'macabre', 'gloomy', 'spine', 'chill'
];

const hardWords = [
  'supernatural', 'ectoplasmic', 'manifestation', 'ethereal', 'clandestine',
  'horrification', 'phantasmagoria', 'trepidation', 'malevolent', 'diabolical',
  'preternatural', 'abomination', 'necromancer', 'incantation', 'revenant',
  'dematerialized', 'bloodcurdling', 'foreboding', 'doppelganger', 'possession'
];

// Track words that have been used to avoid immediate repetition
let usedWords: string[] = [];

// Get a word based on time elapsed (for difficulty progression)
export const generateWord = (): string => {
  // Choose word list based on random factor with preference toward easier words
  const random = Math.random();
  
  let wordList: string[];
  
  if (random < 0.6) {
    wordList = easyWords;
  } else if (random < 0.9) {
    wordList = mediumWords;
  } else {
    wordList = hardWords;
  }
  
  // Filter out recently used words if possible
  const availableWords = wordList.filter(word => !usedWords.includes(word));
  
  // If all words in the list have been used recently, reset the used words
  if (availableWords.length === 0) {
    usedWords = [];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }
  
  // Get a random word from the available words
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const word = availableWords[randomIndex];
  
  // Add word to used words, keeping only the last 10
  usedWords.push(word);
  if (usedWords.length > 10) {
    usedWords.shift();
  }
  
  return word;
};