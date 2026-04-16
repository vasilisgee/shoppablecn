"use client"

import { Plus } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import type { HotspotPinProps } from "./types"

const pinBaseClasses =
  "absolute inline-flex items-center justify-center rounded-full shadow-sm transition-[background-color,box-shadow,filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"

const pinVariantClasses = {
  plus:
    "size-8 border-[3px] border-black/70 bg-background text-foreground hover:bg-accent dark:border-white/70",
  dot: "size-5 rounded-full border-[3px] border-background/80 bg-primary text-primary-foreground",
} satisfies Record<NonNullable<HotspotPinProps["variant"]>, string>

export function HotspotPin(props: HotspotPinProps) {
  const { x, y, variant = "plus", label, children, className } = props

  return (
    <Popover>
      <PopoverTrigger
        aria-label={label ?? `Hotspot at ${x}%, ${y}%`}
        className={cn(
          pinBaseClasses,
          pinVariantClasses[variant],
          className
        )}
        style={{
          left: `${x}%`,
          position: "absolute",
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
        }}
        type="button"
      >
        {variant === "plus" ? <Plus aria-hidden="true" className="size-4" /> : null}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="max-w-[90vw] w-auto p-0 has-[[data-slot=card]]:overflow-hidden has-[[data-slot=card]]:rounded-xl has-[[data-slot=card]]:bg-transparent"
        side="top"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
