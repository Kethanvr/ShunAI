"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  adTest?: boolean;
}

export default function GoogleAds({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className = "",
  adTest = process.env.NODE_ENV === "development",
}: GoogleAdsProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Error loading Google Ads:", error);
    }
  }, []);

  return (
    <div className={`google-ads-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          ...style,
        }}
        data-ad-client="ca-pub-6985167612880362"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        data-adtest={adTest ? "on" : "off"}
      />
    </div>
  );
}
