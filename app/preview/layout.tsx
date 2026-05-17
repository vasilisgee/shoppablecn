import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Link
          className="text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          href="/preview"
        >
          shoppablecn Preview
        </Link>
        <ThemeToggle />
      </header>
      {children}
    </div>
  )
}
