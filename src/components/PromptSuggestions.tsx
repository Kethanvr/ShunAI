"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  IconBulb, 
  IconCode, 
  IconPencil, 
  IconRobot, 
  IconBrain,
  IconPresentation,
  IconBook,
  IconMoodSmile
} from "@tabler/icons-react";

interface SuggestedPromptProps {
  text: string;
  icon: React.ReactNode;
  onClick: (text: string) => void;
}

export function SuggestedPrompt({ text, icon, onClick }: SuggestedPromptProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white/80",
        "transition-all hover:border-indigo-500/30 hover:bg-black/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/10",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      )}
      onClick={() => onClick(text)}
    >
      <span className="text-indigo-400">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

interface PromptSuggestionsProps {
  onSelectPrompt: (text: string) => void;
}

export function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const suggestions = [
    {
      text: "Explain quantum computing",
      icon: <IconBrain size={18} />
    },
    {
      text: "Write a poem about AI",
      icon: <IconPencil size={18} />
    },
    {
      text: "How do neural networks work?",
      icon: <IconRobot size={18} />
    },
    {
      text: "Create a React component for a dropdown menu",
      icon: <IconCode size={18} />
    },
    {
      text: "Design a landing page for a coffee shop",
      icon: <IconPresentation size={18} />
    },
    {
      text: "Summarize 'Sapiens' by Yuval Noah Harari",
      icon: <IconBook size={18} />
    },
    {
      text: "Tell me a joke about programming",
      icon: <IconMoodSmile size={18} />
    },
    {
      text: "Give me creative marketing ideas",
      icon: <IconBulb size={18} />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto max-w-4xl">
      {suggestions.map((suggestion) => (
        <SuggestedPrompt
          key={suggestion.text}
          text={suggestion.text}
          icon={suggestion.icon}
          onClick={onSelectPrompt}
        />
      ))}
    </div>
  );
}
