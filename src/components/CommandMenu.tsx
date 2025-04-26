"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Command {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface CommandMenuProps {
  isOpen: boolean;
  commands: Command[];
  onSelectCommand: (command: Command) => void;
}

export function CommandMenu({ isOpen, commands, onSelectCommand }: CommandMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg border border-white/10 bg-black/80 backdrop-blur-md overflow-hidden">
      <div className="p-2 text-xs text-white/60 border-b border-white/10">
        Available commands
      </div>
      <div className="max-h-56 overflow-auto py-1">
        {commands.map((command) => (
          <button
            key={command.id}
            className={cn(
              "w-full px-3 py-2 text-left flex items-center gap-3 text-sm",
              "hover:bg-white/5 transition-colors text-white/80 hover:text-white"
            )}
            onClick={() => onSelectCommand(command)}
          >
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-white/60">
              {command.icon}
            </div>
            <div>
              <div className="font-medium">{command.name}</div>
              <div className="text-xs text-white/60">{command.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
