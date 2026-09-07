import { resolveAssetUrl } from "@/lib/asset-url";

export const PHYSICIAN_PLACEHOLDER = "/images/physicians/placeholder.png";

/** Resolve a physician image URL, falling back to the placeholder when empty. */
export function physicianImageUrl(path?: string): string {
  return resolveAssetUrl(path) || PHYSICIAN_PLACEHOLDER;
}

/** Swap a broken <img> to the placeholder image. */
export function physicianImageFallback(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src.endsWith(PHYSICIAN_PLACEHOLDER)) return;
  img.src = PHYSICIAN_PLACEHOLDER;
  img.srcset = "";
}