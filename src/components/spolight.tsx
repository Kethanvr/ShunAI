import React from "react";
import { TextHoverEffectDemo } from "./TextRevel";

export function SpotlightPreview() {
  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div className="h-20" />
      <TextHoverEffectDemo />
      <div className="h-20" />
    </div>
  );
}
