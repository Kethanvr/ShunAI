'use client";';
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { div } from "motion/react-client";
import { NavbarButton } from "./ui/resizable-navbar";

const Header = () => {
  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      
        <TextHoverEffect text="Shūn.AI" />

    <div className="absolute inset-x-0 flex justify-center" style={{ top: '85%' }}>
          <a href="/chat">
            <NavbarButton variant="primary">~</NavbarButton>
          </a>
    </div>
    </div>
  );
};

export default Header;
