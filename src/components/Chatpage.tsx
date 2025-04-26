"use client";

import React from 'react';
import ChatContainer from './ChatContainer';
import { FloatingActionButton } from './FloatingActionButton';
import { AccessibilityPanel } from './AccessibilityPanel';
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel';
import { cn } from '@/lib/utils';

const Chatpage = () => {  
  return (
    <div className="flex h-[100dvh] w-full flex-col p-0 z-10">
      {/* Ambient light effect */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl opacity-40 pointer-events-none" />
      
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

