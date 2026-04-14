import { ThemeToggle } from "@/components/theme-toggle"

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-12 items-center justify-end border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <ThemeToggle />
      </header>
      {children}
    </div>
  )
}
