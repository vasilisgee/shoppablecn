"use client"

import * as React from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react"

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
import { QuickOptions } from "./quick-options"
import { formatPrice } from "./utils"

const badgeVariants: Record<
  NonNullable<ProductBadge["variant"]>,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  default: "secondary",
  sale: "destructive",
  new: "default",
}

const layoutClasses: Record<ProductCardLayout, string> = {
  vertical: "flex-col",
  horizontal: "grid gap-0 sm:grid-cols-[200px_1fr]",
  "horizontal-detailed": "grid gap-0 lg:grid-cols-[300px_1fr]",
}

const imageLayoutClasses: Record<ProductCardLayout, string> = {
  vertical: "aspect-square",
  horizontal: "aspect-[4/3] sm:aspect-auto sm:min-h-full",
  "horizontal-detailed": "aspect-[4/3] lg:aspect-auto lg:min-h-full",
}

const contentLayoutClasses: Record<ProductCardLayout, string> = {
  vertical: "p-4",
  horizontal: "p-4",
  "horizontal-detailed": "p-5 lg:p-6",
}

type ProductCardSlideshowControls = NonNullable<
  ProductCardProps["slideshowControls"]
>

const ProductCardSlideshowControlsContext =
  React.createContext<ProductCardSlideshowControls>("both")

function getImageSizes(layout: ProductCardLayout) {
  return layout === "vertical"
    ? "(min-width: 1024px) 20rem, (min-width: 768px) 33vw, 100vw"
    : "(min-width: 1024px) 18rem, 100vw"
}

export type ProductCardImageProps = {
  product: Product
  layout: ProductCardLayout
}

export type ProductCardTitleProps = {
  product: Product
  layout: ProductCardLayout
}

export type ProductCardPriceProps = {
  price: Price
}

export type ProductCardBadgeProps = {
  badge: ProductBadge
}

export type ProductCardActionsProps = {
  layout: ProductCardLayout
  product: Product
  showQuickView: boolean
  onPrimaryAction: () => void
  primaryActionLabel: string
  primaryActionHasPopup?: "dialog"
  primaryActionExpanded?: boolean
  onQuickView?: ProductCardProps["onQuickView"]
}

type StarsProps = {
  value: number
  count: number
}

function Stars({ value, count }: StarsProps) {
  const clampedValue = Math.max(0, Math.min(5, value))

  return (
    <div
      aria-label={`${clampedValue} out of 5 stars, ${count} reviews`}
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const fillPercentage = Math.max(
            0,
            Math.min(100, (clampedValue - index) * 100)
          )

          return (
            <span className="relative inline-flex" key={`${index}-${count}`}>
              <Star className="size-4 text-muted-foreground/40" />
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className="size-4 fill-current text-foreground" />
              </span>
            </span>
          )
        })}
      </div>
      <span>({count})</span>
    </div>
  )
}

export function ProductCardImage({
  product,
  layout,
}: ProductCardImageProps) {
  const slideshowControls = React.useContext(
    ProductCardSlideshowControlsContext
  )
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [imageErrors, setImageErrors] = React.useState<number[]>([])
  const [loadedImageIndexes, setLoadedImageIndexes] = React.useState([0])
  const hasMultipleImages = product.images.length > 1
  const showArrowControls =
    slideshowControls === "arrows" || slideshowControls === "both"
  const showDotControls =
    slideshowControls === "dots" || slideshowControls === "both"
  const containerClasses = cn(
    "relative overflow-hidden bg-muted",
    imageLayoutClasses[layout]
  )
  const imageSizes = getImageSizes(layout)

  React.useEffect(() => {
    setCurrentIndex(0)
    setImageErrors([])
    setLoadedImageIndexes([0])
  }, [product.id])

  const handleImageError = React.useCallback((index: number) => {
    setImageErrors((currentErrors) => {
      if (currentErrors.includes(index)) {
        return currentErrors
      }

      return [...currentErrors, index]
    })
  }, [])

  const renderImageFallback = React.useCallback(
    (alt: string) => (
      <div
        aria-label={`${alt} unavailable`}
        className="flex h-full w-full items-center justify-center bg-muted px-4 text-center text-sm text-muted-foreground"
        role="img"
      >
        Image unavailable
      </div>
    ),
    []
  )

  const goToImage = React.useCallback((nextIndex: number) => {
    setLoadedImageIndexes((currentIndexes) => {
      if (currentIndexes.includes(nextIndex)) {
        return currentIndexes
      }

      return [...currentIndexes, nextIndex]
    })
    setCurrentIndex(nextIndex)
  }, [])

  const handleCarouselKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goToImage(Math.max(0, currentIndex - 1))
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        goToImage(Math.min(product.images.length - 1, currentIndex + 1))
      }
    },
    [currentIndex, goToImage, product.images.length]
  )

  if (!hasMultipleImages) {
    const primaryImage = product.images[0]
    const hasImageError = imageErrors.includes(0)

    const imageContent = hasImageError ? (
      renderImageFallback(primaryImage.alt)
    ) : (
      <Image
        fill
        alt={primaryImage.alt}
        className="object-cover transition-transform duration-200 motion-reduce:transition-none group-hover/card:scale-[1.02]"
        onError={() => handleImageError(0)}
        sizes={imageSizes}
        src={primaryImage.src}
      />
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

  const slideList = (
    <div aria-live="polite" className="relative h-full w-full">
      {product.images.map((image, index) => {
        const isActive = index === currentIndex
        const hasImageError = imageErrors.includes(index)
        const shouldLoadImage = loadedImageIndexes.includes(index)

        return (
          <div
            aria-hidden={!isActive}
            aria-label={`${index + 1} of ${product.images.length}`}
            aria-roledescription="slide"
            className={cn(
              "absolute inset-0 transition-opacity duration-200 motion-reduce:transition-none",
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            key={`${product.id}-${image.src}-${index}`}
            role="group"
          >
            {hasImageError ? (
              renderImageFallback(image.alt)
            ) : !shouldLoadImage ? (
              <div aria-hidden="true" className="h-full w-full bg-muted" />
            ) : (
              <Image
                fill
                alt={image.alt}
                className="object-cover transition-transform duration-200 motion-reduce:transition-none group-hover/card:scale-[1.02]"
                loading={index === 0 ? "eager" : "lazy"}
                onError={() => handleImageError(index)}
                sizes={imageSizes}
                src={image.src}
              />
            )}
          </div>
        )
      })}
    </div>
  )

  const mediaContent = product.href ? (
    <a
      className="absolute inset-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      href={product.href}
    >
      {slideList}
    </a>
  ) : (
    <div className="absolute inset-0">{slideList}</div>
  )

  return (
    <div
      aria-label={`${product.title} images`}
      aria-roledescription="carousel"
      className={cn(
        containerClasses,
        !product.href &&
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
      onKeyDown={handleCarouselKeyDown}
      role="region"
      tabIndex={!product.href ? 0 : undefined}
    >
      {mediaContent}

      {showArrowControls ? (
        <Button
          aria-label="Previous image"
          className="absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer rounded-full border-white/20 bg-black/55 text-white shadow-sm backdrop-blur-sm hover:bg-black/65 hover:text-white active:translate-y-0"
          disabled={currentIndex === 0}
          onClick={() => goToImage(Math.max(0, currentIndex - 1))}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
      ) : null}

      {showDotControls ? (
        <div className="absolute right-1/2 bottom-3 z-10 flex translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/55 px-1.5 py-0.5 shadow-sm backdrop-blur-sm">
          {product.images.map((image, index) => {
            const isActive = index === currentIndex

            return (
              <button
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to image ${index + 1} of ${product.images.length}`}
                className={cn(
                  "flex size-3.5 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10",
                  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive && "bg-white/10"
                )}
                key={`${image.src}-${index}`}
                onClick={() => goToImage(index)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full bg-white/65 transition-colors",
                    isActive ? "bg-white" : "bg-white/65"
                  )}
                />
              </button>
            )
          })}
        </div>
      ) : null}

      {showArrowControls ? (
        <Button
          aria-label="Next image"
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full border-white/20 bg-black/55 text-white shadow-sm backdrop-blur-sm hover:bg-black/65 hover:text-white active:translate-y-0"
          disabled={currentIndex === product.images.length - 1}
          onClick={() =>
            goToImage(Math.min(product.images.length - 1, currentIndex + 1))
          }
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}

export function ProductCardTitle({
  product,
  layout,
}: ProductCardTitleProps) {
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

export function ProductCardPrice({ price }: ProductCardPriceProps) {
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

export function ProductCardBadge({ badge }: ProductCardBadgeProps) {
  return (
    <Badge
      className="pointer-events-none absolute top-3 left-3"
      variant={badge.variant ? badgeVariants[badge.variant] : "secondary"}
    >
      {badge.label}
    </Badge>
  )
}

export function ProductCardActions({
  layout,
  product,
  showQuickView,
  onPrimaryAction,
  primaryActionLabel,
  primaryActionHasPopup,
  primaryActionExpanded,
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
      aria-expanded={primaryActionHasPopup ? primaryActionExpanded : undefined}
      aria-haspopup={primaryActionHasPopup}
      className={layout === "vertical" ? undefined : "w-full sm:w-auto"}
      onClick={onPrimaryAction}
      type="button"
    >
      <ShoppingCart aria-hidden="true" />
      {primaryActionLabel}
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

function ProductCardBase({
  product,
  layout = "vertical",
  variants = "none",
  slideshowControls = "both",
  showWishlist = false,
  showRating = true,
  showQuickView = false,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  className,
}: ProductCardProps) {
  const [overlayOpen, setOverlayOpen] = React.useState(false)
  const hasOverlayVariants =
    variants === "overlay" &&
    Array.isArray(product.variants) &&
    product.variants.length > 0

  const handlePrimaryAction = React.useCallback(() => {
    if (hasOverlayVariants) {
      setOverlayOpen(true)
      return
    }

    onAddToCart?.({ productId: product.id })
  }, [hasOverlayVariants, onAddToCart, product.id])

  return (
    <ProductCardSlideshowControlsContext.Provider value={slideshowControls}>
      <Card
        className={cn(
          "group/card relative h-full gap-0 overflow-hidden py-0",
          layoutClasses[layout],
          className
        )}
      >
        <ProductCardImage layout={layout} product={product} />
        <div
          className={cn("flex flex-1 flex-col gap-4", contentLayoutClasses[layout])}
        >
          <div className="space-y-3">
            {product.category ? (
              <p className="text-sm text-muted-foreground">{product.category}</p>
            ) : null}
            <ProductCardTitle layout={layout} product={product} />
            {showWishlist ? (
              <Button
                aria-label="Add to wishlist"
                aria-pressed={false}
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
              <Stars count={product.rating.count} value={product.rating.value} />
            ) : null}
            {layout === "horizontal-detailed" && product.description ? (
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {product.description}
              </p>
            ) : null}
          </div>

          {layout === "vertical" ? (
            <div className="mt-auto flex items-center justify-between gap-3">
              <ProductCardPrice price={product.price} />
              <ProductCardActions
                layout={layout}
                onPrimaryAction={handlePrimaryAction}
                onQuickView={onQuickView}
                primaryActionExpanded={
                  hasOverlayVariants ? overlayOpen : undefined
                }
                primaryActionHasPopup={hasOverlayVariants ? "dialog" : undefined}
                primaryActionLabel={
                  hasOverlayVariants ? "Quick Buy" : "Add to cart"
                }
                product={product}
                showQuickView={showQuickView}
              />
            </div>
          ) : (
            <div className="mt-auto space-y-3">
              <ProductCardPrice price={product.price} />
              <ProductCardActions
                layout={layout}
                onPrimaryAction={handlePrimaryAction}
                onQuickView={onQuickView}
                primaryActionExpanded={
                  hasOverlayVariants ? overlayOpen : undefined
                }
                primaryActionHasPopup={hasOverlayVariants ? "dialog" : undefined}
                primaryActionLabel={
                  hasOverlayVariants ? "Quick Buy" : "Add to cart"
                }
                product={product}
                showQuickView={showQuickView}
              />
            </div>
          )}
        </div>

        {product.badge ? <ProductCardBadge badge={product.badge} /> : null}
        {hasOverlayVariants ? (
          <QuickOptions
            onAddToCart={(selectedVariants) => {
              onAddToCart?.({
                productId: product.id,
                selectedVariants,
              })
              setOverlayOpen(false)
            }}
            onOpenChange={setOverlayOpen}
            open={overlayOpen}
            variants={product.variants ?? []}
          />
        ) : null}
      </Card>
    </ProductCardSlideshowControlsContext.Provider>
  )
}

export const ProductCard = Object.assign(ProductCardBase, {
  Image: ProductCardImage,
  Title: ProductCardTitle,
  Price: ProductCardPrice,
  Badge: ProductCardBadge,
  Actions: ProductCardActions,
})
