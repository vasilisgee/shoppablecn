import type { Price } from "./types"

/**
 * Formats a Price object as a localized currency string.
 * Defaults to `en-US` for backwards-compatible output.
 */
export function formatPrice(price: Price, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: price.currency,
  }).format(price.amount / 100)
}
