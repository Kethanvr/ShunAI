"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { cn } from "@/lib/utils";
import { 
  IconSend, 
  IconFilePlus, 
  IconPhoto, 
  IconRefresh, 
  IconCode, 
  IconMicrophone,
  IconX,
  IconMaximize,
  IconMinimize,
  IconSearch,
  IconClipboard,
  IconDownload,
  IconMessage
} from "@tabler/icons-react";
import { PromptSuggestions } from "./PromptSuggestions";
import { CommandMenu, Command } from "./CommandMenu";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatContainerProps {
  className?: string;
}

const ChatContainer = ({ className }: ChatContainerProps) => {
  const [input, setInput] = useState("");  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" },
    { role: "user", content: "Can you explain what a React hook is?" },
    { role: "assistant", content: "Sure! React hooks are functions that let you use state and other React features in functional components.\n\nHere's a simple example of the useState hook:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nPopular React hooks include:\n- `useState`: For managing state\n- `useEffect`: For side effects\n- `useContext`: For accessing context\n- `useRef`: For persistent mutable values\n\nYou can also create your own custom hooks to reuse stateful logic between components." },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (chatContainerRef.current?.requestFullscreen) {
        chatContainerRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Voice input simulation
  const toggleVoiceInput = () => {
    setShowVoiceInput(!showVoiceInput);
    
    // Simulate voice recording
    if (!showVoiceInput) {
      setTimeout(() => {
        setInput("This is a simulated voice input. In a real implementation, you would integrate with Web Speech API or a similar service.");
        setShowVoiceInput(false);
      }, 3000);
    }
  };

  // Save chat
  const saveChat = () => {
    const chatData = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Copy chat to clipboard
  const copyChat = () => {
    const chatText = messages.map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`).join('\n\n');
    navigator.clipboard.writeText(chatText);
    
    // Show feedback (would be better with a toast notification)
    alert('Chat copied to clipboard!');
  };

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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
    {
      id: 'voice',
      name: 'Voice Input',
      description: 'Speak instead of typing',
      icon: <IconMicrophone size={16} />,
    },
    {
      id: 'save',
      name: 'Save Chat',
      description: 'Download chat as JSON',
      icon: <IconDownload size={16} />,
    },
  ];

  const handleSelectCommand = (command: Command) => {
    setShowCommandMenu(false);
    setInput('');
      switch (command.id) {
      case 'new':
        setMessages([{ role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }]);
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
      case 'voice':
        toggleVoiceInput();
        break;
      case 'save':
        saveChat();
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
    <div ref={chatContainerRef} className={cn("flex h-full w-full flex-col", className)}>
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2 backdrop-blur-xl">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-white">Chat</span>
        </h1>
        <div className="flex items-center gap-3">
          {/* Chat controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={toggleSearch}
              className="rounded-md border border-white/10 bg-black/30 p-1.5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              title="Search in chat"
            >
              <IconSearch size={16} />
            </button>
            <button 
              onClick={saveChat}
              className="rounded-md border border-white/10 bg-black/30 p-1.5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              title="Save chat"
            >
              <IconDownload size={16} />
            </button>
            <button 
              onClick={copyChat}
              className="rounded-md border border-white/10 bg-black/30 p-1.5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              title="Copy chat"
            >
              <IconClipboard size={16} />
            </button>
            <button 
              onClick={toggleFullScreen}
              className="rounded-md border border-white/10 bg-black/30 p-1.5 text-white/70 transition-all hover:bg-white/10 hover:text-white"
              title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullScreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
            </button>
          </div>
            <button 
            onClick={() => {
              setMessages([{ role: "assistant", content: "Hi! I'm your AI assistant. How can I help you today?" }]);
              setShowSuggestions(true);
            }}
            className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
          >
            New Chat
          </button>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-white/70">Online</span>
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-b border-white/10 bg-black/70 px-4 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-1.5">
            <IconSearch size={16} className="text-white/60" />
            <input
              type="text"
              placeholder="Search in conversation..."
              className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
            />
            <button 
              onClick={toggleSearch}
              className="text-white/60 hover:text-white transition-colors"
            >
              <IconX size={16} />
            </button>
          </div>
        </div>
      )}
      
      {/* Voice input indicator */}
      {showVoiceInput && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-black/80 backdrop-blur-md p-6 rounded-full border border-indigo-500/30 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500/30"></div>
              <div className="relative z-10 rounded-full bg-indigo-600 p-4">
                <IconMicrophone size={32} className="text-white" />
              </div>
            </div>
            <p className="text-white/80 text-sm">Listening...</p>
            <button 
              onClick={toggleVoiceInput}
              className="rounded-full bg-red-500 p-2 text-white"
            >
              <IconX size={16} />
            </button>
          </div>
        </div>
      )}
        {/* Chat messages */}
      <ScrollArea className="flex-1 w-full px-2 py-4 md:px-4">
        <div ref={scrollAreaRef} className="flex flex-col gap-6 pb-4 w-full h-full">
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
            <div className="flex flex-col gap-3 my-6">
              <p className="text-white/60 text-center text-sm">Try asking me about:</p>
              <PromptSuggestions onSelectPrompt={handleSelectPrompt} />
            </div>
          )}
        </div>
      </ScrollArea>
        {/* Chat input */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-black/60 p-3 backdrop-blur-xl"
      >
        <div className="relative flex items-end rounded-xl border border-indigo-500/30 bg-black/40 focus-within:border-indigo-500/70 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all duration-300">
          {/* Command menu */}
          <CommandMenu 
            isOpen={showCommandMenu}
            commands={commands}
            onSelectCommand={handleSelectCommand}
          />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="opacity-0 focus-within:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Input area */}
          <div className="flex items-center pl-3 text-white/50">
            <IconMessage size={16} />
          </div>
            <textarea
            ref={inputRef}
            className="max-h-36 w-full resize-none bg-transparent px-2 py-3.5 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Message..."
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
          
          {/* Voice input button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className="flex-shrink-0 flex h-10 w-10 items-center justify-center text-white/70 hover:text-white/90 transition-colors"
          >
            <IconMicrophone size={18} />
          </button>
          
          {/* Send button */}
          <button
            type="submit"
            className={cn(
              "mr-2 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20",
              (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed"
            )}
            disabled={!input.trim() || isLoading}
          >
            <IconSend size={18} className="text-white" />
          </button>
        </div>
        
        {/* Keyboard shortcuts info */}
        <div className="mt-2 text-xs text-white/50 text-center flex flex-wrap items-center justify-center gap-2">
          <p>Press <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">Shift + Enter</kbd> for new line</p>
          <span className="mx-2">•</span>
          <p>Type <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">/</kbd> for commands</p>
        </div>
      </form>
    </div>
  );
};

export default ChatContainer;
