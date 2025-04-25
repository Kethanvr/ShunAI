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
        <Avatar className="h-8 w-8 border border-white/20 bg-black">
          <AvatarFallback className="bg-black text-white">AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3",
          isUser
            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
            : "bg-black/50 border border-white/10 text-white backdrop-blur-sm"
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
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
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border border-white/20 bg-black">
          <AvatarFallback className="bg-black text-white">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
