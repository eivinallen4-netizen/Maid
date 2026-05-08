// Pricing configuration for the admin-core system.
// Edit these values to customize pricing for your business.

export type ServiceType = "standard" | "deep" | "moveout";
export type HomeSize = "1bed" | "2bed" | "3bed" | "4bed" | "5bed";

export interface Pricing {
  serviceTypes: Record<ServiceType, number>;
  homeSizeSurcharge: {
    "3bed": number;
    "4bed": number;
    "5bed": number;
  };
  addons: {
    laundry: number;
    windows: number;
    baseboards: number;
    fridge: number;
    move_in: number;
    airbnb_turnover: number;
  };
  jobMinimum: number;
}

/**
 * Default pricing configuration for Mountain Springs Cleaning.
 * Update these values to match your business pricing.
 */
export const defaultPricing: Pricing = {
  serviceTypes: {
    standard: 150,
    deep: 225,
    moveout: 275,
  },
  homeSizeSurcharge: {
    "3bed": 75,
    "4bed": 150,
    "5bed": 225,
  },
  addons: {
    laundry: 35,
    windows: 50,
    baseboards: 40,
    fridge: 45,
    move_in: 125,
    airbnb_turnover: 100,
  },
  jobMinimum: 150,
};
