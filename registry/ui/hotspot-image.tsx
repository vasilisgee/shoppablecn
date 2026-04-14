"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

import type { HotspotImageProps } from "./types"

export function HotspotImage({
  src,
  alt,
  width,
  height,
  children,
  className,
}: HotspotImageProps) {
  return (
    <div
      aria-label={`Shoppable image: ${alt}`}
      className={cn("relative w-full overflow-x-auto overflow-y-hidden", className)}
      role="region"
    >
      <div className="relative inline-block" style={{ width: `${width}px` }}>
        <Image
          alt={alt}
          className="block"
          height={height}
          priority={false}
          sizes={`${width}px`}
          src={src}
          width={width}
        />
        {children}
      </div>
    </div>
  )
}
