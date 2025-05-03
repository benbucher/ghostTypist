import React from 'react';

interface WordDisplayProps {
  word: string;
  typedWord: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, typedWord }) => {
  const characters = word.split('');
  
  return (
    <div className="py-4 md:py-8">
      <div className="text-3xl md:text-5xl font-mono tracking-wider min-h-[3rem] md:min-h-[4rem] flex justify-center items-center">
        {characters.map((char, index) => {
          let className;
          
          if (index < typedWord.length) {
            className = typedWord[index] === char
              ? 'text-green-400' // Correct
              : 'text-red-400';  // Incorrect
          } else {
            className = index === typedWord.length
              ? 'text-violet-200 border-b-2 border-violet-400 animate-pulse'
              : 'text-violet-300/80';
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