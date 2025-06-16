"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

const GoogleAds = lazy(() => import("../GoogleAds"));

interface InlineAdProps {
  adSlot: string;
  className?: string;
  responsive?: boolean;
  lazyLoad?: boolean;
}

export default function InlineAd({
  adSlot,
  className = "",
  responsive = true,
  lazyLoad = true,
}: InlineAdProps) {
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazyLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad]);

  const inlineStyle = {
    width: "100%",
    maxWidth: responsive ? "100%" : "728px",
    height: "auto",
    minHeight: "90px",
    margin: "20px auto",
    display: "block",
  };

  return (
    <div
      ref={adRef}
      className={`inline-ad-wrapper ${className}`}
      role="banner"
      aria-label="Advertisement"
      style={{ margin: "20px 0" }}
    >
      {isVisible ? (
        <Suspense
          fallback={
            <div
              style={inlineStyle}
              className="ad-placeholder bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-sm text-gray-500 h-24"
            >
              Loading Advertisement...
            </div>
          }
        >
          <GoogleAds
            adSlot={adSlot}
            adFormat={responsive ? "auto" : "horizontal"}
            fullWidthResponsive={responsive}
            style={inlineStyle}
            className="inline-ad"
          />
        </Suspense>
      ) : (
        <div
          style={inlineStyle}
          className="ad-placeholder bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-sm text-gray-500 h-24"
        >
          Advertisement
        </div>
      )}
    </div>
  );
}
