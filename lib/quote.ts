import type { PaneType, Pricing, StoryLevel } from "@/lib/pricing";

export type AddOnSelection = {
  screen?: boolean;
  track?: boolean;
  hard_water?: boolean;
  interior?: boolean;
};

export type QuoteSelections = {
  // Window cleaning (legacy)
  paneCounts?: Partial<Record<PaneType, number>>;
  storyLevel?: StoryLevel;
  addons?: AddOnSelection;
  // Maid service
  serviceType?: string;
  homeSize?: string;
};

export type QuoteTotals = {
  base: number;
  storySurcharge: number;
  addonsTotal: number;
  subtotal: number;
  total: number;
  minimumApplied: boolean;
};

export function computeQuote(pricing: Pricing, selections: QuoteSelections): QuoteTotals {
  const paneTypes = pricing.paneTypes ?? ({} as Record<PaneType, number>);
  const base = (Object.keys(paneTypes) as PaneType[]).reduce((sum, type) => {
    const count = selections.paneCounts?.[type] ?? 0;
    const price = paneTypes[type] ?? 0;
    return sum + count * price;
  }, 0);
  const totalWindows = (Object.values(selections.paneCounts ?? {}) ?? []).reduce((sum, count) => sum + count, 0);
  const storySurcharge =
    selections.storyLevel === "3+" ? totalWindows * (pricing.storySurcharge?.third_plus ?? 0) : 0;

  let addonsTotal = 0;
  if (selections.addons?.screen) {
    addonsTotal += totalWindows * (pricing.addons.screen ?? 0);
  }
  if (selections.addons?.track) {
    addonsTotal += totalWindows * (pricing.addons.track ?? 0);
  }
  if (selections.addons?.hard_water) {
    addonsTotal += totalWindows * (pricing.addons.hard_water ?? 0);
  }
  if (selections.addons?.interior) {
    addonsTotal += totalWindows * (pricing.addons.interior ?? 0);
  }

  const subtotal = base + storySurcharge + addonsTotal;
  const total = Math.max(subtotal, pricing.jobMinimum);

  return {
    base,
    storySurcharge,
    addonsTotal,
    subtotal,
    total,
    minimumApplied: total !== subtotal,
  };
}
