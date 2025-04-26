"use client";

import Chatpage from "@/components/Chatpage";
import ParticleBackground from "@/components/ParticleBackground";

const AskPage = () => {
  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden bg-black antialiased">
      <ParticleBackground />
      <div className="w-full h-full z-5">
        <Chatpage />
      </div>
    </div>
  );
};

export default AskPage;
