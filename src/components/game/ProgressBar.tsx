import React from 'react';
import GhostCharacter from './GhostCharacter';

interface ProgressBarProps {
  ghostPosition: number; // 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ ghostPosition }) => {
  // Linear color interpolation based on ghost position
  const getBarColor = () => {
    const red = Math.round(255 * (1 - ghostPosition / 100));
    const green = Math.round(255 * (ghostPosition / 100));
    return `rgb(${red}, ${green}, 0)`;
  };
  
  // Determine if ghost is in danger zone
  const isDanger = ghostPosition <= 40;
  const isCritical = ghostPosition <= 20;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative pt-1">
        {/* Ghost character container with increased margin */}
        <div className="relative h-32 mb-4">
          <GhostCharacter position={ghostPosition} isAngry={isDanger} />
        </div>
        
        {/* Progress bar */}
        <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-indigo-900/50 backdrop-blur-sm border border-indigo-800">
          <div 
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300 ${isDanger ? 'animate-pulse' : ''}`}
            style={{ 
              width: `${ghostPosition}%`,
              backgroundColor: getBarColor(),
            }}
          ></div>
        </div>

        {/* Labels below progress bar */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm font-medium text-violet-300 flex items-center gap-2">
            <span className="w-2 h-2 bg-violet-300 rounded-full"></span>
            You
          </div>
          <div className="text-sm font-medium text-violet-300 flex items-center gap-2">
            Ghost
            <span className="w-2 h-2 bg-violet-300 rounded-full"></span>
          </div>
        </div>
        
        {/* Fixed height container for danger message */}
        <div className="h-6 mt-2">
          {isDanger && (
            <div className="text-center text-red-400 text-sm font-medium animate-pulse">
              {isCritical ? 'DANGER! Ghost is very close!' : 'Warning! Ghost approaching!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;