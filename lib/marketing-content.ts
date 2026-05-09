export const BUSINESS = {
  name: "Mountain Springs Cleaning",
  shortName: "Mountain Springs",
  location: "Las Vegas, NV",
  city: "Las Vegas",
  state: "NV",
  country: "US",
  phone: "(702) 867-5309",
  email: "hello@mountainsprings.co",
  website: "https://mountainspringsclean.com",
  description: "Professional home cleaning in Las Vegas. Background-checked, fully insured, satisfaction guaranteed.",
  primaryLocation: "Las Vegas, NV",
  serviceAreas: ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas", "Centennial Hills"],
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
