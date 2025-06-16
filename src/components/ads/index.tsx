// Google Ads Components
export { default as GoogleAds } from "../GoogleAds";
export { default as BannerAd } from "./BannerAd";
export { default as SidebarAd } from "./SidebarAd";
export { default as InlineAd } from "./InlineAd";
export { default as GoogleAdsScript } from "./GoogleAdsScript";

// Types
export interface AdSlotConfig {
  id: string;
  name: string;
  format: "banner" | "sidebar" | "inline";
  size?: "small" | "medium" | "large";
  priority?: boolean;
}

// Common ad slot configurations
export const AD_SLOTS = {
  HEADER_BANNER: "your-header-banner-slot",
  SIDEBAR_MAIN: "your-sidebar-main-slot",
  CONTENT_INLINE: "your-content-inline-slot",
  FOOTER_BANNER: "your-footer-banner-slot",
} as const;
