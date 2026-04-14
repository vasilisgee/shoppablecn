"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { ProductVariant, SelectedVariants } from "./types"

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ")

/**
 * Props for the QuickOptions overlay.
 */
export type QuickOptionsProps = {
  /** Variants to render. */
  variants: ProductVariant[]
  /** Controlled open state. */
  open: boolean
  /** Called when user clicks close button or presses Escape. */
  onOpenChange: (open: boolean) => void
  /** Called with the full selected variants map when user clicks Add to Cart. */
  onAddToCart: (selected: SelectedVariants) => void
  /** Optional label override for the Add to Cart button. Default: "Add to cart". */
  addToCartLabel?: string
  className?: string
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return []
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((element) => !element.hasAttribute("disabled"))
}

function getInitialSelectedVariants(
  variants: ProductVariant[]
): SelectedVariants {
  return variants.reduce<SelectedVariants>((accumulator, variant) => {
    if (variant.type === "slider" && variant.sliderConfig) {
      accumulator[variant.id] = variant.sliderConfig.min
    }

    return accumulator
  }, {})
}

export function QuickOptions({
  variants,
  open,
  onOpenChange,
  onAddToCart,
  addToCartLabel = "Add to cart",
  className,
}: QuickOptionsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)
  const wasOpenRef = React.useRef(open)
  const [selected, setSelected] = React.useState<SelectedVariants>({})

  const closeOverlay = React.useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  React.useEffect(() => {
    if (open) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null

      setSelected(getInitialSelectedVariants(variants))

      const frame = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })

      wasOpenRef.current = true

      return () => {
        window.cancelAnimationFrame(frame)
      }
    }

    if (wasOpenRef.current) {
      setSelected({})
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
      wasOpenRef.current = false
    }
  }, [open, variants])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeOverlay()
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const focusableElements = getFocusableElements(containerRef.current)

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    },
    [closeOverlay]
  )

  return (
    <div
      ref={containerRef}
      aria-hidden={!open}
      aria-label="Quick options"
      aria-modal="true"
      className={cn(
        "absolute inset-0 z-20 flex flex-col bg-background",
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        "data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
        className
      )}
      data-state={open ? "open" : "closed"}
      onKeyDown={handleKeyDown}
      role="dialog"
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">Options</h2>
          <p className="text-sm text-muted-foreground">
            Choose your product options before adding to cart.
          </p>
        </div>
        <Button
          aria-label="Close options"
          onClick={closeOverlay}
          ref={closeButtonRef}
          size="icon"
          type="button"
          variant="ghost"
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {variants.map((variant) => (
          <section className="space-y-2" key={variant.id}>
            <div className="space-y-1">
              <p className="text-sm font-medium">{variant.name}</p>
              <p className="text-xs text-muted-foreground">
                {variant.type} options
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="border-t px-4 py-4">
        <Button
          className="w-full"
          onClick={() => onAddToCart(selected)}
          type="button"
        >
          {addToCartLabel}
        </Button>
      </div>
    </div>
  )
}
