export const DEFAULT_INSTAGRAM_URL = "https://instagram.com/mountainspringscleaning";

export interface PublicBusinessConfig {
  publishedHours?: Record<string, any>;
  serviceSectionImageUrls: string[];
  sameAsLinks: string[];
  [key: string]: any;
}

export const defaultPublicBusinessConfig: PublicBusinessConfig = {
  publishedHours: {},
  serviceSectionImageUrls: [],
  sameAsLinks: [],
};

export function normalizePublicBusinessConfig(config: any, scheduleWindows?: any): PublicBusinessConfig {
  return config || defaultPublicBusinessConfig;
}

export function buildOpeningHoursSpecification(config: PublicBusinessConfig): any {
  return {};
}
