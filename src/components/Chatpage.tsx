"use client";

import React from 'react';
import ChatContainer from './ChatContainer';
import { cn } from '@/lib/utils';

export const Chatpage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <div className={cn(
          "relative flex h-full w-full overflow-hidden rounded-lg border border-white/10",
          "bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm"
        )}>
          {/* Ambient light effect */}
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
          
          {/* Main chat container */}
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

