"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockProductWithVariants } from "@/lib/mock-products"
import { QuickOptions } from "@/registry/ui/quick-options"
import type { ProductVariant, SelectedVariants } from "@/registry/ui/types"

type PreviewExampleProps = {
  title: string
  description: string
  children: React.ReactNode
}

type QuickOptionsStageProps = {
  variants: ProductVariant[]
  initialOpen?: boolean
  addToCartLabel?: string
  onAddToCart?: (selected: SelectedVariants) => void
}

function PreviewExample({
  title,
  description,
  children,
}: PreviewExampleProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <pre className="overflow-x-auto rounded-lg border bg-card px-4 py-3 text-sm text-card-foreground">
          <code>{description}</code>
        </pre>
      </div>
      {children}
    </section>
  )
}

function PreviewSeparator() {
  return <Separator className="my-8" />
}

function QuickOptionsStage({
  variants,
  initialOpen = true,
  addToCartLabel,
  onAddToCart,
}: QuickOptionsStageProps) {
  const [open, setOpen] = React.useState(initialOpen)

  return (
    <div className="space-y-3">
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant={open ? "secondary" : "outline"}
      >
        {open ? "Overlay open" : "Open overlay"}
      </Button>

      <div className="relative h-[520px] w-full max-w-sm overflow-hidden rounded-xl border bg-card">
        {!open ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted/20 px-6 text-center">
            <p className="text-sm font-medium">QuickOptions demo container</p>
            <p className="text-sm text-muted-foreground">
              Open the overlay to test selections, close behavior, and required
              validation.
            </p>
          </div>
        ) : null}

        <QuickOptions
          addToCartLabel={addToCartLabel}
          onAddToCart={(selected) => {
            onAddToCart?.(selected)
            setOpen(false)
          }}
          onOpenChange={setOpen}
          open={open}
          variants={variants}
        />
      </div>
    </div>
  )
}

function getVariant(id: string) {
  const variant = mockProductWithVariants.variants?.find(
    (candidate) => candidate.id === id
  )

  if (!variant) {
    throw new Error(`Missing mock variant: ${id}`)
  }

  return variant
}

export function QuickOptionsPreviewContent() {
  const swatchVariant = getVariant("colorway")
  const pillsVariant = getVariant("size")
  const selectVariant = getVariant("shirt-fit")
  const sliderVariant = getVariant("embroidery-width")
  const checkboxVariant = getVariant("extras")
  const radioVariant = getVariant("hoodie-weight")

  const handlePreviewAddToCart = React.useCallback(
    (selected: SelectedVariants) => {
      console.log("quick-options preview onAddToCart", selected) // preview-only
    },
    []
  )

  const allRequiredVariants = mockProductWithVariants.variants?.map((variant) => ({
    ...variant,
    required: true,
  }))

  const allOptionalVariants = mockProductWithVariants.variants?.map((variant) => ({
    ...variant,
    required: false,
  }))

  const manySwatchesVariant: ProductVariant = {
    id: "palette",
    name: "Palette",
    type: "swatch",
    required: true,
    options: [
      { label: "Sand", value: "sand", swatch: "#d6cbb7" },
      { label: "Clay", value: "clay", swatch: "#b9714c" },
      { label: "Coral", value: "coral", swatch: "#f87171" },
      { label: "Sun", value: "sun", swatch: "#facc15" },
      { label: "Mint", value: "mint", swatch: "#86efac" },
      { label: "Fern", value: "fern", swatch: "#4d7c0f" },
      { label: "Sky", value: "sky", swatch: "#38bdf8" },
      { label: "Ocean", value: "ocean", swatch: "#1d4ed8" },
      { label: "Lilac", value: "lilac", swatch: "#c4b5fd" },
      { label: "Berry", value: "berry", swatch: "#9d174d" },
      { label: "Slate", value: "slate", swatch: "#475569" },
      { label: "Ink", value: "ink", swatch: "#0f172a" },
    ],
  }

  const disabledOptionsVariants: ProductVariant[] = [
    {
      id: "swatch-disabled",
      name: "Colorway",
      type: "swatch",
      required: true,
      options: [
        { label: "Bone", value: "bone", swatch: "#e7e2d9" },
        { label: "Forest", value: "forest", swatch: "#355e3b", disabled: true },
        { label: "Night", value: "night", swatch: "#172554" },
      ],
    },
    {
      id: "pill-disabled",
      name: "Size",
      type: "pills",
      required: true,
      options: [
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl", disabled: true },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <PreviewExample
        description={'variants=[swatch] open=true'}
        title={"Swatch only / open=true"}
      >
        <QuickOptionsStage variants={[swatchVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[pills] open=true'}
        title={"Pills only / open=true"}
      >
        <QuickOptionsStage variants={[pillsVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[select] open=true'}
        title={"Select only / open=true"}
      >
        <QuickOptionsStage variants={[selectVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[slider] open=true'}
        title={"Slider only / open=true"}
      >
        <QuickOptionsStage variants={[sliderVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[checkbox] open=true'}
        title={"Checkbox only / open=true"}
      >
        <QuickOptionsStage variants={[checkboxVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[radio] open=true'}
        title={"Radio only / open=true"}
      >
        <QuickOptionsStage variants={[radioVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=mockProductWithVariants.variants open=true'}
        title={"Combined variants / all six types"}
      >
        <QuickOptionsStage variants={mockProductWithVariants.variants ?? []} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=allRequired open=true'}
        title={"Required validation / all required"}
      >
        <QuickOptionsStage variants={allRequiredVariants ?? []} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=mockProductWithVariants.variants open=true'}
        title={"Required validation / mixed required and optional"}
      >
        <QuickOptionsStage variants={mockProductWithVariants.variants ?? []} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=allOptional open=true'}
        title={"Required validation / all optional"}
      >
        <QuickOptionsStage variants={allOptionalVariants ?? []} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[manySwatches] open=true'}
        title={"Edge cases / many swatches"}
      >
        <QuickOptionsStage variants={[manySwatchesVariant]} />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[slider] onAddToCart=(selected)=>console.log(selected)'}
        title={"Edge cases / slider only / onAddToCart=console.log"}
      >
        <QuickOptionsStage
          onAddToCart={handlePreviewAddToCart}
          variants={[sliderVariant]}
        />
      </PreviewExample>

      <PreviewSeparator />

      <PreviewExample
        description={'variants=[swatchDisabled,pillDisabled] open=true'}
        title={"Edge cases / disabled swatch and pills options"}
      >
        <QuickOptionsStage variants={disabledOptionsVariants} />
      </PreviewExample>
    </div>
  )
}
