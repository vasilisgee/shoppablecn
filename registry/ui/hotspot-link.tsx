import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

import type { HotspotLinkProps } from "./types"

export function HotspotLink({
  label,
  href,
  target,
  className,
}: HotspotLinkProps) {
  return (
    <a
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-3 transition-colors hover:bg-accent motion-reduce:transition-none",
        className
      )}
      href={href}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      target={target}
    >
      <span className="text-sm font-medium">{label}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </a>
  )
}
