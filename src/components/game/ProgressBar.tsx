import React from 'react';
import GhostCharacter from './GhostCharacter';

interface ProgressBarProps {
  ghostPosition: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ ghostPosition }) => {
  const getBarColor = () => {
    const red = Math.round(255 * (1 - ghostPosition / 100));
    const green = Math.round(255 * (ghostPosition / 100));
    return `rgb(${red}, ${green}, 0)`;
  };
  
  const isDanger = ghostPosition <= 40;
  const isCritical = ghostPosition <= 20;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative pt-1">
        <div className="relative h-20 md:h-32 mb-2 md:mb-4">
          <GhostCharacter position={ghostPosition} isAngry={isDanger} />
        </div>
        
        <div className="overflow-hidden h-3 md:h-4 mb-2 text-xs flex rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
          <div 
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300 ${isDanger ? 'animate-pulse' : ''}`}
            style={{ 
              width: `${ghostPosition}%`,
              backgroundColor: getBarColor(),
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-1 md:mt-2">
          <div className="text-xs md:text-sm font-medium text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ghost rounded-full"></span>
            You
          </div>
          <div className="text-xs md:text-sm font-medium text-zinc-400 flex items-center gap-2">
            Ghost
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ghost rounded-full"></span>
          </div>
        </div>
        
        <div className="h-4 md:h-6 mt-1 md:mt-2">
          {isDanger && (
            <div className="text-center text-red-400 text-xs md:text-sm font-medium animate-pulse">
              {isCritical ? 'DANGER! Ghost is very close!' : 'Warning! Ghost approaching!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;