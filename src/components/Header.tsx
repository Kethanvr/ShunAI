'use client";';
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const Header = () => {
  return (
    <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <TextHoverEffect text="Shūn.AI" />
    </div>
  );
};

export default Header;
