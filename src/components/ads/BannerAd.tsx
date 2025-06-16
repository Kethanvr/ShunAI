"use client";

import { Suspense, lazy } from "react";

const GoogleAds = lazy(() => import("../GoogleAds"));

interface BannerAdProps {
  adSlot: string;
  className?: string;
  priority?: boolean;
}

export default function BannerAd({
  adSlot,
  className = "",
  priority = false,
}: BannerAdProps) {
  const bannerStyle = {
    width: "100%",
    height: "90px",
    minHeight: "90px",
    maxWidth: "728px",
    margin: "0 auto",
  };

  if (priority) {
    // Load immediately for above-the-fold ads
    return (
      <div
        className={`banner-ad-wrapper ${className}`}
        role="banner"
        aria-label="Advertisement"
      >
        <GoogleAds
          adSlot={adSlot}
          adFormat="horizontal"
          style={bannerStyle}
          className="banner-ad"
        />
      </div>
    );
  }

  return (
    <div
      className={`banner-ad-wrapper ${className}`}
      role="banner"
      aria-label="Advertisement"
    >
      <Suspense
        fallback={
          <div
            style={bannerStyle}
            className="ad-placeholder bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-sm text-gray-500"
          >
            Advertisement
          </div>
        }
      >
        <GoogleAds
          adSlot={adSlot}
          adFormat="horizontal"
          style={bannerStyle}
          className="banner-ad"
        />
      </Suspense>
    </div>
  );
}
