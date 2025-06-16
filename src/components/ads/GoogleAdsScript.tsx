"use client";

import Script from "next/script";

export default function GoogleAdsScript() {
  return (
    <>
      <Script
        id="google-adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6985167612880362"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          console.log("Google AdSense script loaded successfully");
          // Initialize auto ads
          try {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({
              google_ad_client: "ca-pub-6985167612880362",
              enable_page_level_ads: true,
            });
          } catch (error) {
            console.error("Error initializing auto ads:", error);
          }
        }}
        onError={(e) => {
          console.error("Failed to load Google AdSense script:", e);
        }}
      />
    </>
  );
}
