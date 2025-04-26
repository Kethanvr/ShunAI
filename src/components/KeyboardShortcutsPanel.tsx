"use client";

import React, { useState, useEffect } from "react";
import { IconKeyboard, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type ShortcutCategory = {
  name: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
};

export function KeyboardShortcutsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close on escape key
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
      
      // Open on ? key when holding Shift
      if (e.key === "?" && e.shiftKey) {
        setIsOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);
  
  const categories: ShortcutCategory[] = [
    {
      name: "General",
      shortcuts: [
        { keys: ["?"], description: "Show keyboard shortcuts" },
        { keys: ["Esc"], description: "Close dialogs" },
        { keys: ["Ctrl", "Shift", "N"], description: "New chat" },
        { keys: ["Ctrl", "/"], description: "Focus search" },
        { keys: ["F11"], description: "Toggle fullscreen" },
      ]
    },
    {
      name: "Navigation",
      shortcuts: [
        { keys: ["↑", "↓"], description: "Navigate through messages" },
        { keys: ["PgUp", "PgDn"], description: "Scroll chat history" },
        { keys: ["Home"], description: "Scroll to top" },
        { keys: ["End"], description: "Scroll to bottom" },
      ]
    },
    {
      name: "Editing",
      shortcuts: [
        { keys: ["Enter"], description: "Send message" },
        { keys: ["Shift", "Enter"], description: "New line" },
        { keys: ["/"], description: "Open command menu" },
        { keys: ["Ctrl", "Z"], description: "Undo" },
        { keys: ["Alt", "Backspace"], description: "Delete word" },
      ]
    },
    {
      name: "Actions",
      shortcuts: [
        { keys: ["Ctrl", "S"], description: "Save chat" },
        { keys: ["Ctrl", "C"], description: "Copy selected text" },
        { keys: ["Ctrl", "Shift", "C"], description: "Copy entire chat" },
        { keys: ["Ctrl", "F"], description: "Search in chat" },
        { keys: ["Alt", "V"], description: "Toggle voice input" },
      ]
    }
  ];
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-lg px-3 py-1.5 text-xs text-white/70 hover:bg-black/80 hover:text-white/90 transition-all shadow-lg"
      >
        <IconKeyboard size={14} />
        <span>Keyboard shortcuts</span>
      </button>
    );
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-auto rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl">
        <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <IconKeyboard size={18} />
            <span>Keyboard Shortcuts</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md text-white/60 hover:text-white transition-colors p-1"
          >
            <IconX size={18} />
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-sm font-medium text-white/80 border-b border-white/10 pb-1">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-white/80">{shortcut.description}</span>
                    <div className="flex items-center gap-0.5">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="inline-flex items-center justify-center h-6 min-w-[1.5rem] px-1 rounded bg-white/10 border border-white/20 text-white/90 text-xs font-medium">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-white/40 mx-0.5">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 bg-white/5 px-4 py-3 text-center">
          <span className="text-xs text-white/50">
            Press <kbd className="inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded bg-white/10 border border-white/20 text-white/90 text-xs mx-1">Shift</kbd> + <kbd className="inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded bg-white/10 border border-white/20 text-white/90 text-xs mx-1">?</kbd> anytime to view this dialog
          </span>
        </div>
      </div>
    </>
  );
}
