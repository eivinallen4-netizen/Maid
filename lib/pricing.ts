export type ServiceType = "standard" | "deep" | "move_in_out" | "airbnb";
export type HomeSize = "studio" | "1br" | "2br" | "3br" | "4br" | "5br_plus";

export type ServicePrices = Record<HomeSize, number>;

export type Pricing = {
  services: Record<ServiceType, { label: string; prices: ServicePrices }>;
  addons: {
    refrigerator: number;
    oven: number;
    laundry: number;
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
    // Window cleaning addons (for admin quotes)
    screen?: number;
    track?: number;
    hard_water?: number;
    interior?: number;
  };
  // Window cleaning pricing (for admin quotes)
  paneTypes?: Record<PaneType, number>;
  storySurcharge?: { third_plus: number };
  jobMinimum: number;
  anchorMultiplier: number;
};

// Window cleaning service types (for admin-core compatibility)
export type PaneType = "standard" | "specialty" | "french";
export type StoryLevel = "1-2" | "3+";

export const defaultPricing: Pricing = {
  services: {
    standard: {
      label: "Standard Clean",
      prices: { studio: 79, "1br": 99, "2br": 129, "3br": 159, "4br": 189, "5br_plus": 229 },
    },
    deep: {
      label: "Deep Clean",
      prices: { studio: 129, "1br": 159, "2br": 199, "3br": 249, "4br": 299, "5br_plus": 349 },
    },
    move_in_out: {
      label: "Move-In / Move-Out",
      prices: { studio: 159, "1br": 199, "2br": 249, "3br": 299, "4br": 349, "5br_plus": 399 },
    },
    airbnb: {
      label: "Airbnb Turnover",
      prices: { studio: 89, "1br": 109, "2br": 139, "3br": 169, "4br": 199, "5br_plus": 239 },
    },
  },
  addons: {
    refrigerator: 30,
    oven: 35,
    laundry: 20,
    dishes: 25,
    green_products: 15,
    organizing: 45,
    windows: 50,
    blinds: 25,
    heavy_duty: 75,
    cabinets: 40,
    walls: 45,
    deep_clean_floors: 50,
    balcony: 35,
    garage_sweep: 40,
    // Window cleaning addons
    screen: 15,
    track: 20,
    hard_water: 25,
    interior: 30,
  },
  paneTypes: {
    standard: 8,
    specialty: 12,
    french: 10,
  },
  storySurcharge: {
    third_plus: 5,
  },
  jobMinimum: 79,
  anchorMultiplier: 1.3,
};
