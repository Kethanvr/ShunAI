"use client";

import {Chatpage} from "@/components/Chatpage";
import ParticleBackground from "@/components/ParticleBackground";

const AskPage = () => {
  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <ParticleBackground />
      <Chatpage />
    </div>
  );
};

export default AskPage;
