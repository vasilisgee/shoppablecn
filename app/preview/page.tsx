import Link from "next/link"

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function PreviewIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Component Previews
        </h1>
        <p className="text-muted-foreground">
          Internal preview pages for component iteration. Not part of public
          docs.
        </p>
      </div>

      <ul className="list-disc space-y-2 pl-5 text-sm">
        <li>
          <Link className="underline underline-offset-4" href="/preview/product-card">
            ProductCard: every layout x variant mode x prop combination
          </Link>
        </li>
      </ul>
    </main>
  )
}
