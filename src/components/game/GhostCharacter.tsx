import React from 'react';
import { Ghost } from 'lucide-react';

interface GhostCharacterProps {
  position: number;
  isAngry: boolean;
}

const GhostCharacter: React.FC<GhostCharacterProps> = ({ position, isAngry }) => {
  return (
    <div 
      className={`absolute transition-all duration-300 ${
        isAngry ? 'animate-angry' : 'animate-float'
      }`}
      style={{ 
        left: `${position}%`,
        transform: 'translateX(-50%)',
        bottom: '0',
        filter: `blur(${isAngry ? '1px' : '0'})` 
      }}
    >
      <div className="relative">
        <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-ghost-dark/30 rounded-full filter blur-md"></div>
        
        <Ghost 
          size={80}
          className={`${
            isAngry 
              ? 'text-red-300 opacity-90 animate-ghost-angry md:w-28 md:h-28 w-20 h-20' 
              : 'text-ghost opacity-90 animate-pulse md:w-28 md:h-28 w-20 h-20'
          } transition-colors duration-300`}
          strokeWidth={1.5}
        />
        
        <div className={`absolute inset-0 rounded-full ${
          isAngry ? 'bg-red-500/20' : 'bg-ghost/20'
        } filter blur-xl -z-10 scale-75 opacity-60`}></div>
      </div>
    </div>
  );
};

export default GhostCharacter;