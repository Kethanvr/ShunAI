"use client";

import React from "react";
// import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div className="my-4 w-full overflow-hidden rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm">
      {/* Header with language indicator */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-1">
        <span className="text-xs font-medium text-white/70">{language}</span>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
        </div>
      </div>
      
      {/* Code content */}
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="text-white">{code}</code>
      </pre>
    </div>
  );
}

// A simpler inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white">
      {children}
    </code>
  );
}
