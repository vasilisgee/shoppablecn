import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Registry</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            shoppablecn
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            E-commerce UI primitives for shadcn/ui. Product cards, shoppable
            hotspot images, and quick-buy overlays.
          </p>
        </div>

        <pre className="overflow-x-auto rounded-lg border bg-card px-4 py-3 text-sm text-card-foreground">
          <code>
            npx shadcn@latest add https://shoppablecn.dev/r/product-card.json
          </code>
        </pre>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className={buttonVariants({ className: "w-full sm:w-auto" })}
            href="https://docs.shoppablecn.dev"
          >
            View Docs
          </Link>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "w-full sm:w-auto",
            })}
            href="https://github.com/vasilisgee/shoppablecn.git"
          >
            GitHub
          </Link>
        </div>

        <footer className="text-sm text-muted-foreground">
          MIT License • built with shadcn/ui
        </footer>
      </div>
    </main>
  )
}
