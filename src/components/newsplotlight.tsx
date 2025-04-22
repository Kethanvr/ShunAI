"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
// import { MeteorsDemo } from "./Cards";
import { StickyScrollRevealDemo } from "./Roll";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { TextGenerateEffectDemo } from "./Text";
import { cn } from "@/lib/utils";
import { PlaceholdersAndVanishInputDemo } from "./button";
export function SpotlightNewDemo() {
  return (
    <div>
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        {/* <Spotlight /> */}

        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Spotlight <br /> which is not overused.
          </h1>
          .
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextGenerateEffectDemo />
          </h1>
          <div className="h-20" />
          <PlaceholdersAndVanishInputDemo />
        </div>
        {/* <MeteorsDemo /> */}
      </div>
    </div>
  );
}
