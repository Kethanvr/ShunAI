import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-black overflow-hidden">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-12 py-8 z-10 relative">
        <div className="flex items-center gap-3">
          <Image src="./public/ChatGPT Image Apr 22, 2025, 02_51_38 AM.png`" alt="K.ai Logo" width={40} height={40} />
          <span className="text-2xl font-bold tracking-widest text-white">K.ai</span>
        </div>
        <nav className="hidden md:flex gap-10 text-gray-300 font-mono text-sm tracking-widest">
          <a href="#grok" className="hover:text-white transition">K</a>
          <a href="#api" className="hover:text-white transition">API</a>
          <a href="#company" className="hover:text-white transition">COMPANY</a>
          {/* <a href="#colossus" className="hover:text-white transition">COLOSSUS</a> */}
          {/* <a href="#careers" className="hover:text-white transition">CAREERS</a> */}
          <a href="#news" className="hover:text-white transition">NEWS</a>
        </nav>
        <button className="border border-gray-600 rounded-full px-6 py-2 text-white font-semibold bg-black/60 hover:bg-white/10 transition">TRY K.AI</button>
      </header>

      {/* Spotlight Effect */}
      <Spotlight className="top-0 right-0 left-0 mx-auto opacity-100 animate-spotlight" fill="#FFD580" />

      {/* Large Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
       
        <h1 className="text-[15vw] font-black text-white/10 tracking-tight leading-none">K.ai </h1>
         <p className="text-[4vh] font-black text-white/10 tracking-tight leading-none">Born from Zero. Built for Infinity.</p>
      </div>

      {/* Search Bar */}
      <div className="relative z-20 flex flex-col items-center mt-[30vh]">
        <div className="flex items-center w-[420px] max-w-full bg-black/80 border border-gray-700 rounded-full px-6 py-4 shadow-lg">
          <input
            className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-400"
            placeholder="Ask K.ai anything..."
            type="text"
          />
          <button className="ml-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
       <p className="mt-8 text-center text-gray-300 max-w-xl text-base">
 
  
 
</p>

        {/* <div className="flex gap-4 mt-8">
          <button className="border border-gray-600 rounded-full px-6 py-2 text-white font-semibold bg-black/60 hover:bg-white/10 transition">BUILD WITH K.AI</button>
          <button className="border border-gray-600 rounded-full px-6 py-2 text-white font-semibold bg-black/60 hover:bg-white/10 transition">LEARN MORE</button>
        </div> */}
      </div>

      {/* Subtle Stars/Particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Simple star effect using CSS, can be replaced with canvas/particles.js for more realism */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-2/4 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-2/5 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-500" />
        <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-700" />
      </div>

      {/* Down Arrow */}
      {/* <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-20">
        <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2"><path d="M16 8v16M8 20l8 8 8-8"/></svg>
      </div> */}
    </main>
  );
}
