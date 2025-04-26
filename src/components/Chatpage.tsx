"use client";

import React from 'react';
import ChatContainer from './ChatContainer';
import { FloatingActionButton } from './FloatingActionButton';
import { AccessibilityPanel } from './AccessibilityPanel';
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel';
import { cn } from '@/lib/utils';

const Chatpage = () => {  return (
    <div className="flex h-[100dvh] w-full flex-col p-0">
      <div className="h-full w-full max-w-6xl mx-auto flex flex-col">
        <div className={cn(
          "relative flex h-full w-full overflow-hidden rounded-lg border border-white/10",
          "bg-transparent backdrop-blur-sm shadow-2xl"
        )}>
          {/* Ambient light effect */}
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl opacity-50" />
          <div className="absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl opacity-40" />
          
          {/* Main chat container */}
          <ChatContainer className="w-full h-full" />
        </div>
      </div>
      
      {/* Floating action button */}
      <FloatingActionButton />
      
      {/* Accessibility panel */}
      <AccessibilityPanel />
      
      {/* Keyboard shortcuts panel */}      <KeyboardShortcutsPanel />
    </div>
  );
};

export default Chatpage;

