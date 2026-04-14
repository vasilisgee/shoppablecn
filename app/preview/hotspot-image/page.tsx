import Link from "next/link"

import { HotspotImagePreviewContent } from "./preview-content"

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function HotspotImagePreviewPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-16">
      <div className="space-y-4">
        <Link className="text-sm underline underline-offset-4" href="/preview">
          Back to /preview
        </Link>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            HotspotImage Preview
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            Exhaustive preview of hotspot scenes, pin variants, and content
            types.
          </p>
        </div>
      </div>

      <HotspotImagePreviewContent />
    </main>
  )
}
