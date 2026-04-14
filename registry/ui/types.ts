import type * as React from "react"

export type Currency = "EUR" | "USD" | "GBP" | "SEK"

export type Price = {
  /** Amount in minor units (cents). */
  amount: number
  currency: Currency
  /** Optional compare-at price for strikethrough display. In minor units. */
  compareAt?: number
}

export type Rating = {
  /** 0–5 inclusive. */
  value: number
  /** Number of reviews. */
  count: number
}

export type ProductBadge = {
  label: string
  variant?: "default" | "sale" | "new"
}

export type ProductImage = {
  src: string
  alt: string
}

export type VariantOption = {
  /** Display label (e.g., "Cream", "Medium"). */
  label: string
  /** Machine value (e.g., "cream", "m"). */
  value: string
  /** CSS color value for type="swatch" (e.g., "#f5f0e8", "oklch(...)"). */
  swatch?: string
  /** If true, option renders but is not selectable. */
  disabled?: boolean
}

export type ProductVariant = {
  /** Unique identifier used as the key in SelectedVariants. */
  id: string
  /** Display label (e.g., "Color", "Size"). */
  name: string
  /** Input type for rendering. */
  type: "swatch" | "pills" | "select" | "slider" | "checkbox" | "radio"
  /** If true, user must select a value before Add to Cart is enabled. Default: false. */
  required?: boolean
  /** Option list. For type="slider", this is unused. */
  options: VariantOption[]
  /** Optional config specific to type="slider". */
  sliderConfig?: {
    min: number
    max: number
    step: number
    unit?: string
  }
}

export type Product = {
  id: string
  title: string
  description?: string
  category?: string
  /** Array of product images. Must contain at least one entry. First image is the default. */
  images: ProductImage[]
  price: Price
  rating?: Rating
  badge?: ProductBadge
  href?: string
  variants?: ProductVariant[]
}

export type SelectedVariants = Record<string, string | string[] | number>

export type ProductCardLayout =
  | "vertical"
  | "horizontal"
  | "horizontal-detailed"
export type ProductCardVariantsMode = "none" | "inline" | "overlay"

export type ProductCardProps = {
  product: Product
  layout?: ProductCardLayout
  variants?: ProductCardVariantsMode
  /** Which slideshow navigation controls to render when product has multiple images. Default: "both". */
  slideshowControls?: "arrows" | "dots" | "both" | "none"
  showWishlist?: boolean
  showRating?: boolean
  showQuickView?: boolean
  onAddToCart?: (args: {
    productId: string
    selectedVariants?: SelectedVariants
  }) => void
  onWishlistToggle?: (productId: string) => void
  onQuickView?: (productId: string) => void
  className?: string
}

export type HotspotPinVariant = "plus" | "dot"

export type HotspotImageProps = {
  /** Image source. */
  src: string
  /** Image alt text. Required for accessibility. */
  alt: string
  /** Natural width in pixels. Required — matches next/image API. */
  width: number
  /** Natural height in pixels. Required — matches next/image API. */
  height: number
  /** HotspotPin children. */
  children: React.ReactNode
  /** Optional className for the outer scrollable wrapper. */
  className?: string
}

export type HotspotPinProps = {
  /** Horizontal position as a percentage of image width (0–100). */
  x: number
  /** Vertical position as a percentage of image height (0–100). */
  y: number
  /** Visual style of the pin. Default: "plus". */
  variant?: HotspotPinVariant
  /** Accessible label for the pin button. Defaults to "Hotspot at X%, Y%" if not provided. */
  label?: string
  /** Popover content rendered when the pin is activated. */
  children: React.ReactNode
  /** Optional className for the pin button. */
  className?: string
}

export type HotspotTooltipProps = {
  /** Title displayed at top of the tooltip. */
  title: string
  /** Description text below the title. */
  description: string
  /** Optional className for the tooltip container. */
  className?: string
}

export type HotspotLinkProps = {
  /** Link label. */
  label: string
  /** Link href. */
  href: string
  /** Optional target (e.g., "_blank"). */
  target?: React.HTMLAttributeAnchorTarget
  /** Optional className for the link container. */
  className?: string
}
