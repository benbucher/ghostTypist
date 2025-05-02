import React from 'react';

interface WordDisplayProps {
  word: string;
  typedWord: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, typedWord }) => {
  // Split the current word into characters to color them individually
  const characters = word.split('');
  
  return (
    <div className="py-8">
      <div className="text-5xl font-mono tracking-wider min-h-16 flex justify-center">
        {characters.map((char, index) => {
          let className;
          
          if (index < typedWord.length) {
            // Character has been typed
            className = typedWord[index] === char
              ? 'text-green-400' // Correct
              : 'text-red-400';  // Incorrect
          } else {
            // Character not yet typed
            className = index === typedWord.length
              ? 'text-violet-200 border-b-2 border-violet-400 animate-pulse' // Current character
              : 'text-violet-300/80'; // Future character
          }
          
          return (
            <span 
              key={index} 
              className={`${className} transition-colors duration-150 px-[2px]`}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordDisplay;