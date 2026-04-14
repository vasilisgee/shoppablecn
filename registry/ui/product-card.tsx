"use client"

import * as React from "react"
import Image from "next/image"
import { Eye, Heart, ShoppingCart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import type {
  Price,
  Product,
  ProductBadge,
  ProductCardLayout,
  ProductCardProps,
} from "./types"
import { formatPrice } from "./utils"

const badgeVariants: Record<
  NonNullable<ProductBadge["variant"]>,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  default: "secondary",
  sale: "destructive",
  new: "default",
}

type ProductCardImageProps = {
  product: Product
  layout: ProductCardLayout
}

type ProductCardTitleProps = {
  product: Product
  layout: ProductCardLayout
}

type ProductCardPriceProps = {
  price: Price
}

type ProductCardBadgeProps = {
  badge: ProductBadge
}

type ProductCardActionsProps = {
  layout: ProductCardLayout
  product: Product
  showQuickView: boolean
  onAddToCart?: ProductCardProps["onAddToCart"]
  onQuickView?: ProductCardProps["onQuickView"]
}

function ProductCardImage({ product, layout }: ProductCardImageProps) {
  const [hasImageError, setHasImageError] = React.useState(false)

  const imageContent = hasImageError ? (
    <div
      aria-label={`${product.image.alt} unavailable`}
      className="flex h-full w-full items-center justify-center bg-muted px-4 text-center text-sm text-muted-foreground"
      role="img"
    >
      Image unavailable
    </div>
  ) : (
    <Image
      fill
      alt={product.image.alt}
      className="object-cover transition-transform duration-200 motion-reduce:transition-none group-hover/card:scale-[1.02]"
      onError={() => setHasImageError(true)}
      sizes={
        layout === "vertical"
          ? "(min-width: 1024px) 20rem, (min-width: 768px) 33vw, 100vw"
          : "(min-width: 1024px) 18rem, 100vw"
      }
      src={product.image.src}
    />
  )

  const containerClasses = cn(
    "relative overflow-hidden bg-muted",
    layout === "vertical" ? "aspect-square" : "aspect-[4/5] min-h-full"
  )

  if (!product.href) {
    return <div className={containerClasses}>{imageContent}</div>
  }

  return (
    <a
      className={cn(
        containerClasses,
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
      href={product.href}
    >
      {imageContent}
    </a>
  )
}

function ProductCardTitle({ product, layout }: ProductCardTitleProps) {
  const titleClasses = cn(
    "font-semibold tracking-tight",
    layout === "horizontal-detailed" ? "text-xl" : "line-clamp-2 text-lg"
  )

  if (!product.href) {
    return <h3 className={titleClasses}>{product.title}</h3>
  }

  return (
    <a
      className={cn(
        titleClasses,
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
      href={product.href}
    >
      {product.title}
    </a>
  )
}

function ProductCardPrice({ price }: ProductCardPriceProps) {
  return (
    <div className="flex items-end gap-2">
      <span className="text-base font-semibold">{formatPrice(price)}</span>
      {typeof price.compareAt === "number" ? (
        <s
          aria-label={`Original price ${formatPrice({
            amount: price.compareAt,
            currency: price.currency,
          })}`}
          className="text-sm text-muted-foreground"
        >
          {formatPrice({
            amount: price.compareAt,
            currency: price.currency,
          })}
        </s>
      ) : null}
    </div>
  )
}

function ProductCardBadge({ badge }: ProductCardBadgeProps) {
  return (
    <Badge
      className="pointer-events-none absolute top-3 left-3"
      variant={badge.variant ? badgeVariants[badge.variant] : "secondary"}
    >
      {badge.label}
    </Badge>
  )
}

function ProductCardActions({
  layout,
  product,
  showQuickView,
  onAddToCart,
  onQuickView,
}: ProductCardActionsProps) {
  const actionButtons = showQuickView ? (
    <Button
      aria-label="Open quick view"
      onClick={() => onQuickView?.(product.id)}
      size="icon"
      type="button"
      variant="outline"
    >
      <Eye aria-hidden="true" />
    </Button>
  ) : null

  const addToCartButton = (
    <Button
      className={layout === "vertical" ? undefined : "w-full sm:w-auto"}
      onClick={() => onAddToCart?.({ productId: product.id })}
      type="button"
    >
      <ShoppingCart aria-hidden="true" />
      Add to cart
    </Button>
  )

  if (layout === "vertical") {
    return (
      <div className="flex items-center gap-2">
        {actionButtons}
        {addToCartButton}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      {actionButtons}
      {addToCartButton}
    </div>
  )
}

export function ProductCard({
  product,
  layout = "vertical",
  showWishlist = false,
  showRating = true,
  showQuickView = false,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "group/card relative h-full gap-0 overflow-hidden py-0",
        className
      )}
    >
      <ProductCardImage layout={layout} product={product} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-3">
          {product.category ? (
            <p className="text-sm text-muted-foreground">{product.category}</p>
          ) : null}
          <ProductCardTitle layout={layout} product={product} />
          {showWishlist ? (
            <Button
              aria-label="Add to wishlist"
              aria-pressed="false"
              className="absolute top-3 right-3"
              onClick={() => onWishlistToggle?.(product.id)}
              size="icon"
              type="button"
              variant="outline"
            >
              <Heart aria-hidden="true" />
            </Button>
          ) : null}
          {showRating && product.rating ? (
            <p
              aria-label={`${product.rating.value} out of 5 stars, ${product.rating.count} reviews`}
              className="text-sm text-muted-foreground"
            >
              {product.rating.value.toFixed(1)} ({product.rating.count})
            </p>
          ) : null}
          {layout === "horizontal-detailed" && product.description ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {product.description}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <ProductCardPrice price={product.price} />
          <ProductCardActions
            layout={layout}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            product={product}
            showQuickView={showQuickView}
          />
        </div>
      </div>

      {product.badge ? <ProductCardBadge badge={product.badge} /> : null}
    </Card>
  )
}
