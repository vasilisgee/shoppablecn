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
  label: string
  value: string
  /** CSS color value for type="swatch". */
  swatch?: string
  disabled?: boolean
}

export type ProductVariant = {
  id: string
  name: string
  type: "swatch" | "pills" | "select" | "slider" | "checkbox" | "radio"
  required?: boolean
  options: VariantOption[]
}

export type Product = {
  id: string
  title: string
  description?: string
  category?: string
  image: ProductImage
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
