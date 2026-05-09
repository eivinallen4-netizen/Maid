// Pricing configuration for the admin-core system.
// Edit these values to customize pricing for your business.

export type ServiceType = "standard" | "deep" | "moveout";
export type HomeSize = "1bed" | "2bed" | "3bed" | "4bed" | "5bed" | "6bed";

export interface Pricing {
  serviceTypes: Record<ServiceType, number>;
  homeSizeSurcharge: {
    "3bed": number;
    "4bed": number;
    "5bed": number;
    "6bed": number;
  };
  addons: {
    refrigerator: number;
    oven: number;
    onsite_laundry: number;
    dishes: number;
    green_products: number;
    organizing: number;
    windows: number;
    blinds: number;
    heavy_duty: number;
    cabinets: number;
    walls: number;
    deep_clean_floors: number;
    balcony: number;
    garage_sweep: number;
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
    "6bed": 300,
  },
  addons: {
    refrigerator: 45,
    oven: 50,
    onsite_laundry: 35,
    dishes: 25,
    green_products: 15,
    organizing: 40,
    windows: 50,
    blinds: 30,
    heavy_duty: 60,
    cabinets: 35,
    walls: 40,
    deep_clean_floors: 55,
    balcony: 45,
    garage_sweep: 50,
  },
  jobMinimum: 150,
};
