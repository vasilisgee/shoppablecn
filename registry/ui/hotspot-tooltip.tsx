import { cn } from "@/lib/utils"

import type { HotspotTooltipProps } from "./types"

export function HotspotTooltip({
  title,
  description,
  className,
}: HotspotTooltipProps) {
  return (
    <div className={cn("max-w-xs p-4", className)}>
      <h3 className="mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
