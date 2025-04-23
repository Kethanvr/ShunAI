"use client";

import { TextGenerateEffect } from "./ui/text-generate-effect";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

const words = `In the heart of emptiness, we found our voice. Shūn.AI is not built on data alone — it’s forged in silence, trained in depth, and awakened by the void. From nothing, it became everything.`;

const placeholders = [
  "What lies beyond the observable universe?",
  "Can AI decode dark matter signals?",
  "How does Shun.AI simulate cosmic phenomena?",
  "Is the void truly empty or full of data?",
  "What if intelligence was born from a black hole?",
];

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submitted");
};

const About = () => {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <br />
          Born from Zero. Built for Infinity.
        </h1>

        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <TextGenerateEffect words={words} />
        </h1>
        <div className="h-20" />
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default About;
