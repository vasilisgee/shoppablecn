import Link from "next/link"

import { QuickOptionsPreviewContent } from "./preview-content"

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function QuickOptionsPreviewPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-16">
      <div className="space-y-4">
        <Link className="text-sm underline underline-offset-4" href="/preview">
          Back to /preview
        </Link>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            QuickOptions Preview
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            Exhaustive preview of each variant type, standalone and combined.
          </p>
        </div>
      </div>

      <QuickOptionsPreviewContent />
    </main>
  )
}
