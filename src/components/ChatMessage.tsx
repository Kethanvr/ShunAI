"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { CodeBlock, InlineCode } from "@/components/ui/code-block";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 py-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="relative">
          <Avatar className="h-8 w-8 border border-white/20 bg-black/80 backdrop-blur-sm shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-medium text-xs">AI</AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-indigo-500 border border-white/20 shadow-lg shadow-indigo-500/50"></div>
        </div>
      )}
      <div
        className={cn(
          "flex max-w-[85%] flex-col gap-2 rounded-lg px-4 py-3",
          isUser
            ? "relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/20"
            : "bg-black/50 border border-white/10 text-white backdrop-blur-sm relative"
        )}
      >
        {/* Futuristic border effect for assistant messages */}
        {!isUser && !isLoading && (
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 rounded-lg border border-indigo-500/20"></div>
            <div className="absolute -left-0.5 top-0 w-1 h-full bg-gradient-to-b from-indigo-400 via-purple-500 to-indigo-600 opacity-70"></div>
          </div>
        )}
        
        {/* Futuristic border effect for user messages */}
        {isUser && (
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="opacity-80">
              <div className="absolute top-0 right-0 h-2 w-8 bg-white/20 rounded-bl-xl"></div>
              <div className="absolute bottom-0 left-0 h-2 w-8 bg-white/20 rounded-tr-xl"></div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center space-x-2 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-400 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-pink-400"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match && String(children).split('\n').length === 1;
                  
                  if (isInline) {
                    return <InlineCode>{children}</InlineCode>;
                  }
                  
                  return (
                    <CodeBlock
                      language={match ? match[1] : "text"}
                      code={String(children).replace(/\n$/, "")}
                    />
                  );
                },
                ul({ children }) {
                  return <ul className="space-y-1">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="space-y-1">{children}</ol>;
                },
                li({ children }) {
                  return <li className="ml-2">{children}</li>;
                },
                a({ href, children }) {
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-400/30 underline-offset-2 hover:decoration-indigo-300/50"
                    >
                      {children}
                    </a>
                  );
                },
                p({ children }) {
                  return <p className="mb-3 last:mb-0">{children}</p>;
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold mb-3 pb-1 border-b border-white/10">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg font-bold mb-2 pb-1 border-b border-white/10">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base font-bold mb-2">{children}</h3>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-2 border-indigo-500 pl-4 italic opacity-90">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="relative">
          <Avatar className="h-8 w-8 border border-white/20 bg-black/80 backdrop-blur-sm shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-medium text-xs">U</AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border border-white/20 shadow-lg shadow-green-500/50"></div>
        </div>
      )}
    </div>
  );
}
