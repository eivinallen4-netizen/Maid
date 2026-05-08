export function storedMediaToDisplayUrl(media: any): string {
  if (typeof media === "string") {
    return media;
  }
  return "";
}
