"use client";
declare module "react-syntax-highlighter" {
  import * as React from "react";
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    lineNumberStyle?: React.CSSProperties;
    children?: string;
  }
  export class Prism extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const atomDark: any;
}



import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, Download, Terminal } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
}

// Map of common language aliases
const languageMap: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  rb: "ruby",
  sh: "bash",
  bash: "bash",
  shell: "bash",
  zsh: "bash",
  html: "html",
  css: "css",
  jsx: "jsx",
  tsx: "tsx",
  md: "markdown",
  sql: "sql",
  json: "json",
  yml: "yaml",
  yaml: "yaml",
  rust: "rust",
  go: "go",
  java: "java",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  dart: "dart",
  r: "r",
};

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const normalizedLanguage = languageMap[language.toLowerCase()] || language;
  const displayLanguage = normalizedLanguage === "text" ? "plain text" : normalizedLanguage;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to download code as a file
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${normalizedLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to run code in terminal (this is a placeholder that would need to be implemented)
  const handleRunInTerminal = () => {
    console.log("Run in terminal:", code);
    // Implement terminal execution logic
  };

  return (
    <div className="my-4 w-full overflow-hidden rounded-lg border border-white/10 bg-[#121212] backdrop-blur-sm shadow-lg">
      {/* Header with language indicator and actions */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-white/70">{displayLanguage}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleCopy}
            className="group flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
            title="Copy code"
          >
            {copied ? 
              <Check size={14} className="text-green-400" /> : 
              <Copy size={14} className="text-white/60 group-hover:text-white/90" />
            }
          </button>
          <button 
            onClick={handleDownload}
            className="group flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
            title="Download code"
          >
            <Download size={14} className="text-white/60 group-hover:text-white/90" />
          </button>
          {(normalizedLanguage === "javascript" || 
            normalizedLanguage === "typescript" || 
            normalizedLanguage === "python" || 
            normalizedLanguage === "bash") && (
            <button 
              onClick={handleRunInTerminal}
              className="group flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
              title="Run in terminal"
            >
              <Terminal size={14} className="text-white/60 group-hover:text-white/90" />
            </button>
          )}
          <div className="flex items-center space-x-1 ml-2">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
          </div>
        </div>
      </div>
      
      {/* Code content with syntax highlighting */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={atomDark}
          customStyle={{
            margin: 0, 
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            color: 'rgba(255, 255, 255, 0.2)',
            paddingRight: '1rem',
            textAlign: 'right',
            minWidth: '2.5rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// A simpler inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-black/30 px-1.5 py-0.5 font-mono text-sm text-white border border-white/10">
      {children}
    </code>
  );
}
