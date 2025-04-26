"use client";

import React from 'react';
import ChatContainer from './ChatContainer';
import { FloatingActionButton } from './FloatingActionButton';
import { AccessibilityPanel } from './AccessibilityPanel';
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel';
import { cn } from '@/lib/utils';

// CSS for star twinkling animation
const starStyles = `
  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { opacity: 0.3; }
  }

  @keyframes shooting-star {
    0% { 
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% { 
      transform: translateX(500px) translateY(300px);
      opacity: 0;
    }
  }
`;

const Chatpage = () => {  
  return (
    <div className="flex h-[100dvh] w-full flex-col p-0 z-10">
      {/* Inline styles for animations */}
      <style>{starStyles}</style>
      {/* Enhanced universe theme with stars/ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl opacity-40 pointer-events-none" />
        {/* Stars - small light dots */}
      <div className="stars absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 5}s infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Shooting stars */}
      <div className="shooting-stars absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-r from-white via-white to-transparent h-px" 
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 30}%`,
              width: `${Math.random() * 50 + 30}px`,
              opacity: 0,
              transform: `rotate(${Math.random() * 45 + 15}deg)`,
              animation: `shooting-star ${Math.random() * 3 + 2}s ease-in-out infinite ${i * 7 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Main chat container */}
      <ChatContainer className="w-full h-full" />
      
      {/* Floating action button */}
      <FloatingActionButton />
      
      {/* Accessibility panel */}
      <AccessibilityPanel />
      
      {/* Keyboard shortcuts panel */}
      <KeyboardShortcutsPanel />
    </div>
  );
};

export default Chatpage;

