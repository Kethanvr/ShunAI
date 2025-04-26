"use client";

import React, { useState } from "react";
import { 
  IconAdjustmentsHorizontal, 
  IconMoon, 
  IconSun, 
  IconTypography, 
  IconEye, 
  IconEyeOff,
  IconZoomIn,
  IconZoomOut,
  IconColorSwatch,
  IconArrowsMaximize,
  IconArrowsMinimize
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [fontSize, setFontSize] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [colorTheme, setColorTheme] = useState<"purple" | "blue" | "green" | "pink" | "amber">("purple");
  
  // Color theme mappings
  const colorThemes = {
    purple: { primary: "from-indigo-500 to-purple-600", accent: "bg-purple-500" },
    blue: { primary: "from-blue-500 to-cyan-600", accent: "bg-blue-500" },
    green: { primary: "from-emerald-500 to-green-600", accent: "bg-emerald-500" },
    pink: { primary: "from-pink-500 to-rose-600", accent: "bg-pink-500" },
    amber: { primary: "from-amber-500 to-orange-600", accent: "bg-amber-500" }
  };

  // Update document properties when accessibility options change
  // This would actually be implemented with CSS variables or context
  const applySettings = () => {
    // Implementation would update CSS variables or use a context provider
    console.log("Applied settings:", { theme, fontSize, reducedMotion, highContrast, colorTheme });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Panel toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
        title="Accessibility options"
      >
        <IconAdjustmentsHorizontal size={24} className="text-white" />
        {/* Notification dot for first-time users */}
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-pink-500 border border-white"></span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-72 rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="border-b border-white/10 bg-white/5 px-4 py-3">
            <h2 className="text-sm font-medium text-white">Accessibility Options</h2>
          </div>
          
          <div className="p-4">
            {/* Theme */}
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium text-white/70">Theme</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => { setTheme("light"); applySettings(); }}
                  className={cn(
                    "flex-1 rounded-md border border-white/10 px-3 py-1.5 text-xs",
                    theme === "light" ? "bg-white/20 text-white" : "bg-black/40 text-white/70"
                  )}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <IconSun size={14} />
                    <span>Light</span>
                  </div>
                </button>
                <button
                  onClick={() => { setTheme("dark"); applySettings(); }}
                  className={cn(
                    "flex-1 rounded-md border border-white/10 px-3 py-1.5 text-xs",
                    theme === "dark" ? "bg-white/20 text-white" : "bg-black/40 text-white/70"
                  )}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <IconMoon size={14} />
                    <span>Dark</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Font Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-white/70">Font Size</h3>
                <span className="text-xs text-white/50">{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setFontSize(Math.max(80, fontSize - 10)); applySettings(); }}
                  className="rounded-md border border-white/10 bg-black/40 p-1 text-white/70"
                  disabled={fontSize <= 80}
                >
                  <IconZoomOut size={14} />
                </button>
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="10"
                  value={fontSize}
                  onChange={(e) => { setFontSize(Number(e.target.value)); applySettings(); }}
                  className="flex-1 accent-indigo-500"
                />
                <button
                  onClick={() => { setFontSize(Math.min(150, fontSize + 10)); applySettings(); }}
                  className="rounded-md border border-white/10 bg-black/40 p-1 text-white/70"
                  disabled={fontSize >= 150}
                >
                  <IconZoomIn size={14} />
                </button>
              </div>
            </div>
            
            {/* Color Theme */}
            <div className="mb-4">
              <h3 className="mb-2 text-xs font-medium text-white/70">Color Theme</h3>
              <div className="flex justify-between gap-2">
                {(Object.keys(colorThemes) as Array<keyof typeof colorThemes>).map((color) => (
                  <button
                    key={color}
                    onClick={() => { setColorTheme(color); applySettings(); }}
                    className={cn(
                      "h-8 w-8 rounded-full border-2",
                      colorTheme === color ? "border-white" : "border-transparent"
                    )}
                  >
                    <div className={cn(
                      "h-full w-full rounded-full bg-gradient-to-br",
                      colorThemes[color].primary
                    )}></div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Toggles */}
            <div className="space-y-3">
              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconArrowsMinimize size={16} className="text-white/70" />
                  <span className="text-xs text-white/90">Reduced Motion</span>
                </div>
                <button
                  onClick={() => { setReducedMotion(!reducedMotion); applySettings(); }}
                  className={cn(
                    "relative h-5 w-10 rounded-full transition-colors",
                    reducedMotion ? "bg-indigo-500" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                      reducedMotion && "translate-x-5"
                    )}
                  ></span>
                </button>
              </div>
              
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconColorSwatch size={16} className="text-white/70" />
                  <span className="text-xs text-white/90">High Contrast</span>
                </div>
                <button
                  onClick={() => { setHighContrast(!highContrast); applySettings(); }}
                  className={cn(
                    "relative h-5 w-10 rounded-full transition-colors",
                    highContrast ? "bg-indigo-500" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                      highContrast && "translate-x-5"
                    )}
                  ></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-white/10 bg-white/5 px-4 py-3 text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-white/70 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
