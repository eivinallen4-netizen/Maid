export const BUSINESS = {
  name: "Mountain Springs Cleaning",
  location: "Las Vegas, NV",
};

export const PRIMARY_KEYWORDS = [
  "cleaning service Las Vegas",
  "house cleaning Las Vegas",
  "maid service Las Vegas",
];

export interface MarketingContent {
  headline: string;
  subheading: string;
  cta: string;
}

export const defaultMarketingContent: MarketingContent = {
  headline: "Professional Cleaning in Las Vegas",
  subheading: "Trusted by thousands of homes",
  cta: "Get a Free Quote",
};
