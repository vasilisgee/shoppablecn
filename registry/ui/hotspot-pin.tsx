"use client"

import { Plus } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import type { HotspotPinProps } from "./types"

export function HotspotPin(props: HotspotPinProps) {
  const { x, y, label, children, className } = props

  return (
    <Popover>
      <PopoverTrigger
        aria-label={label ?? `Hotspot at ${x}%, ${y}%`}
        className={cn(
          "absolute inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-[background-color,box-shadow] hover:bg-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
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
        <Plus aria-hidden="true" className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="max-w-[90vw] w-auto p-0"
        collisionPadding={16}
        side="top"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
