import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns true when a URL points to an asset that should bypass Next.js image
 * optimization. Local raster files under `/uploads/` can still be optimized.
 */
export function isDirectFile(url: string | undefined): boolean {
  if (!url) return false;
  return url.startsWith("/api/files?") || /\.svg(?:\?|$)/i.test(url);
}
