// Business configuration for the admin-core system.
// Customize these values to match your business details.

export interface BusinessConfig {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  supportEmail: string;
  websiteUrl: string;
  logoUrl?: string;
  supportPhone?: string;
  timezone: string;
  currency: "USD" | "EUR" | "GBP" | "CAD";
}

/**
 * Default business configuration.
 * Update these values with your actual business information.
 */
export const defaultBusinessConfig: BusinessConfig = {
  companyName: "Mountain Springs Cleaning",
  companyEmail: "bookings@mountainspringsclean.com",
  companyPhone: "+1 (702) 555-CLEAN",
  supportEmail: "support@mountainspringsclean.com",
  websiteUrl: "https://mountainspringsclean.com",
  supportPhone: "+1 (702) 555-CLEAN",
  timezone: "America/Los_Angeles",
  currency: "USD",
};

/**
 * Service types offered by the business.
 */
export const serviceTypes = [
  { id: "standard-clean", name: "Standard Clean", description: "Weekly or bi-weekly regular cleaning" },
  { id: "deep-clean", name: "Deep Clean", description: "Thorough full-home deep cleaning" },
  { id: "move-out", name: "Move-Out Clean", description: "Complete move-in/move-out cleaning" },
  { id: "airbnb", name: "Airbnb Turnover", description: "Fast turnaround for short-term rentals" },
  { id: "eco-clean", name: "Eco-Friendly Clean", description: "Green products, non-toxic cleaning" },
];

/**
 * Service areas in Las Vegas.
 */
export const serviceAreas = [
  { id: "summerlin", name: "Summerlin", radius: 12 },
  { id: "henderson", name: "Henderson", radius: 15 },
  { id: "centennial-hills", name: "Centennial Hills", radius: 18 },
  { id: "southwest", name: "Southwest Las Vegas", radius: 10 },
  { id: "northwest", name: "Northwest Las Vegas", radius: 15 },
  { id: "northeast", name: "Northeast Las Vegas", radius: 12 },
];

/**
 * Business hours configuration.
 * Mountain Springs operates 6 days a week with flexible scheduling for shift workers.
 */
export const businessHours = {
  monday: { open: "07:00", close: "19:00", enabled: true },
  tuesday: { open: "07:00", close: "19:00", enabled: true },
  wednesday: { open: "07:00", close: "19:00", enabled: true },
  thursday: { open: "07:00", close: "19:00", enabled: true },
  friday: { open: "07:00", close: "19:00", enabled: true },
  saturday: { open: "08:00", close: "17:00", enabled: true },
  sunday: { open: "00:00", close: "00:00", enabled: false },
};

/**
 * Schedule settings for customer booking.
 */
export const scheduleSettings = {
  minBookingAdvanceHours: 24,
  maxBookingAdvanceDays: 60,
  slotDurationMinutes: 60,
  repSchedleAvailabilityHours: 8,
};

/**
 * Get business config with environment variable overrides.
 */
export function getBusinessConfig(): BusinessConfig {
  return {
    ...defaultBusinessConfig,
    companyName: process.env.BUSINESS_NAME || defaultBusinessConfig.companyName,
    companyEmail:
      process.env.BUSINESS_EMAIL || defaultBusinessConfig.companyEmail,
    companyPhone:
      process.env.BUSINESS_PHONE || defaultBusinessConfig.companyPhone,
    websiteUrl: process.env.WEBSITE_URL || defaultBusinessConfig.websiteUrl,
    timezone: process.env.TIMEZONE || defaultBusinessConfig.timezone,
  };
}
