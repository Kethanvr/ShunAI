"use client";

import { BannerAd, SidebarAd, InlineAd, AD_SLOTS } from "./index";

// Example usage component demonstrating proper implementation
export default function AdExample() {
  return (
    <div className="ad-example-container">
      {/* Header Banner Ad - High priority for above-the-fold */}
      <BannerAd
        adSlot={AD_SLOTS.HEADER_BANNER}
        priority={true}
        className="header-banner"
      />

      <div className="content-layout flex gap-6">
        {/* Main Content Area */}
        <main className="flex-1">
          <h1>Your Page Content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Inline Ad - Lazy loaded for better performance */}
          <InlineAd
            adSlot={AD_SLOTS.CONTENT_INLINE}
            responsive={true}
            lazyLoad={true}
            className="content-inline-ad"
          />

          <p>More content here...</p>
        </main>

        {/* Sidebar with Ads */}
        <aside className="w-80">
          <SidebarAd
            adSlot={AD_SLOTS.SIDEBAR_MAIN}
            size="medium"
            className="sticky-sidebar-ad"
          />
        </aside>
      </div>

      {/* Footer Banner Ad */}
      <BannerAd adSlot={AD_SLOTS.FOOTER_BANNER} className="footer-banner" />
    </div>
  );
}

// Example of how to set up your own ad slots
export const customAdSlots = {
  // Replace these with your actual ad slot IDs from Google AdSense
  HEADER: "1234567890",
  SIDEBAR: "0987654321",
  CONTENT: "1122334455",
  FOOTER: "5544332211",
};

/*
Usage Instructions:

1. Get your ad slot IDs from Google AdSense dashboard
2. Replace the placeholder values in AD_SLOTS with your actual slot IDs
3. Use the components like this:

// In your page/component:
import { BannerAd, SidebarAd, InlineAd } from '@/components/ads';

// Header banner (loads immediately)
<BannerAd adSlot="your-actual-ad-slot-id" priority={true} />

// Sidebar ad (sticky positioning)
<SidebarAd adSlot="your-actual-ad-slot-id" size="medium" />

// Inline content ad (lazy loaded for performance)
<InlineAd adSlot="your-actual-ad-slot-id" lazyLoad={true} />

SEO Benefits:
- Lazy loading for better Core Web Vitals
- Proper ARIA labels for accessibility
- Responsive design with mobile optimization
- Structured data and semantic HTML
- Error handling and fallback displays
- AdSense script loaded with optimal strategy
*/
