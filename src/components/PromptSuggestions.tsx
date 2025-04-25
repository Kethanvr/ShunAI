"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SuggestedPromptProps {
  text: string;
  onClick: (text: string) => void;
}

export function SuggestedPrompt({ text, onClick }: SuggestedPromptProps) {
  return (
    <button
      className={cn(
        "rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-sm text-white/80",
        "transition-all hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/20"
      )}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
}

interface PromptSuggestionsProps {
  onSelectPrompt: (text: string) => void;
}

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const suggestions = [
    "Explain quantum computing",
    "Write a poem about AI",
    "How do neural networks work?",
    "Design a landing page",
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion) => (
        <SuggestedPrompt
          key={suggestion}
          text={suggestion}
          onClick={onSelectPrompt}
        />
      ))}
    </div>
  );
}
