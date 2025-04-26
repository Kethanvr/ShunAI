"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  IconMicrophone, 
  IconPlus, 
  IconRefresh, 
  IconSettings, 
  IconPhoto, 
  IconX,
  IconDeviceFloppy
} from "@tabler/icons-react";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Background overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Floating menu items */}
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col-reverse gap-3 items-center">
            {[
              { 
                icon: <IconMicrophone size={20} />, 
                label: "Voice Input",
                color: "from-blue-600 to-indigo-600"
              },
              { 
                icon: <IconPhoto size={20} />, 
                label: "Upload Image",
                color: "from-purple-600 to-pink-600"
              },
              { 
                icon: <IconRefresh size={20} />, 
                label: "New Chat",
                color: "from-green-600 to-emerald-600"
              },
              { 
                icon: <IconDeviceFloppy size={20} />, 
                label: "Save Chat",
                color: "from-amber-500 to-orange-600"
              },
              { 
                icon: <IconSettings size={20} />, 
                label: "Settings",
                color: "from-slate-600 to-slate-700"
              }
            ].map((item, index) => (
              <button
                key={index}
                className="group relative flex items-center"
                onClick={() => console.log(`Clicked: ${item.label}`)}
              >
                {/* Button label */}
                <span className="absolute right-14 bg-black/90 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                  {item.label}
                </span>
                
                {/* Button */}
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br",
                    item.color,
                    "transition-transform duration-200 hover:scale-110"
                  )}
                >
                  {item.icon}
                </div>
              </button>
            ))}
          </div>
        )}
        
        {/* Main button with pulse effect */}
        <button
          onClick={toggleMenu}
          className={cn(
            "w-12 h-12 rounded-full shadow-lg flex items-center justify-center",
            "bg-gradient-to-br from-indigo-600 to-purple-700",
            "transition-transform duration-200",
            isOpen ? "rotate-45" : "",
            "relative"
          )}
        >
          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-indigo-600 opacity-50 animate-ping" />
          )}
          
          {/* Button icon */}
          {isOpen ? (
            <IconX size={24} className="text-white" />
          ) : (
            <IconPlus size={24} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
