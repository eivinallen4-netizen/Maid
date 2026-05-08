export type ServiceType = "standard" | "deep" | "move_in_out" | "airbnb";
export type HomeSize = "studio" | "1br" | "2br" | "3br" | "4br" | "5br_plus";

export type ServicePrices = Record<HomeSize, number>;

export type Pricing = {
  services: Record<ServiceType, { label: string; prices: ServicePrices }>;
  addons: {
    oven: number;
    fridge: number;
    laundry: number;
    interior_windows: number;
    garage: number;
    patio: number;
  };
  jobMinimum: number;
};

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
    oven: 35,
    fridge: 25,
    laundry: 15,
    interior_windows: 50,
    garage: 45,
    patio: 35,
  },
  jobMinimum: 79,
};
