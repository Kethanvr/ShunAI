"use client";

import { Suspense, lazy } from "react";

const GoogleAds = lazy(() => import("../GoogleAds"));

interface SidebarAdProps {
  adSlot: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function SidebarAd({
  adSlot,
  className = "",
  size = "medium",
}: SidebarAdProps) {
  const getSidebarStyle = () => {
    switch (size) {
      case "small":
        return {
          width: "200px",
          height: "200px",
          minHeight: "200px",
        };
      case "large":
        return {
          width: "336px",
          height: "280px",
          minHeight: "280px",
        };
      default: // medium
        return {
          width: "300px",
          height: "250px",
          minHeight: "250px",
        };
    }
  };

  const sidebarStyle = getSidebarStyle();

  return (
    <aside
      className={`sidebar-ad-wrapper ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <Suspense
        fallback={
          <div
            style={sidebarStyle}
            className="ad-placeholder bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-sm text-gray-500"
          >
            Advertisement
          </div>
        }
      >
        <GoogleAds
          adSlot={adSlot}
          adFormat="rectangle"
          style={sidebarStyle}
          className="sidebar-ad"
        />
      </Suspense>
    </aside>
  );
}
