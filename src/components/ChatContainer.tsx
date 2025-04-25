"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { cn } from "@/lib/utils";
import { IconSend, IconFilePlus, IconPhoto, IconRefresh, IconCode } from "@tabler/icons-react";
import { PromptSuggestions } from "./PromptSuggestions";
import { CommandMenu, Command } from "./CommandMenu";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatContainer = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm KAI, your AI assistant. How can I help you today?" },
    { role: "user", content: "Can you explain what a React hook is?" },
    { role: "assistant", content: "Sure! React hooks are functions that let you use state and other React features in functional components.\n\nHere's a simple example of the useState hook:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nPopular React hooks include:\n- `useState`: For managing state\n- `useEffect`: For side effects\n- `useContext`: For accessing context\n- `useRef`: For persistent mutable values\n\nYou can also create your own custom hooks to reuse stateful logic between components." },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Handle command menu
  useEffect(() => {
    if (input === '/') {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }
  }, [input]);

  const commands: Command[] = [
    {
      id: 'new',
      name: 'New Chat',
      description: 'Start a new conversation',
      icon: <IconFilePlus size={16} />,
    },
    {
      id: 'clear',
      name: 'Clear Chat',
      description: 'Clear current conversation',
      icon: <IconRefresh size={16} />,
    },
    {
      id: 'image',
      name: 'Generate Image',
      description: 'Create an image from text',
      icon: <IconPhoto size={16} />,
    },
    {
      id: 'code',
      name: 'Generate Code',
      description: 'Write code in any language',
      icon: <IconCode size={16} />,
    },
  ];

  const handleSelectCommand = (command: Command) => {
    setShowCommandMenu(false);
    setInput('');
    
    switch (command.id) {
      case 'new':
        setMessages([{ role: "assistant", content: "Hi! I'm KAI, your AI assistant. How can I help you today?" }]);
        setShowSuggestions(true);
        break;
      case 'clear':
        setMessages([{ role: "assistant", content: "Chat cleared. What would you like to talk about?" }]);
        setShowSuggestions(true);
        break;
      case 'image':
        setInput('Create an image of ');
        if (inputRef.current) {
          inputRef.current.focus();
        }
        break;
      case 'code':
        setInput('Write code for ');
        if (inputRef.current) {
          inputRef.current.focus();
        }
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantResponse = {
        role: "assistant" as const,
        content: "This is a simulated response. In a real implementation, you would connect to an AI API like OpenAI's GPT, Anthropic's Claude, or your own backend service."
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectPrompt = (promptText: string) => {
    setInput(promptText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md">
        <h1 className="text-xl font-bold text-white">KAI Chat</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setMessages([{ role: "assistant", content: "Hi! I'm KAI, your AI assistant. How can I help you today?" }]);
              setShowSuggestions(true);
            }}
            className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
          >
            New Chat
          </button>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-slow"></div>
            <span className="text-xs text-white/70">Online</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollAreaRef} className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{ role: "assistant", content: "" }}
              isLoading={true}
            />
          )}
          
          {/* Prompt suggestions */}
          {showSuggestions && messages.length <= 3 && (
            <div className="flex flex-col gap-3 my-4">
              <p className="text-white/60 text-center text-sm">Try asking me about:</p>
              <PromptSuggestions onSelectPrompt={handleSelectPrompt} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Chat input */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-black/50 p-4 backdrop-blur-md"
      >
        <div className="relative flex items-end rounded-lg border border-white/10 bg-black/20 focus-within:ring-1 focus-within:ring-white/30">
          {/* Command menu */}
          <CommandMenu 
            isOpen={showCommandMenu}
            commands={commands}
            onSelectCommand={handleSelectCommand}
          />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-0 focus-within:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
          
          <textarea
            ref={inputRef}
            className="max-h-36 w-full resize-none bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Message KAI..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className={cn(
              "mr-2 mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600",
              (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed"
            )}
            disabled={!input.trim() || isLoading}
          >
            <IconSend size={18} className="text-white" />
          </button>
        </div>
        <div className="mt-2 text-xs text-white/50 text-center flex items-center justify-center gap-2">
          <p>Press <kbd className="px-1 py-0.5 rounded bg-white/10">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-white/10">Shift + Enter</kbd> for new line</p>
          <span className="mx-2">•</span>
          <p>Type <kbd className="px-1 py-0.5 rounded bg-white/10">/</kbd> for commands</p>        </div>
      </form>
    </div>
  );
};

export default ChatContainer;
