import type { Price } from "./types"

/**
 * Formats a Price object as a localized currency string.
 * Uses `en-US` locale for predictability; consumers can wrap for their own locale.
 */
export function formatPrice(price: Price): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.amount / 100)
}
