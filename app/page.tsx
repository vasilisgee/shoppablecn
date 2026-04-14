import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  mockProductSimple,
  mockProductWithSale,
  mockProductWithVariants,
} from "@/lib/mock-products"
import { ProductCard } from "@/registry/ui/product-card"

export default function Home() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <section className="flex w-full max-w-3xl flex-col gap-8">
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
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
            <p className="max-w-2xl text-muted-foreground">
              A small slice of the ProductCard registry item showing the M3
              slideshow and Quick Buy overlay on top of the default shadcn
              theme tokens.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ProductCard
              layout="vertical"
              product={mockProductWithSale}
              variants="none"
            />
            <ProductCard
              layout="vertical"
              product={mockProductWithVariants}
              variants="overlay"
            />
            <ProductCard
              layout="vertical"
              product={mockProductSimple}
              variants="none"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            See the{" "}
            <Link
              className="underline underline-offset-4"
              href="https://docs.shoppablecn.dev"
            >
              full documentation
            </Link>{" "}
            for all layouts, variants, and examples.
          </p>
        </section>

        <footer className="text-sm text-muted-foreground">
          MIT License • built with shadcn/ui
        </footer>
      </div>
    </main>
  )
}
