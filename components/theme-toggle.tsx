"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

type ThemeMode = "light" | "dark" | "system"

function getNextTheme(theme: string | undefined): ThemeMode {
  if (theme === "light") {
    return "dark"
  }

  if (theme === "dark") {
    return "system"
  }

  return "light"
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme: ThemeMode =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system"

  return (
    <Button
      aria-label="Toggle theme"
      className="relative"
      disabled={!mounted}
      onClick={() => setTheme(getNextTheme(activeTheme))}
      size="icon"
      title={
        mounted ? `Current theme: ${activeTheme}. Click to switch theme.` : undefined
      }
      type="button"
      variant="ghost"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 motion-reduce:transition-none" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 motion-reduce:transition-none" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
